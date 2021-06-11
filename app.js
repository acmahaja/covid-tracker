const express = require('express');
const app = express();

const axios = require('axios');

var path = require('path');
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

// let data = null;

// function getDataSet() {
//     try {
//         axios.get('https://covid.ourworldindata.org/data/owid-covid-data.json').then((result) => {
//             console.log("got data");
//             data = result;
//         });
//     } catch (e) {
//         console.log(e);
//     }
// }
//getDataSet();

const data = require('./public/data.json');
const countries = require('./public/country-code.json');
const { count } = require('console');

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
    let global;
    let countries;
    try {
        axios.get('https://disease.sh/v3/covid-19/all?lastdays=all').then((result) => {
            global = result.data;
        }).then(()=>{
            axios.get('https://disease.sh/v3/covid-19/countries').then((result) =>{
                countries = result.data;
            }).then(()=>{
                res.render('index',{global, countries})
            })
        });
    } catch (e) {
        console.log(e);
    }

});



const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server listening on port https://localhost:${PORT}`);
});