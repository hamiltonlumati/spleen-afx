import express, {Express} from 'express';
import session from 'express-session';
import AppDataSource from './config/database';
import PlaylistRoutes from  './routes/Playlist';
import UserRoutes from './routes/User';

const app: Express = express();
const port = 3000;

app.use(
    session({
        secret: 'some_secret',
        resave: false,
        cookie: { 
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        },
        saveUninitialized: false
    })
);

app.use(express.json);


const startServer = async() =>{
    AppDataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

    /* app.get('/', (req, res) => {
        res.send('Hello, TypeScript with Express!');
    }); */
    
    app.use(express.json());

    app.use('/api', PlaylistRoutes);
    app.use('/api',UserRoutes);

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

startServer();