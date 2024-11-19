import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UsersService {
    constructor(private repository: UserRepository) { }

    //   async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    //     return new UserEntity(
    //       await this.prisma.user.create({
    //         data: {
    //           firstName: createUserDto.firstName,
    //           lastName: createUserDto.lastName,
    //           email: createUserDto.email,
    //           phone: createUserDto?.phone,
    //           role: {
    //             connect: {
    //               id: createUserDto.roleId,
    //             },
    //           },
    //         },
    //       }),
    //     );
    //   }

    list(): Promise<User[]> {
        return this.repository.list();
    }

    find(id: User['id']) {
        return this.repository.find(id);
    }

    //   async findOneByEmail(email: User['email']): Promise<UserEntity> {
    //     return new UserEntity(
    //       await this.prisma.user
    //         .findUniqueOrThrow({
    //           where: {
    //             email,
    //           },
    //           include: {
    //             role: true,
    //           },
    //         })
    //         .catch(() => {
    //           throw new NotFoundException();
    //         }),
    //     );
    //   }

    //   async findUserCredentials(user: UserEntity): Promise<CredentialsAccount> {
    //     return await this.prisma.credentialsAccount
    //       .findUniqueOrThrow({
    //         where: {
    //           userId: user.id,
    //         },
    //       })
    //       .catch(() => {
    //         throw new NotFoundException();
    //       });
    //   }

    //   async update(
    //     id: User['id'],
    //     updateUserDto: UpdateUserDto,
    //   ): Promise<UserEntity> {
    //     return new UserEntity(
    //       await this.prisma.user.update({
    //         where: {
    //           id,
    //         },
    //         data: {
    //           firstName: updateUserDto.firstName,
    //           lastName: updateUserDto.lastName,
    //           email: updateUserDto.email,
    //           phone: updateUserDto?.phone,
    //           role: {
    //             connect: {
    //               id: updateUserDto.roleId,
    //             },
    //           },
    //         },
    //       }),
    //     );
    //   }

    //   async remove(id: User['id']): Promise<UserEntity> {
    //     return new UserEntity(
    //       await this.prisma.user.delete({
    //         where: {
    //           id,
    //         },
    //       }),
    //     );
    //   }
}