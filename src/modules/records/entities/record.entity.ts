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

  @CreateDateColumn({ type: 'timestamp' })
  create_time: () => Timestamp;

  @UpdateDateColumn({ type: 'timestamp' })
  update_time: () => Timestamp;
}
