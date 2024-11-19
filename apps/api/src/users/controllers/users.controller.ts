import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
//   import { CreateUserDto } from '../dto/create-user.dto';
//   import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Controller({
    version: '1',
    path: 'users',
})
@ApiTags('Users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // @Post()
    // @ApiCreatedResponse({ type: UserEntity })
    // create(@Body() createUserDto: CreateUserDto) {
    //   return this.usersService.create(createUserDto);
    // }

    @Get()
    @ApiOkResponse({ type: [User] })
    findAll() {
        return this.usersService.list();
    }

    @Get(':id')
    @ApiOkResponse({ type: User })
    findOne(@Param('id') id: string) {
      return this.usersService.find(id);
    }

    // @Patch(':id')
    // @ApiOkResponse({ type: UserEntity })
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //   return this.usersService.update(id, updateUserDto);
    // }

    // @Delete(':id')
    // @ApiOkResponse({ type: UserEntity })
    // remove(@Param('id') id: string) {
    //   return this.usersService.remove(id);
    // }
}