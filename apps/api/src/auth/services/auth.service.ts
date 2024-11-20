import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { hash } from 'bcrypt';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';
import { instanceToPlain } from 'class-transformer';
import { AuthDto } from '../dtos/auth.dto';
// import { UserLoginDto } from '../dto/user-login.dto';
// import * as bcrypt from 'bcrypt';
// import { RoleEntity } from '../../roles/entities/role.entity';
// import { instanceToPlain } from 'class-transformer';
// import { AuthenticationDto } from '../dto/authentication.dto';
// import { CredentialsAccount } from '@prisma/client/accounts';
// import { InvalidCredentialsException } from '../../users/exceptions/invalid-credentials.exception';
// import { JwtTokenDto } from '../dto/jwt-token.dto';
// import { RolesService } from '../../roles/services/roles.service';
// import { RegisterUserDto } from '../dtos/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    // private rolesService: RolesService,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
  ) {
    let user = await this.usersService.findByEmail(email);
    if (user || user?.length > 0) {
        throw new BadRequestException('email already used');
    }
    return this.usersService.create(name, email, password);
  }

  login(user: User): AuthDto {
    const payload = {
      sub: user.id,
      user: instanceToPlain(user),
    };
    return new AuthDto({
      access_token: this.jwtService.sign(payload),
    });
  }

  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User> {
    const user = (await this.usersService.findByEmail(
      email,
    ))[0];

    if (!(await hash(password, 10))) {
      throw new InvalidCredentialsException();
    } else {
      return user;
    }
  }

//   async getUserRole(access_token: string): Promise<RoleEntity> {
//     const token = new JwtTokenDto(this.jwtService.decode(access_token));
//     let role: RoleEntity;
//     if (token.user) {
//       role = token.user.role;
//     } else {
//       role = await this.rolesService.findOneByName('guest');
//     }
//     return role;
//   }

//   async authorize(
//     uri: string,
//     method: string,
//     role: RoleEntity,
//   ): Promise<boolean> {
//     const activities = await this.prisma.activity.findMany({
//       where: {
//         method: method,
//         permissions: {
//           some: {
//             permission: {
//               roles: {
//                 some: {
//                   roleId: role.id,
//                 },
//               },
//             },
//           },
//         },
//       },
//     });

//     for (const activity of activities) {
//       const expression = new RegExp(`^${activity.url}$`, 'g');
//       if (expression.test(uri)) {
//         return;
//       }
//     }
//     throw new UnauthorizedException();
//   }
}