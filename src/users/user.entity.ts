import Reports from 'src/reports/report.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  password: string;
  @Column()
  email: string;

  @OneToMany(() => Reports, (reports) => reports.user)
  reports: Reports[] 

  @AfterInsert()
  logInsert() {
    console.log('inserted user with the id ' + this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('updated user with the id ' + this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('removed user with the id ' + this.id);
  }
}
