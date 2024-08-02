import express from 'express';
import path from 'path';
import { nanoid } from 'nanoid';
import { fileURLToPath } from 'url';

import URL from './models/url.js';
import { connectToMongoDB } from './db-connect.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware setup
app.set('views', path.join(__dirname, 'public', 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
connectToMongoDB('mongodb://127.0.0.1:27017/url-shortener')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.post('/get-short-url', async (req, res) => {
    const { long_url } = req.body;

    if (!long_url) {
        return res.status(400).json({ message: 'Url is required!' });
    }

    try {
        const id = nanoid(8);
        await URL.create({
            shortId: id,
            redirectUrl: long_url,
            timesVisited: []
        });
        res.status(200).json({ short_url: id });
    } catch (error) {
        console.error('Error creating URL:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/url/analytics/:id', async (req, res) => {
    const shortId = req.params.id;

    if (!shortId) {
        return res.status(400).json({ message: 'Url is required!' });
    }

    try {
        const analyticsRes = await URL.findOne({ shortId });
        res.status(200).json({ viewedTime: analyticsRes.timesVisited.length, history: analyticsRes.timesVisited });
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    try {
        const entryResp = await URL.findOneAndUpdate(
            { shortId },
            { $push: { timesVisited: { timestamp: Date.now() } } }
        );
        res.redirect(entryResp.redirectUrl);
    } catch (error) {
        console.error('Error redirecting URL:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
app.listen(3001, () => console.log('Server running at port 3001'));
