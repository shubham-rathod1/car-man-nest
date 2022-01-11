import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  // UseInterceptors,
  UseGuards,
  Session,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos/createUser.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interseptors';
import { UsersDto } from './dtos/users.dto';
import { AuthService } from './auth/auth.service';
import { CurrentUser } from './decorators/currentUser.decorator';
// import { CurrentUserInterceptor } from './interceptors/currentUserInterceptor';
import User from './user.entity';
import { AuthGuard } from '../guard/authGuard';

@Controller('auth')
@Serialize(UsersDto)
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  userSignOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signin')
  async login(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  // @Get('/whoami')
  // whoami(@Session() session: any) {
  //   return this.usersService.findOne(session.userId);
  // }
  @UseGuards(AuthGuard)
  @Get('/whoami')
  whoami(@CurrentUser() user: User) {
    return user;
  }

  //   @UseInterceptors(new SerializeInterceptor(UsersDto))
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
