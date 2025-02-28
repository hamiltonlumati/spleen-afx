import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany,PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Playlist } from "./Playlist";

@Entity('user')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({unique: true})
    username: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    password: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Playlist, (playlist) => playlist.user)
    playlists: Playlist[]
}