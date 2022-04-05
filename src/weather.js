const request = require('request')
const weather = (place, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=5b5604100a146bbcb488dd43381d075a`
    request({ url, json: true }, (error, res) => {
        if (error) {
            callback(error, undefined)
        }
        else if (res.body) {
            callback(false, res.body.main)

        }


    })
}

module.exports = weather