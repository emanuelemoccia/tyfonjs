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
                    if(response.statusCode < 400) {
                        var _t = JSON.parse(response.body);
                        cache.put('_ta', _t.access_token);
                        cache.put('_tr', _t.refresh_token);
                        resolve(response.body);
                    } else {
                        reject(response.body);
                    }
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
                if (error) {
                    reject(error);
                } else {
                    if(response.statusCode < 400) {
                        resolve(response.body);
                    } else {
                        reject(response.body);
                    }
                }
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
                if (error) {
                    reject(error);
                } else {
                    if(response.statusCode < 400) {
                        resolve(response.body);
                    } else {
                        reject(response.body);
                    }
                }
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
                if (error) {
                    reject(error);
                } else {
                    if(response.statusCode < 400) {
                        resolve(response.body);
                    } else {
                        reject(response.body);
                    }
                }
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
                    if(response.statusCode < 400) {
                        var _t = JSON.parse(response.body);
                        cache.put('_ta', _t.access_token);
                        cache.put('_tr', _t.refresh_token);
                        resolve(response.body);
                    } else {
                        reject(response.body);
                    }
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
                if (error) {
                    reject(error);
                } else {
                    if(response.statusCode < 400) {
                        resolve(response.body);
                    } else {
                        reject(response.body);
                    }
                }
            });
        })
    },
    updateUser: (user) => {
        var options = {
            method: 'POST',
            url: u._BaseAddress(bu,'/api/areaClienti/updateUser/'+user.id),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer '+cache.get('_ta')
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
                    if(response.statusCode < 400) {
                        resolve(response.body);
                    } else {
                        reject(response.body);
                    }
                }
            });
        })
    },
    getPdp: (id) => {
        var options = {
            method: 'GET',
            url: u._BaseAddress(bu,'/api/areaClienti/getPdp/'+id),
            'headers': {
              'Authorization': 'Bearer '+cache.get('_ta')
            }
        };
        return new Promise((resolve, reject) => {
            request(options, function (error, response) {
                if (error) {
                    reject(error);
                } else {
                    if(response.statusCode < 400) {
                        resolve(response.body);
                    } else {
                        reject(response.body);
                    }
                }
            });
        })
    },
    getListino: (lastDance) => {
        var options = {
            method: 'GET',
            url: u._BaseAddress(bu,'/api/areaClienti/getListino/'+lastDance),
            'headers': {
              'Authorization': 'Bearer '+cache.get('_ta')
            }
        };
        return new Promise((resolve, reject) => {
            request(options, function (error, response) {
                if (error) {
                    reject(error);
                } else {
                    if(response.statusCode < 400) {
                        resolve(response.body);
                    } else {
                        reject(response.body);
                    }
                }
            });
        })
    },
    putLead: (lead) => {
        var options = {
            method: 'POST',
            url: u._BaseAddress(bu,'/api/areaClienti/insertLeadAreaClienti'),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer '+cache.get('_ta')
            },
            form: lead
        }
        return new Promise((resolve, reject) => {
            request(options, function (error, response) {
                if (error) {
                    reject(error);
                } else {
                    if(response.statusCode < 400) {
                        resolve(response.body);
                    } else {
                        reject(response.body);
                    }
                }
            });
        })
    },
};
