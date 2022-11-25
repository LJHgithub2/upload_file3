$(document).ready(function(){
	var addr = unescape(location.href);
	var parameters = (addr.slice(addr.indexOf('?') + 1, addr.length)).split('&');
    for(var i=0; i<1; i++){
        if(i==0)
        post_id=parameters[i].slice(parameters[i].indexOf('=')+1,parameters[i].length);
	}
    console.log(post_id);
    fetch("https://www.aedo.co.kr/v1/center/announcement?id="+post_id,{
			method:"GET",
			headers: {
				"Content-Type": "application/json",
				'Accesstoken':sessionStorage.getItem('Accesstoken'),
			},
			})
			.then((response) => response.json())
			.then((data)=>{
				setup(data.announcement);
			});
});
function setup(array){
    $(".notice_title").text(array.title);
    $(".notice_created").text(array.created);
    $(".notice_contents").text(array.content);
}