import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { retry } from 'rxjs';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // check if email is present
    const users = await this.usersService.find(email);
    if (users.length !== 0) {
      throw new BadRequestException('user is already present');
    }
    // hash users password

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    //create new user and save it

    const user = await this.usersService.create(email, result);

    // return the user

    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const [salt, hash] = user.password.split('.');

    const passwordHash = (await scrypt(password, salt, 32)) as Buffer;
    if (hash !== passwordHash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
