import {
    Injectable,
    UnprocessableEntityException,
    NotFoundException,
    InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { User } from './user.entity';
import { UserRole } from './user-roles.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { FindUsersQueryDto } from './dto/find-users-query.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) { }

    async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
        if (createUserDto.password != createUserDto.passwordConfirmation) {
            throw new UnprocessableEntityException('As senhas não conferem');
        } else {
            return this.userRepository.createUser(createUserDto, UserRole.ADMIN);
        }
    }

    async findUserById(userId: string): Promise<User> {
        const user = await this.userRepository.findOne({
            select: ['email', 'name', 'role', 'id'], where: { id: userId }
        });

        if (!user) throw new NotFoundException('Usuário não encontrado');

        return user;
    }

    async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<User> {
        const user = await this.findUserById(id);
        const { name, email, role } = updateUserDto;
        user.name = name ? name : user.name;
        user.email = email ? email : user.email;
        user.role = role ? role : user.role;
        try {
            await user.save();
            return user;
        } catch (error) {
            throw new InternalServerErrorException(
                'Erro ao salvar os dados no banco de dados',
            );
        }
    }

    async deleteUser(userId: string) {
        const result = await this.userRepository.delete({ id: userId });
        if (result.affected === 0) {
            throw new NotFoundException(
                'Não foi encontrado um usuário com o ID informado',
            );
        }
    }

    async findUsers(
        queryDto: FindUsersQueryDto,
    ): Promise<{ users: User[]; total: number }> {
        const users = await this.userRepository.findUsers(queryDto);
        return users;
    }
}