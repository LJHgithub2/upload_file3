var IMP = window.IMP; 
IMP.init("imp00383227");
const flower = document.getElementById("flower_name");
const flower_pay = document.getElementById("flower_pay");
var Price;
Price = flower_pay.innerHTML.replace(",","")
var Price_second;
Price_second = Price.replace("원","") 
const reciver_address = document.getElementById("funeral_name");

function requestPay() {
    // IMP.request_pay(param, callback) 결제창 호출
    IMP.request_pay({ // param
        pg: "nice",
        pay_method: "card",
        merchant_uid: 'aedo_'+new Date().getTime(),
        name: flower.innerHTML,
        amount: Price_second,
        buyer_email: "gildong@gmail.com",
        buyer_name: $("#recive_name").val(),
        buyer_tel: $("#recive_phone").val(),
        buyer_addr: reciver_address.innerText, // 종현 작업
        buyer_postcode: "505050"
    }, function (rsp) { // callback
        console.log(rsp);
        if (rsp.success) {
          var msg = '결제가 완료되었습니다.';
          alert(msg);
          location.href = "결제 완료 후 이동할 페이지 url"
        } else {
          var msg = '결제에 실패하였습니다.';
          msg += rsp.error_msg;
          alert(msg);
        }
    });
  }
