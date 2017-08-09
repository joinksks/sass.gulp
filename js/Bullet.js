

////子弹构造函数
//function Bullet(){
//	//属性ele节点
//	this.ele = document.createElement("div");
//	//标记每颗子弹
//	this.id = parseInt(Math.random()*100000);
//	
//	//方法init重置属性
//	this.init = function(){
//		//添加标记子弹到所有子弹
//		gameEngine.allBullet[this.id] = this;
//		//console.log(gameEngine.allBullet); 
//		
//		gameEngine.ele.appendChild(this.ele);
//		this.ele.className = "bullet";
//		this.ele.style.left = myPlane.ele.offsetLeft + myPlane.ele.offsetWidth/2 - this.ele.offsetWidth/2 + "px";
//		this.ele.style.top = myPlane.ele.offsetTop - this.ele.offsetHeight + "px";
//		return this; 
//	}
//	//方法move子弹运动
//	this.move = function(){
//		var that = this;
//		//发射子弹		
//		this.timer = setInterval(function(){
//			var y = that.ele.offsetTop - 10;
//			if(y<-18){
//				gameEngine.ele.removeChild(that.ele);  //子弹超出屏幕移除
//				clearInterval(that.timer);              //关闭当前定时器
//				
//				delete gameEngine.allBullet[that.id];   //删除超出屏幕的标记子弹
//			}else{
//				that.ele.style.top = y + "px";
//			}
//		},50)
//	}
//	
//	//方法子弹爆炸boom
//	this.boom = function(){
//		clearInterval(this.timer);  //子弹爆炸时停止移动
//		
//		this.ele.className = "bulletboom";
//		var that = this;
//		var index = 1;
//		var timer = setInterval(function(){
//			if(index>1){
//				gameEngine.ele.removeChild(that.ele);
//				clearInterval(timer); 
//			}else{
//				that.ele.style.background = "url(img/images/die" + (++index) +".png)" ;
//			}
//		},100)
//	}
//	
//}

class A{
	constructor(){
		//属性ele节点
		this.ele = document.createElement("div");
		//标记每颗子弹
		this.id = parseInt(Math.random()*100000);
	}
}

 
//子弹构造函数
class Bullet extends A{

	//方法init重置属性
	init(){
		//添加标记子弹到所有子弹
		gameEngine.allBullet[this.id] = this;
		//console.log(gameEngine.allBullet); 
		
		gameEngine.ele.appendChild(this.ele);
		this.ele.className = "bullet";
		this.ele.style.left = myPlane.ele.offsetLeft + myPlane.ele.offsetWidth/2 - this.ele.offsetWidth/2 + "px";
		this.ele.style.top = myPlane.ele.offsetTop - this.ele.offsetHeight + "px";
		return this; 
	}
	//方法move子弹运动
	move(){
		const that = this;
		//发射子弹		
		this.timer = setInterval(function(){
			let y = that.ele.offsetTop - 10;
			if(y<-18){
				gameEngine.ele.removeChild(that.ele);  //子弹超出屏幕移除
				clearInterval(that.timer);              //关闭当前定时器
				
				delete gameEngine.allBullet[that.id];   //删除超出屏幕的标记子弹
			}else{
				that.ele.style.top = y + "px";
			}
		},50)
	}
	
	//方法子弹爆炸boom
	boom(){
		clearInterval(this.timer);  //子弹爆炸时停止移动
		
		this.ele.className = "bulletboom";

		let [that,index] = [this,1]; 
		let timer = setInterval(()=>{
			if(index>1){
				gameEngine.ele.removeChild(that.ele);
				clearInterval(timer); 
			}else{
				that.ele.style.background = "url(img/images/die" + (++index) +".png)" ;
			}
		},100) 
	}
	
}


