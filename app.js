const express = require('express');
const app = express();

const axios = require('axios');

var path = require('path');
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

const data = require('./public/data.json');
const countries = require('./public/country-code.json');

async function getDataSet() {
    try {
        await axios.get('https://covid.ourworldindata.org/data/owid-covid-data.json').then((result) => {
            console.log(result);
            return result;
        });
    } catch (e) {
        console.log(e);
    }
}

app.get('/country/:code', async(req, res) => {
    const { code } = req.params;
    if (code.length != 3 || countries[code] === undefined)
        res.redirect('/');

    res.send(countries[code])
});


app.get('/data', async(req, res) => {
    res.send(JSON.stringify(data))
});

app.get('/', async(req, res) => {

    res.render('index', { data })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});