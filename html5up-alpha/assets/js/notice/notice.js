var page_num=0;
$(document).ready(function(){
	noticeAPI();
});
function noticeAPI() {
    fetch("https://www.aedo.co.kr/v1/center/announcement",{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            'Accesstoken':sessionStorage.getItem('Accesstoken'),
        },
        }).then((response) => response.json())
        .then((data)=>{
			console.log(data.announcement)
            setup(data.announcement);
        });
}
function setup(array){
	for(var i=0; i<5; i++){
		var clone=$(".item_sample").clone().attr("class","item");
		clone.find(".num").text(page_num*5+1+i)
		clone.find(".tit a").text(array[i].title)
		clone.find(".date").text(array[i].created)
		clone.find("#post_id").val(array[i].id)
		$(".board_list_body").append(clone);
	}
}
function post_view(object){
	post_id=escape($(object).parent().find("#post_id").val())
	location.href="notice_view.html?post_id="+post_id;
}
function post_delete(object){
	fetch("https://www.aedo.co.kr/v1/center/announcement:id",{
			method:"DELETE",
			headers: {
				"Content-Type": "application/json",
				'Accesstoken':sessionStorage.getItem('Accesstoken'),
			},
			body:{
				"id":"6236ca95113d1d8a097acac2",
			}
			})
			.then((response) => console.log(response))
	
}
$("#notice_submit").click(function(){
	const date = new Date();

	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	const dateStr = year + '-' + month + '-' + day;
	if($("#notice_title").val() && $("#notice_content").val()){
		fetch("https://www.aedo.co.kr/v1/center/announcement",{
			method:"POST",
			headers: {
				"Content-Type": "application/json",
				'Accesstoken':sessionStorage.getItem('Accesstoken'),
			},
			body:JSON.stringify({
				title:$("#notice_title").val(),
				content:$("#notice_content").val(),
				created:dateStr
			}),
			})
			.then((response) => response.json())
			.then((data)=>{
				if(Math.floor(data.status/100)==2){
					alert("공지사항 작성이 완료되었습니다")
					location.href="admin_index.html";
				}
				else{
					alert("공지사항 작성을 실패하였습니다")
					location.href="notice_write.html";
				}
			});
	}
});