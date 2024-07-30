import express from 'express'
import { nanoid } from 'nanoid'
import URL from './models/url.js'

const app = express()
const router = express.Router()

router.get('/', async function(req, res){
    const body = req.body

    if(body.long_url){
        const id = nanoid(8);
        await URL.create({
            shortId: id,
            redirectUrl: body.long_url,
            timesVisited: []
        });

        return res.status(200).json({short_url: id})
    } else {
        return res.status(400).json({message: 'Url is required!'})
    }
})


app.listen(3001, () => console.log('Server Running at 3001'))