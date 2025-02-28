import express, {Request, Response} from 'express';
import { User } from '../entities/User';
import { } from 'typeorm';
import AppDataSource from 'config/database';
import { v4 as uuidv4 } from 'uuid';

const router = express();
interface sessionsArray {
    [key: string]: any};
const sessions: sessionsArray = {};


router.post('/register', async(req: Request,res: Response) =>{
    const user = await AppDataSource.getRepository(User).create(req.body)
    const results = await AppDataSource.getRepository(User).save(user)
    const sessionID: string = uuidv4();
    sessions[sessionID] = {results};
    return res.status(200).json(results)
});

router.get('/login', async(req: Request, res: Response) =>{
    const results = await AppDataSource.getRepository(User).find({
        where: {
            email: req.params.email,
            password: req.params.password
        },
    })
    if(results){
        const sessionID: string = uuidv4();
        sessions[sessionID] = {results};
        return res.status(200).json(results)
    }else{
        return res.send(`User não autenticado`);
    }
})

router.get('/logout', async(req:Request, res:Response) => {
    const sessionID: string = req.headers.cookie?.split('=')[1];
    delete sessions[sessionID];
    res.set('Set-Cookie', 'session=; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    res.send('Logout feito com sucesso');
})

export default router;