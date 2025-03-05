import express, {Express} from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import * as crypto from "crypto";
import AppDataSource from './config/database';
import PlaylistRoutes from  './routes/Playlist';
import UserRoutes from './routes/User';
import { User } from './entities/User';

const app: Express = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing form data

app.use(
    session({
        secret: 'some_secret',
        resave: false,
        cookie: { 
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        },
        saveUninitialized: false,
        store: new (require('connect-pg-simple')(session))    
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

passport.use(
    new LocalStrategy((email: string, password, callback ) => {
        const user: any =  AppDataSource.getRepository(User).find({
            where: {
                email: email,
            },
        });
        if (!user) {
            return callback(null, false, { message: 'Incorrect username or password.' });
        }

        crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, password) {
            if (err) { return callback(err); }
            if (!crypto.timingSafeEqual(user.password, password)) {
                return callback(null, false, { message: 'Incorrect username or password.' });
            }
            return callback(null, user);
        });
    })
);

// Serialize user
passport.serializeUser(function(user: any, callback) {
    process.nextTick(function() {
        callback(null, { id: user.id, email: user.email });
    });
});  

// Deserialize user
passport.deserializeUser(function(user: any, callback) {
    process.nextTick(function() {
        return callback(null, user);
    });
});

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