var phone_num;
var sms_num;
$(document).ready(function(){
	var addr = unescape(location.href);
	var parameters = (addr.slice(addr.indexOf('?') + 1, addr.length)).split('&');
    for(var i=0; i<2; i++){
        if(i==0)
        phone_num=parameters[i].slice(parameters[i].indexOf('=')+1,parameters[i].length);
        if(i==1)
        sms_num=parameters[i].slice(parameters[i].indexOf('=')+1,parameters[i].length);
	}
    $("#phone").val(phone_num);
});
$(".terms_bar_img").click(function(){
	$(".term_text").toggle();
	var src= $(this).attr('src') === './images/arrow_bottom_down_icon.png' ? './images/arrow_top_up_icon.png':'./images/arrow_bottom_down_icon.png';
	$(this).attr('src',src);
});
function register(){
    if(!validation()) return;
    var address="https://www.aedo.co.kr/";
    fetch(address+"v1/user",{
            method:"POST",
            headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            phone:phone_num,
            birth:$("#date").val(),
            name:$("#name").val(),
            terms:true,
            smsnumber:sms_num,
        }),
    })
    .then((response) => response.json())
    .then((data)=>{
        if(Math.floor(data.status/100)==2){
            sessionStorage.setItem('Accesstoken', data.Accesstoken);
            location.href='index.html';
        }
        else{
            alert("회원가입 실패하였습니다.");
        }
    });
}
function validation(){
	if(!$("#name").val()){
		alert("이름을 정확히 입력해주세요");
		return false;
	}
	if(!$("#date").val()){
		alert("생년월일을 정확히 입력해주세요");
		return false;
	}
	if(!$("#terms").is(':checked')){
		alert("약관을 동의해주세요");
		return false;
	}
    return true;
}