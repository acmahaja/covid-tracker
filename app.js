const express = require('express');
const app = express();

const axios = require('axios');

var path = require('path');
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

const data = require('./public/data.json')


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



app.get('/', async(req, res) => {
    res.render('index', { data })
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});