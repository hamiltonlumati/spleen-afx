import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('playlist')
export class Playlist extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    playlist_name: string;

    @ManyToOne(() => User, (user) => user.playlists)
    user: User
}