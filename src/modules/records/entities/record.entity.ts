import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('record')
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.records)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  like: number;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
