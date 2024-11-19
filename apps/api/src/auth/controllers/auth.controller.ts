import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from '../dtos/register-user.dto';

@Controller({
    version: '1',
    path: 'auth',
})
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiCreatedResponse()
    async register(@Body() registerUserDto: RegisterUserDto) {
        await this.authService.register(
            registerUserDto.name,
            registerUserDto.email,
            registerUserDto.password,
        );
    }

    //   @Post('login')
    //   @ApiOkResponse({ type: AuthenticationDto })
    //   async login(@Body() userLoginDto: UserLoginDto): Promise<AuthenticationDto> {
    //     const user = await this.authService.validateUserCredentials(userLoginDto);
    //     return this.authService.login(user);
    //   }
}