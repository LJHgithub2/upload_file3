window.addEventListener("wheel", function(e){
	e.preventDefault();
},{passive : false});
var $html = $("html");
var page = 1;
var last_page=10;
$("html").ready(function(){
	$html.animate({scrollTop : 0},1);
})

$(window).on("wheel", function(e){
	if($html.is(":animated")) return;
    var pos;
	if(e.originalEvent.deltaY > 0){
		if(page!=last_page){
        pos=$('.wreath'+page).offset().top;
		page++;
		}
	}else if(e.originalEvent.deltaY < 0){
		if(page==2){
			page--;
			pos=0;
		}
		if(page>2){
		page--;
        pos=$('.wreath'+(page-1)).offset().top;
		}
	}
	$html.animate({scrollTop : pos},200);
});
$(document.body).delegate("#aaa","click",function(){
	var wreath_name=$(this).parent().parent().prev().prev().prev().children().next().children().text();
	var wreath_price=$(this).parent().parent().prev().prev().children().next().children().next().prev().text();
	var wreath_name_encode=escape(wreath_name);
	var wreath_price_encode=escape(wreath_price);
	location.href="ordercheck.html?wreath_name="+wreath_name_encode+"&wreath_price="+wreath_price_encode;
});