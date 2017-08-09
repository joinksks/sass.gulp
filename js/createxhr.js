

//创建xhr对象
//function createXhr(){
//	if(window.XMLHttpRequest){
//		return  new XMLHttpRequest();
//	}else{
//		return new ActiveXObject("Microsoft.XMLHTTPRequest");
//	}
//}

let createXhr = () => {if(window.XMLHttpRequest){
		return  new XMLHttpRequest();
	}else{
		return new ActiveXObject("Microsoft.XMLHTTPRequest");
	}}

//封装Ajax
//	//type:请求方式
//	//url : 接口
//	//data: 参数
//	//async: 是否异步
//	//success: 请求成功后的回调函数
//	//error: 请求失败后的回调函数
//	ajax({
//		//type: "get",
//		url: "http://60.205.181.47/myPHPCode2/checkname.php",
//		data: {regname:"zhangsan1q", pwd:"123455"},
//		//async: true,
//		
//		success: function(data){
//			//console.log(data);
//			var obj = JSON.parse(data);
//			console.log(obj.msg);
//		}, 
//		error: function(){
//			console.log("请求失败");
//		}
//	})
function ajax(obj){
	obj.type = obj.type || "get";  //默认为get
	obj.async = obj.async==undefined ? true:obj.async; //默认异步
	
	//1 创建xhr对象
	var xhr = createXhr();
	//2 准备工作 open()
	var paramStr = getParamStr(obj.data);  //调用getParamStr函数
	//console.log(paramStr);  // "regname=zhangsan1q&pwd=123455"
	if(obj.type.toLowerCase() == "get"){
		obj.url += paramStr ? ("?" + paramStr):"";
	}
	xhr.open(obj.type,obj.url,obj.async);
	//3 发送请求
	if(obj.type == "get"){
		xhr.send(null);
	}
	else{
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(paramStr);
	}
	//4 接受数据
	if(obj.async){   //异步
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				callback();  //调用callback函数
			}
		}
	}else{  //同步 
		callback();
	}
	
	//回调函数
	function callback(){
		if(xhr.status == 200){  //请求成功
			if(obj.success){
				obj.success(xhr.responseText);  //回调
			}
		}else{   //请求失败
			if(obj.error){
				obj.Error();  //回调
			}
		}
	}
}



//转换参数的函数 ：{regname:"zhangsan", pwd:"123455"} =>  "regname=zhangsan&pwd=123455"
function getParamStr(data){
	var arr = [];
	//遍历对象
	for(var key in data){
		var str = key + "=" + data[key];  //注意不能用点表示法 因为key是变量
		arr.push(str);
	}
	return arr.join("&");
}



