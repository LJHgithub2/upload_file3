var list_count=0;
var query="";
window.onload = function () { 
    fetch("https://www.aedo.co.kr/v1/user",{
        method:"get", 
        headers: {
            "Content-Type": "application/json",
            'Accesstoken':sessionStorage.getItem('Accesstoken'),
        },
    })
    .then((res)=>res.json())
    .then((data) =>{
        if(Math.floor(data.status/100)==2){
            $("#login_btn").hide();
            $("#user_info").text(data.user.phone+"님 환영합니다!");
            login_check=true;
        }
        else{
            $("#logout_btn").hide();
        }
    });
    
	fetch("https://www.aedo.co.kr/v1/obituary?name=",{
		method:"get", 
		headers: {
			"Content-Type": "application/json",
			'Accesstoken':sessionStorage.getItem('Accesstoken'),
		},
	})
	.then((res)=>res.json())  
	.then((data) =>{
        list_lookup(data.result);
	});
    
}

function view_detail(obj){
    var place=escape($(obj).parent().parent().parent().children().first().children().first().text());
    var deceased = escape($(obj).parent().parent().parent().children().first().children().last().text().replace(/ /g, ''));
    
	location.href="detail_view.html?user_id="+$(obj).parent().prev().text()+"&place="+place+"&deceased_name="+deceased;

    var decode = unescape(deceased);
    console.log("디코딩 ->",decode);

    var substring = decode.substring(0,3);
    console.log("디코딩 서브",substring)
}

function search(){
    $(".item").detach();
    list_count=0;
    var text=$("#search_text").val();
    if(text){
        query=text;
    }
    else{
        query="";
    }
    var address="https://www.aedo.co.kr/v1/obituary?name="+query;
	fetch(address,{
		method:"get", 
		headers: {
			"Content-Type": "application/json",
			'Accesstoken':sessionStorage.getItem('Accesstoken'),
		},
	})
	.then((res)=>res.json())
	.then((data) =>{
        list_lookup(data.result);
	});
}
function add_list(){
    var address="https://www.aedo.co.kr/v1/obituary?name="+query;
	fetch(address,{
		method:"get", 
		headers: {
			"Content-Type": "application/json",
			'Accesstoken':sessionStorage.getItem('Accesstoken'),
		},
	})
	.then((res)=>res.json())
	.then((data) =>{
        list_lookup(data.result);
	});
}
function list_lookup(array){
    var add_num=10;
    var deceased_name;
    if(array.length>list_count){
        if(array.length>=list_count+add_num){     
            for(var i=list_count; i<list_count+add_num;i++){
                deceased_name=array[i].deceased.name; 
                var clone=$(".item_sample").clone().attr("class","item box");
                clone.children().children().children().first().text(array[i].place.name);
                if (deceased_name.length>6) deceased_name=deceased_name.substr(0,7);
                clone.children().children().children().eq(2).text(deceased_name+" ("+array[i].deceased.age+")");
                clone.children().children().eq(1).children().first().text(array[i]._id);
                $("#main_container").append(clone);
            } 
            list_count=list_count+add_num;
        }
        else{
            for(var i=list_count; i<array.length;i++){
                deceased_name=array[i].deceased.name; 
                var clone=$(".item_sample").clone().attr("class","item");
                clone.children().children().children().first().text(array[i].place.name);
                if (deceased_name.length>6) deceased_name=deceased_name.substr(0,7);
                clone.children().children().children().eq(2).text(deceased_name+" ("+array[i].deceased.age+")");
                clone.children().children().eq(1).children().first().text(array[i]._id);
                $("#main_container").append(clone);
            }
            
            list_count=array.length;
        }
    }
    else{
        return;
    }
}