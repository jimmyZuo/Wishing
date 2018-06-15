var dappAddress = "n1yZHacaxVHKS2Pv6UL4epXg8P7KFMegRD2";
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
            //console.log(res);
            if (res.txhash) {
                alert("感谢您的支持，您的愿望定会实现！");
                $("#logo_box").hide();
                $("#wList").append("<div class='list'><p>"+con+"</p><span>"+user+"<i>"+getTime(Date.now())+"</i></span></div>");
            }
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
    return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes;
}



function getAll() {
    $("#wList").html("数据提取中，请稍后....");
    nebPay.simulateCall(dappAddress, "0", "get", JSON.stringify([]), {
        listener: function (res) {
            if (res.result == '' && res.execute_err == 'contract check failed') {
                alert('合约检测失败，请检查浏览器钱包插件环境！');
                return;
            }

            var data = JSON.parse(JSON.parse(res.result));
            inithtml(data);
        }
    });
}

function inithtml(data) {
    $("#wList").html("");
    var str = "";
    if(data.length>0){
        for(var i=0;i<data.length;i++){
            str += "<div class='list'><p>"+data[i].content+"</p><span>"+data[i].use+"<i>"+getTime(data[i].time)+"</i></span></div>";
        }
        $("#wList").html(str);
    }
}

$(function (){
    $("#add").click(function(){
        $("#logo_box").show();
    });
    $("#close").click(function(){
        $("#logo_box").hide();
    });
    getAll()

});