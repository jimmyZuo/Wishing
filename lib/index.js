var dappAddress = "n1JJZJED9GuvSKBGF3NJLygTPT2L4dcqmfY";
var hash = "19cff9ee182ef272511ea143f8821a8ef63c2656128e2de470c6aacaa9460d47";
var NebPay = require("nebpay");
var nebPay = new NebPay();


function submit() {
    var con = $("#con").val();
    var user = $("#user").val();

    if(con.length>80 || con.length==0){
        alert("许愿内容不得为空或大于80字");
        return false;
    }
    if(user.length>12 || user.length==0){
        alert("昵称不得为空或大于12字");
        return false;
    }
    nebPay.call(dappAddress, "0", "set", JSON.stringify([{
        content: con,
        use: user,
        time: Date.now()
    }]), {
        listener: function (res) {
            console.log(res);
        }
    });

}
//格式化时间戳
function getTime (data) {
    var myDate = new Date(+data);
    var year = myDate.getFullYear();
    var months = myDate.getMonth() + 1;
    var month = months.toString().length === 2 ? months : '0' + months;
    var date = myDate.getDate().toString().length === 2 ? myDate.getDate() : '0' + myDate.getDate();
    var hours = myDate.getHours().toString().length === 2 ? myDate.getHours() : '0' + myDate.getHours();
    var minutes = myDate.getMinutes().toString().length === 2 ? myDate.getMinutes() : '0' + myDate.getMinutes();
    var seconds = myDate.getSeconds().toString().length === 2 ? myDate.getSeconds() : '0' + myDate.getSeconds();
    return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
}

$("#add").click(function(){
    $("#logo_box").show();
});
$("#close").click(function(){
    $("#logo_box").hide();
});

function getAll() {
    nebPay.simulateCall(dappAddress, "0", "get", JSON.stringify([]), {
        listener: function (res) {
            if (res.result == '' && res.execute_err == 'contract check failed') {
                alert('合约检测失败，请检查浏览器钱包插件环境！');
                return;
            }

            var data = JSON.parse(JSON.parse(res.result));
            console.log(data, 'data')
        }
    });
}

$(function (){
    getAll();

});