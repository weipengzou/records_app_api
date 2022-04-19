import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { Record } from 'src/modules/records/entities/record.entity';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: '' })
  avatar: string;

  @Column({ type: 'varchar', default: '' })
  display_name: string;

  @Column({ type: 'varchar', default: '' })
  email: string;

  @Column({ type: 'varchar', default: '' })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  account: string;

  @Column({
    select: false,
    transformer: {
      to: (val) => (val ? hashSync(val, 10) : val),
      from: (val) => val,
    },
  })
  password: string;

  @OneToMany(() => Record, (record) => record.uid)
  records: Record[];

  @CreateDateColumn({ type: 'timestamp' })
  create_time: () => Timestamp;

  @UpdateDateColumn({ type: 'timestamp' })
  update_time: () => Timestamp;
}
