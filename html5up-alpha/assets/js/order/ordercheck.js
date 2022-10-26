$(document).ready(function(){
	var address = unescape(location.href);
	var parameters = (address.slice(address.indexOf('?') + 1, address.length)).split('&');
	for(var i=0; i<2; i++){
		if(i==0){
			var wreath_name=parameters[i].slice(parameters[i].indexOf('=')+1,parameters[i].length);
			console.log(wreath_name);
			$("#wreath_name").text(wreath_name);
		}
		if(i==1){
			var wreath_price=parameters[i].slice(parameters[i].indexOf('=')+1,parameters[i].length);
			console.log(wreath_price);			
			$("#wreath_price").text(wreath_price);
		}
	}
})
$("#funeral_name_select").change(function(){
    $("#funeral_name").val($(this).val());
	validation();
})
$("#ribbon_text_select").change(function(){
    $("#ribbon_text").val($(this).val());
	validation();
})
$(".terms_bar_img").click(function(){
	$(".terms_box").toggle();
	var src= $(this).attr('src') === '../image/arrow_bottom_down_icon.png' ? '../image/arrow_top_up_icon.png':'../image/arrow_bottom_down_icon.png';
	$(this).attr('src',src);
});
$("#funeral_name").change(function(){
	validation();
});
$("#mortuary").change(function(){
	validation();
});
$("#resident_name").change(function(){
	validation();
});
$("#resident_phone").change(function(){
	validation();
});
$("#client_name").change(function(){
	validation();
});
$("#client_phone").change(function(){
	validation();
});
$("#company_name").change(function(){
	validation();
});
$("#ribbon_text").change(function(){
	validation();
});
$("#terms").change(function(){
	validation();
});
function validation(){
	$("#check_text").text("");
	if(!$("#funeral_name").val()){
		$("#check_text").text("장례식장 이름을 입력해주세요");
		$("#submit").attr("disabled",true);
		return;
	}
	if(!$("#mortuary").val()){
		$("#check_text").text("빈소를 입력해주세요");
		$("#submit").attr("disabled",true);
		return;
	}
	if(!$("#resident_name").val()){
		$("#check_text").text("상주 성함을 입력해주세요");
		$("#submit").attr("disabled",true);
		return;
	}
	if(checkPhoneNum($("#resident_phone").val())){	
		$("#check_text").text("전화번호는 '-'없이 11자리숫자여야합니다");
		$("#submit").attr("disabled",true);
		return;
	}
	if(!$("#client_name").val()){
		$("#check_text").text("주문자 성함을 입력해주세요");
		$("#submit").attr("disabled",true);
		return;
	}
	if(checkPhoneNum($("#client_phone").val())){	
		$("#check_text").text("전화번호는 '-'없이 11자리숫자여야합니다");
		$("#submit").attr("disabled",true);
		return;
	}
	if(!$("#company_name").val()){
		$("#check_text").text("회사명/모임명을 입력해주세요");
		$("#submit").attr("disabled",true);
		return;
	}
	if(!$("#ribbon_text").val()){
		$("#check_text").text("리본문구를 작성해주세요");
		$("#submit").attr("disabled",true);
		return;
	}
    if(!$("#terms").is(':checked')){
		$("#check_text").text("약관에 동의해주세요");
		$("#submit").attr("disabled",true);
		return;
	}
	$("#submit").attr("disabled",false);
}
function checkPhoneNum(phone){
	//if(!checkExistData(phone)) return false;
	if(phone=="") {
		console.log("전화번호를 입력해주세요");
		return true;
	};
	var phoneRegExp=/^[0-9]{11}$/;
	if(!phoneRegExp.test(phone)){
		console.log("전화번호는 '-'없이 11자리숫자여야합니다")
		return true;
	}
	return false;
}