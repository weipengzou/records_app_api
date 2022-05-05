import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { Record } from 'src/modules/records/entities/record.entity';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '', comment: '头像' })
  avatar: string;

  @Column({ default: '', comment: '昵称' })
  display_name: string;

  @Column({ default: '', comment: '邮箱' })
  email: string;

  @Column({ default: '', comment: '手机' })
  phone: string;

  @Column({ nullable: false, comment: '账号' })
  account: string;

  @Column({
    nullable: false,
    select: false,
    transformer: {
      to: (val) => (val ? hashSync(val, 10) : val),
      from: (val) => val,
    },
    comment: '密码',
  })
  password: string;

  @OneToMany(() => Record, (record) => record.user, {
    cascade: true,
  })
  records: Record[];

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
