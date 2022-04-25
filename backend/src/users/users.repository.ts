
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(
        createUserDto: CreateUserDto
    ): Promise<User> {
        const { email, name, password } = createUserDto;

        const user = this.create();
        user.email = email;
        user.name = name;
        user.password = await this.hashPassword(password, await bcrypt.genSalt());
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

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}