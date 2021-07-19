const axios = require("axios");
const crypto = require('crypto');

const {v1:uuidv1} = require('uuid');
const helper = require("./helper.js");

const serectkey = process.env.Momoserectkey;

const endpoint = "https://test-payment.momo.vn/gw_payment/transactionProcessor";
const hostname = "https://test-payment.momo.vn";
const path = "/gw_payment/transactionProcessor";

let options = {};
options.partnerCode = process.env.MomopartnerCode;
options.accessKey = process.env.MomoaccessKey;
options.orderInfo = "pay with MoMo"
options.returnUrl = "https://localhost:5000"
options.notifyUrl = "https://callback.url/5000"

let controller = {};
// 1 controller for create the request
// 1 conteoller for compare the hash
// 1 heplper for create the hashtring
// 1 helper for 

rawSignature = ""

controller.captureWallet = async (cart) => {
    //Hien tai chua co cart.
    let amount = "50000";
    let orderId = uuidv1();
    let requestId = uuidv1();
    let requestType = "captureMoMoWallet"
    let extraData = "merchantName=;merchantId="
    let captureData = {
        ...options,
        amount,
        orderId,
        requestId,
        requestType,
        extraData
    }
    let signature = helper.createSignature(captureData,'captureWallet',serectkey);
    let body = JSON.stringify({
        ...options,
        requestId : requestId,
        amount : amount,
        orderId : orderId,
        extraData : extraData,
        requestType : requestType,
        signature : signature,
    });
    try {
        let response = await axios.post(endpoint,body);
        let data= response.data;
        return data;
    }   catch (e) {
        console.log(e)
    }
}

module.exports = controller;