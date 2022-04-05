const path = require('path')
const hbs = require('hbs')
const weather = require('./weather')
const express = require('express');
const app = express();
const port = process.env.PORT || 3000
// Define paths for Express configration 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../template/view')
const hbsPartial = path.join(__dirname, '../template/partial')

//setup handlebars engine and view location
hbs.registerPartials(hbsPartial)
app.set('view engine', 'hbs')
app.set('views', viewPath)

// set up static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        name: 'Muaaz',
        lastName: 'hanif',
        title: 'This is index page ',
        footer: 'This is index page footer '
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'This is about page ',
        footer: 'This is about page footer '
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is help page ',
        footer: 'This is help page footer '
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You Must provide an address'
        })
    }
    weather(req.query.address, (Error, response) => {
        if (Error) {
            console.log(Error)
        }
        else {
            res.send(response)
        }
    })
})
app.get('/products', (req, res) => {
    if (!req.query.address) {
        return res.send({
            Error: 'Some Thing Wrong'
        })
    }
    res.send({
        forecast: 'anything',
        location: req.query.address
    })
})
app.get('/help/*', (req, res) => {
    res.render('Error404', {
        message: 'Help page is not found'
    })
})
// app.get('*', (req, res) => {
//     res.render('Error404', {
//         message: 'page not Found'
//     })
// })
app.listen(port, () => {
    console.log(`3000 is on running ${port}`)
})