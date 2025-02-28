import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Playlist } from './Playlist';

@Entity('music')
export class Music extends BaseEntity{
    @PrimaryGeneratedColumn({})
    id: number;

    @Column()
    title: string;

    @Column()
    urlAddress: string;

    @Column()
    genre: string;

    @Column()
    year: number;

    @ManyToMany(() => Playlist)
    @JoinTable()
    categories: Playlist[]
}