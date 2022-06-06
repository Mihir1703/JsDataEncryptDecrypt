const CryptoJS = require("crypto-js");

const reformString = (data) => {
    let ans = "";
    for (let i = 0; i < data.length; i++) {
        if (data[i + 1] > "1") {
            for (let j = 0; j < data[i + 1] - '0'; j++) {
                ans += data[i];
            }
            i++;
        } else {
            ans += data[i];
        }
    }
    return ans;
}

module.exports = (incomingData) => {
    let data = incomingData
    data['data'] = reformString(CryptoJS.AES.decrypt(data['data'], data['key']).toString(CryptoJS.enc.Utf8));
    data['dataTable'] = JSON.parse(CryptoJS.AES.decrypt(data['dataTable'], data['key']).toString(CryptoJS.enc.Utf8));
    let keys = Object.keys(data['dataTable']);
    let val = Object.values(data['dataTable'])
    let encodings = {};
    for (let i = 0; i < keys.length; i++) {
        encodings[val[i]] = keys[i];
    }
    let curr = "";
    orignalData = "";
    for (let i = 0; i < data['data'].length; i++) {
        curr += data['data'][i];
        if (encodings.hasOwnProperty(curr)) {
            orignalData += encodings[curr];
            curr = "";
        }
    }
    orignalData = CryptoJS.AES.decrypt(orignalData, data['key']).toString(CryptoJS.enc.Utf8)
    console.log(JSON.parse(orignalData));
    return JSON.parse(orignalData);
}