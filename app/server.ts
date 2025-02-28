import express from 'express';
import AppDataSource from 'config/database';
import PlaylistRoutes from  './routes/Playlist';
import UserRoutes from './routes/User';

const app = express();
const port = 3000;

const startServer = async() =>{
    AppDataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

    app.get('/', (req, res) => {
        res.send('Hello, TypeScript with Express!');
    });
    
    app.use(express.json());

    app.use('/api', PlaylistRoutes);
    app.use('/api',UserRoutes);

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

startServer();