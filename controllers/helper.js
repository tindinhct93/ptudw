const crypto = require('crypto');
let helper = {};
helper.createStarList = (stars) => {
    let str = `<ul class="list">
    <li><a href="#">5 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i
             class="fa fa-star"></i><i class="fa fa-star"></i> ${stars[4]}</a></li>
    <li><a href="#">4 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i
             class="fa fa-star"></i><i class="fa fa-star disabled"></i> ${stars[3]}</a></li>
    <li><a href="#">3 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i
             class="fa fa-star disabled"></i><i class="fa fa-star disabled"></i> ${stars[2]}</a></li>
    <li><a href="#">2 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star disabled"></i><i
             class="fa fa-star disabled"></i><i class="fa fa-star disabled"></i> ${stars[1]}</a></li>
    <li><a href="#">1 Star <i class="fa fa-star"></i><i class="fa fa-star disabled"></i><i class="fa fa-star disabled"></i><i
             class="fa fa-star disabled"></i><i class="fa fa-star disabled"></i> ${stars[0]}</a></li>
    </ul>`
    return str;
}

helper.createStar = (star) => {
    let str = '';
    for (let i=0;i<star;i++) {
        str +=  '<i class="fa fa-star"></i>'
    }
    return str
}

const ordinary = {
    captureWallet:['partnerCode','accessKey','requestId','amount','orderId','orderInfo','returnUrl','notifyUrl','extraData'],
    checkPayURl: ['requestId','orderId','message','localMessage','payUrl','errorCode','requestType']
}

helper.createRawSignature = (data,options) => {
    itemList = ordinary[options];
    //maps and join
    resultList = itemList.map(item=>
    {let a = `${item}=${data[item]}`;
    return a;
    })
    return resultList.join("&");
}


helper.createSignature = (data,options,serectkey) => {
    let rawSignature = helper.createRawSignature(data,options);
    //let rawSignature = `requestId=${data.requestId}&orderId=${data.orderId}&message=${data.message}&localMessage=${data.localMessage}&8payUrl=${data.payUrl}&errorCode=${data.errorCode}&requestType=${data.requestType}`
    let signature = crypto.createHmac('sha256', serectkey)
                   .update(rawSignature)
                   .digest('hex');
    return signature
}

module.exports = helper;
