var phone="";
var auth_check=true;
var time;
var timer_function;
var address="https://www.aedo.co.kr/";
$(document).ready(function(){
	var uncode = unescape(location.href);
	var parameters = (uncode.slice(uncode.indexOf('?') + 1, uncode.length)).split('&');
	
    for(var i=0; i<1; i++){
        phone=parameters[i].slice(parameters[i].indexOf('=')+1,parameters[i].length);
	}
    code_receive();
});

function submit(){
    if($("#auth_number").val().length != 4){
        alert("인증번호를 정확히 입력해주십시요");
        return;
    }
    if(!auth_check){
		alert("인증번호 입력시간이 초과되었습니다");
		return;
	}
    if(!$("#terms").is(':checked')){
		alert("약관을 동의해주세요");
		return;
	}
    fetch(address+"v1/user",{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            phone:phone,
            smsnumber:$("#auth_number").val(),
        }),
        })
        .then((response) => response.json())
        .then((data)=>{
            if(Math.floor(data.status/100)==2){
                sessionStorage.setItem('Accesstoken', data.Accesstoken);
                location.href="index.html";
            }
            else{
                console.log(data.status);
                if(data.status==403){
                    alert("인증번호가 틀렸습니다.");
                    return;
                }
                var auth_num=escape($("#auth_number").val());
                location.href="signup.html?phone_num="+phone+"&sms_num="+auth_num;       
            }
        });
    

}
function code_receive(){
    $("#auth_number").attr("disabled",false);
    auth_check=false;
    clearInterval(timer_function);
    $("#time").text("남은시간 "+"3:00");
    $("#time").css("color","#777777");
    fetch(address+"v1/user/sms",{
    method:"POST", 
    headers: {
        "Content-Type": "application/json",
    },
    body:JSON.stringify({
        phone:phone,
    }),
    })
    .then((res) =>res);
    time=60*3;
    timer_function=setInterval(function(){
        if(time<1){
            $("#time").text("인증코드 만료");
            $("#time").css("color","red");
            clearInterval(timer_function);
            auth_check=false;
        }
        else{
            time--;
            $("#time").css("color","#777777");
            $("#time").text("남은시간 "+Math.floor(time/60)+":"+time%60);    
            auth_check=true;
        }
    },1000);
    
}$(document).ready(function(){
	$("#auth_number").keydown(function(key){
		if(key.keyCode==13){
			submit();
		}
	});
	$("#terms").keydown(function(key){
		if(key.keyCode==13){
			submit();
		}
	});
});