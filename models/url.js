import mongoose from 'mongoose';
const { Schema } = mongoose;

const urlSchema = new Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    timesVisited: [
        { timestamp: { type: Number } }
    ]
},
    {
        timestamps: true
    }
);

const URL = mongoose.model('url', urlSchema);

export default URL;