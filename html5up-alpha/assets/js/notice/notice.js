const { json } = require("stream/consumers");


function noticeAPI() {
    fetch("https://www.aedo.co.kr/v1/center/announcement",{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            'Accesstoken':sessionStorage.getItem('Accesstoken'),
            //"Accesstoken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYWVkMmExZGM2NjY0ZDAwZTQzMGViMyIsImlhdCI6MTY1ODQ2NTM2NCwiZXhwIjoxNjU5Njc0OTY0fQ.jmeRAZZ5BSmUC2mgrT20lSvOquCFOBc3AFikdD0ZV6g"
        },
        }).then((response) => response.json())
        .then((data)=>{
            console.log(data);
        });
}
function post_delete(object){
	console.log(object);
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