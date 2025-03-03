import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Playlist } from "../entities/Playlist";
import { Music } from "../entities/Music";

const AppDataSource = new DataSource({
    synchronize: true,
    entities: [
        User,
        Playlist,
        Music
    ],
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: 'root',
    password: 'brutus123',
    database: "spleen-afx",
})

export default AppDataSource;