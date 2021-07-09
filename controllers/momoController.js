const axios = require("axios");
const {v1:uuidv1} = require('uuid');
const helper = require("./helper.js");

const endpoint = "https://test-payment.momo.vn/gw_payment/transactionProcessor";
const hostname = "https://test-payment.momo.vn";
const path = "/gw_payment/transactionProcessor";
const crypto = require('crypto');

let options = {};
let partnerCode = "MOMOQPL020210613";
let accessKey = "DMx7wb6xCpvyDDki"
serectkey = "3aPvOd59gY7eHQpCzDwJ77VhOw3tKBxI"
let orderInfo = "pay with MoMo"
let returnUrl = "https://localhost:5000"
let notifyurl = "https://callback.url/5000"

let controller = {};
// 1 controller for create the request
// 1 conteoller for compare the hash
// 1 heplper for create the hashtring
// 1 helper for 

controller.captureWallet = async (cart) => {
    //Hien tai chua co cart.
    let amount = "50000";
    let orderId = uuidv1();
    let requestId = uuidv1();
    let requestType = "captureMoMoWallet"
    let extraData = "merchantName=;merchantId="
    /*
    let captureData = {
        ...options,
        amount,
        orderId,
        requestId,
        requestType,
        extraData
    }*/
    let rawSignature = "partnerCode="+partnerCode+"&accessKey="+accessKey+"&requestId="+requestId+"&amount="+amount+"&orderId="+orderId+"&orderInfo="+orderInfo+"&returnUrl="+returnUrl+"&notifyUrl="+notifyurl+"&extraData="+extraData
    let signature = crypto.createHmac('sha256', serectkey)
                   .update(rawSignature)
                   .digest('hex');
    //let signature = helper.createSignature(captureData,'captureWallet',serectkey);
    //let body = JSON.stringify({
    //    ...captureData,
    //    signature:signature
   // })

    let body = JSON.stringify({
        partnerCode : partnerCode,
        accessKey : accessKey,
        requestId : requestId,
        amount : amount,
        orderId : orderId,
        orderInfo : orderInfo,
        returnUrl : returnUrl,
        notifyUrl : notifyurl,
        extraData : extraData,
        requestType : requestType,
        signature : signature,
    });
    try {
        let response = await axios.post(endpoint,body);
        // Kiểm tra chu ky
        let data= response.data;
        return data;
        //if (helper.checkPayURl(data)) return data;
        //else captureWallet(cart);
    }   catch (e) {
            console.log(e);
        }
}




module.exports = controller;