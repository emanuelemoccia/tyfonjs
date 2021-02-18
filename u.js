var CryptoJS = require("crypto-js");
module.exports = {
    _CipherPool:() => {
        return "U2FsdGVkX18ZeV/UdzCSebt8V6+/phMOkJ/gXinZpuIoGlx4QAlUU3yvZOaF8UQd";
    },
    _Protect:(uintptr) => {
        var bytes  = CryptoJS.AES.decrypt(uintptr, process.env.TYFON_AF_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    },
    _BaseAddress:(base64, url) => {
        return base64.concat(url)
    }
}