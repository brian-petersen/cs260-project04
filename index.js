const express = require('express');
const bodyParser = require('body-parser');

let nextId = 2;
let quotes = [
    {
        id: 0,
        text: 'To be or not to be...',
        author: 'My homie shakespeare...',
        popularity: 0
    },
    {
        id: 1,
        text: 'But it is not being an apostle or even the President of the Church that saves and exalts a man. It is instead the receipt of the Holy Priesthood, conformity to the ordinances of the house of the Lord, and keeping the commandments of God. It is not position or place in the Church that guarantees an eternal reward but rather walking in obedience to the commandments and living by every word that proceedeth forth from the mouth of God.',
        author: 'Bruce R',
        popularity: 0
    }
];

const app = express();
app.use(bodyParser.json());

// create
app.put('/api/quotes', (req, res) => {
    quotes.push({
        id: nextId++,
        text: req.body.text,
        author: req.body.author || 'Anonymous',
        popularity: 0
    });

    res.json(nextId - 1);
});

// read
app.get('/api/quotes', (req, res) => {
    res.json(quotes);
});

// update
app.patch('/api/quotes/:id/up', (req, res) => {
    const id = parseInt(req.params.id);
    const quote = quotes.find(q => q.id === id);
    quote.popularity++;
    res.status(200).end();
});

app.patch('/api/quotes/:id/down', (req, res) => {
    const id = parseInt(req.params.id);
    const quote = quotes.find(q => q.id === id);
    quote.popularity--;
    res.status(200).end();
});

// destroy
app.delete('/api/quotes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    quotes = quotes.filter(q => q.id !== id);
    res.status(200).end();
});

// serve home
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});
