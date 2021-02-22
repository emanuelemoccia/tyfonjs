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
    getIntDocs: () => {
        var options = {
            method: 'GET',
            url: u._BaseAddress(bu,'/api/check-auth'),
            'headers': {
              'Authorization': 'Bearer '+cache.get('_ta')
            }
        };
        return new Promise((resolve, reject) => {
           /*  request(options, function (error, response) {
                if (error) reject(error);
                resolve(response.body);
            }); */
            const data = [
                {
                  doctype: 'allegatog',
                  hash: 'b133a0c0e9bee3be20163d2ad31d6248db292aa6dcb1ee087a2aa50e0fc75ae2',
                  base64: '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'
                },
                {
                  doctype: 'preventivo',
                  hash: 'b133a0c0e9bee3be20163d2ad31d6248db292aa6dcb1ee087a2aa50e0fc75ae2',
                  base64: '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'
                },
                {
                  doctype: 'contratto_manutenzione',
                  hash: 'b133a0c0e9bee3be20163d2ad31d6248db292aa6dcb1ee087a2aa50e0fc75ae2',
                  base64: 'JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PC9DcmVhdG9yIChNb3ppbGxhLzUuMCBcKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTVfNVwpIEFwcGxlV2ViS2l0LzUzNy4zNiBcKEtIVE1MLCBsaWtlIEdlY2tvXCkgQ2hyb21lLzg0LjAuNDE0Ny4xMzUgU2FmYXJpLzUzNy4zNikKL1Byb2R1Y2VyIChTa2lhL1BERiBtODQpCi9DcmVhdGlvbkRhdGUgKEQ6MjAyMDA5MjMxNDUyMTErMDAnMDAnKQovTW9kRGF0ZSAoRDoyMDIwMDkyMzE0NTIxMSswMCcwMCcpPj4KZW5kb2JqCjMgMCBvYmoKPDwvY2EgMQovQk0gL05vcm1hbD4+CmVuZG9iago0IDAgb2JqCjw8L0NBIDEKL2NhIDEKL0xDIDAKL0xKIDAKL0xXIDEKL01MIDQKL1NBIHRydWUKL0JNIC9Ob3JtYWw+PgplbmRvYmoKNyAwIG9iago8PC9UeXBlIC9YT2JqZWN0Ci9TdWJ0eXBlIC9JbWFnZQovV2lkdGggMTgwMAovSGVpZ2h0IDEyMDAKL0NvbG9yU3BhY2UgL0RldmljZVJHQgovQml0c1BlckNvbXBvbmVudCA4Ci9GaWx0ZXIgL0ZsYXRlRGVjb2RlCi9MZW5ndGggNjY4OTk+PiBzdHJlYW0KeJzs3duS7LrKpuFx/zddHasrQn/NtFNGEkh8+H2O1qzhtAEhvIne/PwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAz/79cTqWLKhJH/XJo/xa6CaoG7kv6gAt//7rdDgAAAAAYvH8f0VN+qhPHuXXQjdB3ch9UQdo4bsoAAAA8Co8/19Rkz7qk0f5tdBNUDdyX9QBWlqv0rQAAADAG/DSekVN+qhPHuXXQjdB3ch9UQdo4bsoAAAA8Cq8tF5Rkz7qk0f5tdBNUDdyX9QBWvguCgAAALwKL61X1KSP+uRRfi10E9SN3Bd1gBa+iwIAAACvwkvrFTXpoz55lF8L3QR1I/dFHaCF76IAAADAq/DSekVN+qhPHuXXQjdB3ch9UQdo4bsoAAAA8Cq8tF5Rkz7qk0f5tdBNUDdyX9QBWvguCgAAALwKL61X1KSP+uRRfi10E9SN3Bd1gBa+iwIAAACvwkvrFTXpoz55lF8L3QR1I/dFHaCF76IAAADAq/DSekVN+qhPHuXXQjdB3ch9UQdo4bsoAAAA8CrSL623YX/8cSI16ZpsQH3yKL8WugnqRu6LOkAL30UBAACAV5F+ab2G/ZHLXHbSNdmA+uRRfi10E9SN3Bd1gBa+iwIAAACvIv3SynfRI6hPHuXXQjdB3ch9UQdo4bsoAAAA8CrSL618Fz2C+uRRfi10E9SN3Bd1gBa+iwIAAACvIv3SynfRI6hPHuXXQjdB3ch9UQdo4bsoAAAA8CrSL618Fz2C+uRRfi10E9SN3Bd1gBa+iwIAAACvIv3SynfRI6hPHuXXQjdB3ch9UQdo4bsoAAAA8CrSL618Fz2C+uRRfi10E9SN3Bd1gBa+iwIAAACvIv3SynfRI6hPHuXXQjdB3ch9UQdo4bsoAAAA8CrSL618Fz2C+uRRfi10E9SN3Bd1gBa+iwIAAACvIv3SynfRI6hPHuXXQjdB3ch9UQdo4bsoAAAA8CrSL618Fz2C+uRRfi10E9SN3Bd1gBa+iwIAAACvIv3SynfRI6hPHuXXQjdB3ch9UQdo4bsoAAAA8CrSL618Fz2C+uRRfi10E9SN3Bd1gBa+iwIAAACvIv3SynfRI6hPHuXXQjdB3ch9UQdo4bsoAAAA8CrSL618Fz2C+uRRfi10E9SN3Bd1gBa+iwIAAACvIv3SynfRI6hPHuXXQjdB3ch9UQdo4bsoAAAA8CrSL618Fz2C+uRRfi10E9SN3Bd1gBa+iwIAAACvIv3SynfRI6hPHuXXQjdB3ch9UQdo4bsoAAAA8CrSL618Fz2C+uRRfi10E9SN3Bd1gBa+iwIAAACvIv3SynfRI6hPHuXXQjdB3ch9UQdo4bsoAAAA8CrSL618Fz2C+uRRfi10E9SN3Bd1gBa+iwIAAACvIv3SynfRI6hPHuXXQjdB3ch9UQdo4bsoAAAA8CrSL618Fz2C+uRRfi10E9SN3Bd1gBa+iwIAAACvIv3SynfRI6hPHuXXQjdB3ch9UQdo4bsoAAAA8CrSL618Fz2C+uRRfi10E9SN3Bd1gBa+iwIAAACvIv3SynfRI6hPHuXXQjdB3ch9UQdo4bsoAAAA8CrSL618Fz2C+uRRfi10E9SN3Bd1gBa+iwIAAACvIv3SynfRI6hPHuXXQjdB3ch9UQdo4bsoAAAA8CrSL618Fz2C+uRRfi10E9SN3Bd1gBa+iwIAAACvIv3SynfRI6hPHuXXQjdB3ch9UQdo4bsoAAAA8CrSL618Fz2C+uRRfi10E9SN3Bd1gBa+iwIAAACvIv3SynfRI6hPHuXXQjdB3ch9UQdo4bsoAAAA8CrSL618Fz2C+uRRfi10E9SN3Bd1gBa+iwIAAACvIv3SynfRI6hPHuXXQjdB3ch9UQdo4bsoAAAA8CrSL618Fz2C+uRRfi10E9SN3Bd1gBa+iwIAAACvIv3SynfRI6hPHuXXQjdB3ch9UQdo4bsoAAAA8CrqL618F92P+uRRfi10E9SN3Bd1gBaJ76L/Lk5HBAAAAKgq9lzNd9ENqE8e5ddCN0HdyH1RB2hJ/l30+kWULQYAAACsKPZEzXfRDahPHuXXQjdB3ch9UQdoSftdtL+V2GgAAADAnGLP0nwX3YD65FF+LXQT1I3cF3WAlpzfRY2biL0GAAAAjKr30sp30WjUJ4/ya6GboG7kvqgDtOT8LgoAAAAgSL2XVr6LRqM+eZRfC90EdSP3RR2ghe+iAAAAwKvUfmnlu2gE6pNH+bXQTVA3cl/UAVq0vouyuQAAAIBF0i+tj2HzXTQC9cmj/FroJqgbuS/qAC2Zv4t+bKV//3U2NgAAAECU9EP1Y+R8F41AffIovxa6CepG7os6QEva76L/vvjh/9QoAAAAsED6pfXbO8LtYXOn9Qu2DuqTR/m10E1QN3Jf1AFaPj42ng7n//yN57qnskULAAAAqJB+ab39LrqeiHRNNqA+eZRfC90EdSP3RR2ghe+iAAAAwKtIv7TyXfQI6pNH+bXQTVA3cl/UAVqEvot++1cAAAAAdtIvrd++iy7mIl2TDahPHuXXQjdB3ch9UQdoSftd9Ofumefj72fDAwAAABRJv7R2vouupCNdkw2oTx7l10I3Qd3IfVEHaGm9mrBpP3aT1zMPAAAA8GbSD9Xdz6LzSUnXZAPqk0f5tdBNUDdyX9QBWj6+Op4O5wGbCwAAAFgk/dJq+S46kZp0TTagPnmUXwvdBHUj90UdoEXruygAAACARdIvrfbvokPZSddkA+qTR/m10E1QN3Jf1AFa+C4KAAAAvIr0SyvfRY+gPnmUXwvdBHUj90UdoIXvogAAAMCrSL+08l30COqTR/m10E1QN3Jf1AFa+C4KAAAAvIr0SyvfRY+gPnmUXwvdBHUj90UdoIXvogAAAMCrRL+0hr5Z8F30COqTR/m10E1QN3Jf1AFa+C4KAAAAvMqe76JB57d/FB26Oi/yfdQnj/JroZugbuS+qAO0tF6laQEAAIA3iH5pnf44OXHyvrnT+gZcA/XJo/xa6CaoG7kv6gAtrVfTNu1tYGmjBQAAAJKLfmld+T45cfKOudM6RlsG9cmj/FroJqgbuS/qAC2tV9M27W1gaaMFAAAAkot+aV38RDlx8m/mTusVaiXUJ4/ya6GboG7kvqgDtLReTdi0js85AAAAAH5FP1GHPr0/viPMXZG3jD7qk0f5tdBNUDdyX9QBWlqvJmxar4ccAAAAAE30Q3XoM3z/HWH6crxo9FGfPMqvhW6CupH7og7Q0no1bdOmDQwAAABQFP3S6vi5cuLkcxfiRb6P+uRRfi10E9SN3Bd1gJbWqzQtAAAA8AbRL62+XywnTj5xFV7k+6hPHuXXQjdB3ch9UQdoab1K0wIAAABvEP3SGvHdcuLkQ+fnRb6P+uRRfi10E9SN3Bd1gJbWq5mbdv05BwAAAMCv6Cfq/rfKxUf6oJPzltFHffIovxa6CQ5F3j9StAK/dFcQ79R6NW3TujznAAAAAPgV/UTdeYBff7DfcNrxjOujPnmUXwvdBIci7x8pWoFfuiuId2q9mrZp0wYGAAAAKIp+aX3+XvmF+8nnYp7NuzLqk0f5tdBNUDdyX9QBWlqvpm3atIEBAAAAiqJfWoc+XX7wPflczAupl0V98ii/FroJ6kbuizpAS+vVtE2bNjAAAABAUfRL69CnyyvHk8/FvJZ9TdQnj/JroZugbuS+qAO0tF7N3LSZYwMAAAC0RL+0Dn267Fg/+VzMTmUohfrkUX4tdBPUjdwXdYCW1qvJmzZ5eAAAAICK6JfWoU+XHesnn4vZqQylUJ88yq+FboK6kfuiDtDSejVt07o85wAAAAD4Ff1E3XmAH7V48rmY/SpRB/XJo/xa6CaoG7kv6gAtrVfTNq3Lcw4AAACAX9FP1J0H+AkrJ5+L2bU'
                }
              ];
              resolve(data);
        })
    },
    getInts: () => {
        var options = {
            method: 'GET',
            url: u._BaseAddress(bu,'/api/check-auth'),
            'headers': {
              'Authorization': 'Bearer '+cache.get('_ta')
            }
        };
        return new Promise((resolve, reject) => {
           /*  request(options, function (error, response) {
                if (error) reject(error);
                resolve(response.body);
            }); */
            const data = [
                {
                    dateInt: '10/12/2020',
                    hash: 'b133a0c0e9bee3be20163d2ad31d6248db292aa6dcb1ee087a2aa50e0fc75ae2'
                }
              ];
              resolve(data);
        })
    },
    getServices: () => {
        var options = {
            method: 'GET',
            url: u._BaseAddress(bu,'/api/check-auth'),
            'headers': {
              'Authorization': 'Bearer '+cache.get('_ta')
            }
        };
        return new Promise((resolve, reject) => {
           /*  request(options, function (error, response) {
                if (error) reject(error);
                resolve(response.body);
            }); */
            const data = [
                {
                    numeroContratto:"012345",
                    indirizzo:"Via G. Paisiello 15, 80010 Quarto (NA)",
                    statoAbbonamento:"ATTIVO",
                    metodoPagamento:"SDD",
                    statoPagamento:"IN SCADENZA",
                    image:"/static/images/image.jpg",
                },
                {
                    numeroContratto:"067891",
                    indirizzo:"Via A. De Gasperi 11, 80010 Quarto (NA)",
                    statoAbbonamento:"ATTIVO",
                    metodoPagamento:"CONTANTI",
                    statoPagamento:"IN SCADENZA",
                    image:"/static/images/home.jpg",
                }
              ];
              resolve(data);
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
    }
};
