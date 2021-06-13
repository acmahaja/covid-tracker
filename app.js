const express = require('express');
const app = express();

const axios = require('axios');

var path = require('path');
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));


app.get('/country/:code', async(req, res) => {
    const { code } = req.params;
    if (code.length != 3 || countries[code] === undefined)
        res.redirect('/');

    res.send(countries[code])
});


app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});


// let global;
// let countries;
// try {
//     axios.get('https://disease.sh/v3/covid-19/all?lastdays=all').then((result) => {
//         global = result.data;
//     }).then(() => {
//         axios.get('https://disease.sh/v3/covid-19/countries').then((result) => {
//             countries = result.data;
//         }).then(() => {
//             res.render('index', { global, countries })
//         })
//     });
// } catch (e) {
//     console.log(e);
// }