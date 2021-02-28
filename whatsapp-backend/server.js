// Import
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

// App Config
const app = express();
const port = process.env.PORT || 2704

const pusher = new Pusher({
    appId: "1162571",
    key: "0ef03955a8ed83790b62",
    secret: "15b08f7ae0f1e67e2bc5",
    cluster: "ap2",
    useTLS: true
});

// Middleware
app.use(express.json());
app.use(cors());


// DB Config
const connection_url = 'mongodb+srv://jigar:jigar2704@cluster0.myix6.mongodb.net/whatsappDB?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const db = mongoose.connection;

db.once('open', () => {
    console.log('DB connected');

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log(change);

        if (change.operationType == "insert") {
            const messageDetails = change.fullDocument;

            pusher.trigger("messages", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            });
        } else {
            console.log("Error triggering pusher");
        }
    });
});

// ..

// API Routes
app.get('/', (req, res) => res.status(200).send('Hello'));

app.get('/messages/sync' , (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

// Listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`))