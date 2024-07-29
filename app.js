import express from 'express'
import { nanoid } from 'nanoid'
const app = express();

// const router = express.Router();

app.get('/', function(req, res){
    const id = nanoid(8);
    console.log(`id is -->> `, id);
})

app.listen(3001, () => console.log('Server Running at 3001'))