const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 4000;

const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

// paths
const publicDirectory = path.join(__dirname, '../public');
const templatesPath = path.join(__dirname, '../templates/views');
const partialsPath =  path.join(__dirname, '../templates/partials');

// static resources from public folder
app.use(express.static(publicDirectory));

// handlebar templates
app.set('view engine', 'hbs');
app.set('views', templatesPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rishi'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Rishi'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Hrudaya Samudra Kalaki',
        name: 'Rishi'
    });
});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        });
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: String(error)
            });
        }
        forecast({latitude, longitude, location}, (err, forecast) => {
            if(err) {
                return res.send({
                    error: String(err)
                });
            }
            res.send({
                forecast,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Provide a search term'
        });
    }
    console.log(req.query.rating);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: '404',
        message: 'Help article not found',
        suggestion: 'Provide link to valid help article',
        name: 'Rishi'
    });
});

app.get('*', (req, res) => {
    res.render('notFound', {
        message: 'Page not found',
        suggestion: 'Provide valid path',
        name: 'Rishi',
        title: '404'
    });
});

app.listen(port, () => {
    console.log('Server running');
});