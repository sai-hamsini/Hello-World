const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('mongodb');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'packers';

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
        return;
    }

    const db = client.db(dbName);
    const collection = db.collection('teams');

    // Add player
    app.post('/api/teams', (req, res) => {
        const player = req.body;
        collection.insertOne(player, (err, result) => {
            if (err) {
                console.error('Failed to add player:', err);
                res.status(500).send('Failed to add player');
                return;
            }
            res.send('Player added successfully');
        });
    });

    // Update player
    app.put('/api/teams/:id', (req, res) => {
        const id = new mongodb.ObjectID(req.params.id);
        const newPlayer = req.body;
        collection.updateOne({ _id: id }, { $set: newPlayer }, (err, result) => {
            if (err) {
                console.error('Failed to update player:', err);
                res.status(500).send('Failed to update player');
                return;
            }
            res.send('Player updated successfully');
        });
    });

    // Delete player
    app.delete('/api/teams/:id', (req, res) => {
        const id = new mongodb.ObjectID(req.params.id);
        collection.deleteOne({ _id: id }, (err, result) => {
            if (err) {
                console.error('Failed to delete player:', err);
                res.status(500).send('Failed to delete player');
                return;
            }
            res.send('Player deleted successfully');
        });
    });

    // Get all players
    app.get('/api/teams', (req, res) => {
        collection.find({}).toArray((err, result) => {
            if (err) {
                console.error('Failed to get players:', err);
                res.status(500).send('Failed to get players');
                return;
            }
            res.send(result);
        });
    });

    // Perform queries
    app.post('/api/teams/query', (req, res) => {
        const query = req.body;
        collection.find(query.filter || {}).project(query.projection || {}).sort(query.sort || {}).limit(query.limit || 0).toArray((err, result) => {
            if (err) {
                console.error('Failed to perform query:', err);
                res.status(500).send('Failed to perform query');
                return;
            }
            res.send(result);
        });
    });

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
