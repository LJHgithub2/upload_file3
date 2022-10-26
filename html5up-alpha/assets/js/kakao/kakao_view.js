var info;
var img;
$(document).ready(function(){

    var url = window.location.href
    var new_url = new URL(url)
    var url_params = new_url.searchParams
    var url_user = url_params.get('deceased_name')
    var url_decode = unescape(url_user);
    var url_substring = url_decode.split('(')[0];

    var address="https://www.aedo.co.kr/v1/obituary?name="+url_substring;
	fetch(address,{
		method:"get", 
		headers: {
			"Content-Type": "application/json",
			'Accesstoken':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYWVkMmExZGM2NjY0ZDAwZTQzMGViMyIsImlhdCI6MTY2NTEwNzQwNywiZXhwIjoxNjY2MzE3MDA3fQ.yEejnyjqyb5NO0GU0V9cmQZGHr2dwSm2KyzokZlEp2s"
		},
	})
	.then((res)=>res.json())
	.then((data) =>{
        var info = data.result[0]
        $(".title2").children().eq(0).text(info.deceased.name);
        $(".title2").children().eq(1).text(info.deceased.age);
        $(".title3").children().eq(0).text(info.eod.date);
        $(".deceased_info").children().eq(0).text(info.coffin.date+"  "+info.coffin.time);
        $(".deceased_info").children().eq(2).text(info.dofp.date+"  "+info.dofp.time);
        $(".deceased_info").children().eq(4).text(info.place.name);
        $(".deceased_info").children().eq(6).text(info.buried);
        $(".word_box").text(info.word);
        //for(var i=0;i<5;i++)
        $(
            '<div><span>'+info.resident.relation+'</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>'+info.resident.name+'</span></div>'
        ).appendTo($(".resident_contain"))
        set_image();
	});
    
});

function set_image(){
    fetch("https://www.aedo.co.kr/v1/obituary/image?imgname="+info.imgName,{
        method:"get", 
        headers: {
            "Content-Type": "multipart/form-data",
            'Accesstoken':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYWVkMmExZGM2NjY0ZDAwZTQzMGViMyIsImlhdCI6MTY2NTEwNzQwNywiZXhwIjoxNjY2MzE3MDA3fQ.yEejnyjqyb5NO0GU0V9cmQZGHr2dwSm2KyzokZlEp2s"
        },
    })
    .then((res)=>res.blob())
    .then((data)=> {
        const reader = new FileReader();
        const blob = data;
        reader.readAsDataURL(blob); 
        reader.onloadend = () => {
            const base64data = reader.result;
            $(".img").css('background-image',"url('"+base64data+"')");
        }
    })
}

function view_order(obj){
    var place=escape($(obj).parent().parent().children().first().children().first().text());
	location.href="kakao_view_order.html?user_id="+$(obj).prev().text()+"&place="+place+"&name=";
}