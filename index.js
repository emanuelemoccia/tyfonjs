var request = require('request')
var cache = require('memory-cache');
require('dotenv').config()
var baseUrl = 'http://tyfon.io'
var getUrl = (url) => {return baseUrl+url}

module.exports = {
    init: () => {
        var options = {
            method: 'POST',
            url: getUrl('/oauth/token'),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                grant_type: process.env.REACT_APP_GRANT_TYPE,
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET,
                username: process.env.REACT_APP_APP_ID,
                password: process.env.REACT_APP_API_KEY
            }
        }
        return new Promise((resolve, reject) => {
            request(options, function (error, response) {
                if (error) {
                    reject(error);
                } else {
                    //cache.put('foo', 'bar');
                    var _t = JSON.parse(response.body);
                    console.log(_t.access_token)
                    cache.put('_ta', _t.access_token);
                    cache.put('_tr', _t.refresh_token);
                    resolve(response.body);
                }
                
            });
        })
    },
    check: () => {
        var options = {
            method: 'GET',
            url: getUrl('/api/menu'),
            'headers': {
              'Authorization': 'Bearer '+cache.get('_ta')
            }
        };
        return new Promise((resolve, reject) => {
            request(options, function (error, response) {
                if (error) reject(error);
                resolve(response.body);
            });
        })
    },
    refresh: () => {
        var options = {
            method: 'POST',
            url: getUrl('/oauth/token'),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                grant_type: 'refresh_token',
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET,
                refresh_token: cache.get('_tr')
            }
        }
        return new Promise((resolve, reject) => {
            request(options, function (error, response) {
                if (error) {
                    reject(error);
                } else {
                    var _t = JSON.parse(response.body);
                    cache.put('_ta', _t.access_token);
                    cache.put('_tr', _t.refresh_token);
                    resolve(response.body);
                }
            });
        })
      }
};
