import express, {Request, Response} from 'express';

const router = express();

router.get('/playlists', async(_req: Request, res: Response) =>{
    res.send('this is my first function')
});

export default router;