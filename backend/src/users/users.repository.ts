
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './user-roles.enum';
import * as bcrypt from 'bcrypt';
import {
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';
import { CredentialsDto } from '../auth/dto/credentials.dto';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';

@CustomRepository(User)
export class UserRepository extends Repository<User> {

    public async findUsers(
        queryDto: FindUsersQueryDto,
    ): Promise<{ users: User[]; total: number }> {
        queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
        queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;

        const { email, name, role } = queryDto;
        const query = this.createQueryBuilder('user');

        if (email) {
            query.andWhere('user.email ILIKE :email', { email: `%${email}%` });
        }

        if (name) {
            query.andWhere('user.name ILIKE :name', { name: `%${name}%` });
        }

        if (role) {
            query.andWhere('user.role = :role', { role });
        }
        // query.skip((queryDto.page - 1) * queryDto.limit);
        // query.take(+queryDto.limit);
        query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
        query.select(['user.id', 'user.name', 'user.email', 'user.role']);

        const [users, total] = await query.getManyAndCount();

        return { users, total };
    }

    public async createUser(
        createUserDto: CreateUserDto,
        role: UserRole,
    ): Promise<User> {
        const { email, name, password } = createUserDto;

        const user = this.create();
        user.email = email;
        user.name = name;
        user.role = role;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try {
            await user.save();
            delete user.password; // Remove a informação de Password para retornar as demais informações do cadastro
            return user;
        } catch (error) {
            if (error.code.toString() === '23505') {
                throw new ConflictException('Endereço de email já está em uso');
            } else {
                throw new InternalServerErrorException(
                    'Erro ao salvar o usuário no banco de dados',
                );
            }
        }
    }

    public async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
        const { email, password } = credentialsDto;
        const user = await this.findOne({ where: { email: email } });

        if (user && (await user.checkPassword(password))) {
            return user;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}