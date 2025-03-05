import express, {Express, Request, Response} from 'express';
import { User } from '../entities/User';
import AppDataSource from '../config/database';
import passport from 'passport';
import * as crypto from "crypto";

const app: Express = express();
const router = express();

app.post('/register', (req: Request, res: Response, next) => {
    const { email, password, first_name, last_name } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if the username already exists
    const existingUser =  AppDataSource.getRepository(User).find({
        select:{
            id: true
        },
        where: {
            email: email,
        },
    });

    function isEmpty(obj: object) {
        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
                return false;
            }
        }
        return true;
    }
    

    if (isEmpty(existingUser)) {
        return res.status(409).json({ message: 'Username already exists' });
    }

    // Create a new user
    var salt: Buffer = crypto.randomBytes(16);
    crypto.pbkdf2(password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return next(err); }

        AppDataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
            { first_name: first_name, last_name: last_name, email: email, password: hashedPassword, salt: salt },
        ])
    .execute()
    passport.authenticate('local');
    res.status(201).json({ message: 'User registered successfully', user: {email: email, password: passport, first_name: first_name, last_name: last_name}});
    });
});

// Login route
app.post('/login', passport.authenticate('local'), (req: Request, res: Response) => {
    res.json({ message: 'Login successful', user: req.user });
});

// Logout route
app.post('/logout', (req: Request, res: Response) => {
    req.logout((err) => {
        if (err) { return res.status(500).json({ message: "Logout failed" });}
        res.json({ message: 'Logout successful' });
    });
});

export default router;