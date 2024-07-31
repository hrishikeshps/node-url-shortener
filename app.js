import express from 'express';
import { nanoid } from 'nanoid';
import URL from './models/url.js';
import { connectToMongoDB } from './db-connect.js';

const app = express();
const router = express.Router();

app.use(express.json());

connectToMongoDB('mongodb://127.0.0.1:27017/url-shortener')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

router.post('/get-short-url', async (req, res) => {
    const { long_url } = req.body;

    if (long_url) {
        try {
            const id = nanoid(8);
            await URL.create({
                shortId: id,
                redirectUrl: long_url,
                timesVisited: []
            });

            return res.status(200).json({ short_url: id });
        } catch (error) {
            console.error('Error creating URL:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        return res.status(400).json({ message: 'Url is required!' });
    }
});

app.use('/', router);

app.listen(3001, () => console.log('Server running at port 3001'));
