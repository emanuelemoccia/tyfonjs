var request = require('request')
var cache = require('memory-cache');
require('dotenv').config();
var u = require('./u');
var cipherpool = u._CipherPool();
var ot = u._Protect(cipherpool);
var data = JSON.parse(ot)
var bu = data[0][0];

module.exports = {
    auth: () => {
        var options = {
            method: 'POST',
            url: u._BaseAddress(bu, '/oauth/token'),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                grant_type: process.env.TYFON_APP_GRANT_TYPE,
                client_id: process.env.TYFON_APP_CLIENT_ID,
                client_secret: process.env.TYFON_APP_CLIENT_SECRET,
                username: process.env.TYFON_APP_APP_ID,
                password: process.env.TYFON_APP_API_KEY
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
    checkAuth: () => {
        var options = {
            method: 'GET',
            url: u._BaseAddress(bu,'/api/check-auth'),
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
    getServices: (id) => {
        var options = {
            method: 'GET',
            url: u._BaseAddress(bu,'/api/areaClienti/getServices/'+id),
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
    getProducts: (id) => {
        var options = {
            method: 'GET',
            url: u._BaseAddress(bu,'/api/areaClienti/getProducts/'+id),
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
    getOperations: (id, data) => {
        var options = {
            method: 'GET',
            url: u._BaseAddress(bu,'/api/areaClienti/getOperations/'+id+'/'+data),
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
            url: u._BaseAddress(bu,'/oauth/token'),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                grant_type: 'refresh_token',
                client_id: process.env.TYFON_APP_CLIENT_ID,
                client_secret: process.env.TYFON_APP_CLIENT_SECRET,
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
    },
    getUser: (id) => {
        var options = {
            method: 'GET',
            url: u._BaseAddress(bu,'/api/areaClienti/getUser/'+id),
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
    updateUser: (user) => {
        var options = {
            method: 'POST',
            url: u._BaseAddress(bu,'/api/areaClienti/updateUser/'+user.id),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                email: user.email,
                tel: user.tel
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
