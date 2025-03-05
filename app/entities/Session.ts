import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('session')
export class Session extends BaseEntity{
        @PrimaryGeneratedColumn()
        id: number;
}