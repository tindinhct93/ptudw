var accessKey = 'DMx7wb6xCpvyDDki';
var secretKey = '3aPvOd59gY7eHQpCzDwJ77VhOw3tKBxI';

var orderInfo = 'pay with MoMo';
var partnerCode = 'MOMOQPL020210613';


var redirectUrl = 'https://webhook.site/d9442c00-08a8-4e51-9ab7-47f756929a58';
var ipnUrl = 'https://webhook.site/d9442c00-08a8-4e51-9ab7-47f756929a58';
var requestType = "captureWallet";
var amount = '50000';

var orderId = partnerCode + new Date().getTime();
var requestId = orderId;
var extraData ='';
var paymentCode = 'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
var orderGroupId ='';
var autoCapture =true;
var lang = 'vi';

//before sign HMAC SHA256 with format
//accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
//puts raw signature
console.log("--------------------RAW SIGNATURE----------------")
console.log(rawSignature)
//signature
const crypto = require('crypto');
var signature = crypto.createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');
console.log("--------------------SIGNATURE----------------")
console.log(signature)

//json object send to MoMo endpoint
const requestBody = JSON.stringify({
    partnerCode : partnerCode,
    partnerName : "Test",
    storeId : "MomoTestStore",
    requestId : requestId,
    amount : amount,
    orderId : orderId,
    orderInfo : orderInfo,
    redirectUrl : redirectUrl,
    ipnUrl : ipnUrl,
    lang : lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData : extraData,
    orderGroupId: orderGroupId,
    signature : signature
});
//Create the HTTPS objects
const https = require('https');
const axios = require('axios');

const hostname = 'https://test-payment.momo.vn';
const pathName = 'v2/gateway/api/create';
const endpoint = `${hostname}/${pathName}`

var config = {
    method: 'post',
    url: 'https://test-payment.momo.vn/v2/gateway/api/create',
    headers: {
        'Content-Type': 'application/json'
    },
    data : requestBody
};

async function callMomo() {
    try {
        let response = await axios.post(endpoint, requestBody, { headers: {
            'Content-Type': 'application/json'
        }})
        //let response = await axios(config)
        let data= response.data;
        console.log(data);
    }   catch (e) {
        console.log(e)
    }
}

callMomo();
