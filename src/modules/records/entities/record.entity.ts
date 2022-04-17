import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('record')
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: number;

  @Column({ nullable: true })
  title: string;

  @Column()
  content: string;

  @Column()
  like: number;

  @CreateDateColumn()
  create_time: Timestamp;

  @UpdateDateColumn()
  update_time: Timestamp;
}
