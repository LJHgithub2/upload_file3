var info;
var img;
$(document).ready(function(){
	var user_id = unescape(location.href);
	var parameters = (user_id.slice(user_id.indexOf('?') + 1, user_id.length)).split('&');
	var place, deceased;
    for(var i=0; i<3; i++){
        if(i==0)
        user_id=parameters[i].slice(parameters[i].indexOf('=')+1,parameters[i].length);
        if(i==1)
        place=parameters[i].slice(parameters[i].indexOf('=')+1,parameters[i].length);
        if(i==2)
        deceased=parameters[i].slice(parameters[i].indexOf('=')+1,parameters[i].length);
	}
    var address="https://www.aedo.co.kr/v1/obituary";
	fetch(address,{
		method:"get", 
		headers: {
			"Content-Type": "application/json",
			'Accesstoken':sessionStorage.getItem('Accesstoken'),
		},
	})
	.then((res)=>res.json())
	.then((data) =>{
        for(i in data.result){
            if(data.result[i]._id==user_id){
                info=data.result[i];
                set_info();
                return;
            }
        }
	});
    
});
function set_info(){
    $(".title2").children().eq(0).text(info.deceased.name);
    $(".title2").children().eq(1).text(info.deceased.age);
    $(".title3").children().eq(0).text(info.eod.date);
    $(".deceased_info").children().eq(0).text(info.coffin.date+"  "+info.coffin.time);
    $(".deceased_info").children().eq(2).text(info.dofp.date+"  "+info.dofp.time);
    $(".deceased_info").children().eq(4).text(info.place.name+" "+info.place.number+"호실");
    $(".deceased_info").children().eq(6).text(info.buried);
    $(".word_box").text(info.word);
    //for(var i=0;i<5;i++)
    $(
        '<div><span>'+info.resident.relation+'</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>'+info.resident.name+'</span></div>'
    ).appendTo($(".resident_contain"))
    set_image();
}

function set_image(){
    fetch("https://www.aedo.co.kr/v1/obituary/image?imgname="+info.imgName,{
        method:"get", 
        headers: {
            "Content-Type": "multipart/form-data",
            'Accesstoken':sessionStorage.getItem('Accesstoken'),
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