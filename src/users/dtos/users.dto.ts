import { Expose } from 'class-transformer';

export class UsersDto {
  @Expose()
  email: string;

  @Expose()
  id: number;
}
