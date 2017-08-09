

//创建对象maPlane我的飞机
var myPlane = {
	//属性ele
	ele: null,
	//属性 子弹发射频率
	onfireHz:500,
	//方法init 初始化属性
	init: function(){
		myPlane.ele = document.createElement("div");
		myPlane.ele.className = "myplane";
		gameEngine.ele.appendChild(myPlane.ele);
		myPlane.ele.style.left = (gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth)/2 + "px";
		myPlane.ele.style.top = gameEngine.ele.offsetHeight - myPlane.ele.offsetHeight + "px";
		return this; 
	},
	//方法move
	move: function(){
		myPlane.ele.onmousedown = function(e){
			e = e || event;
			var disX = e.offsetX;
			var disY = e.offsetY; 
			document.onmousemove = function(e){
				e = e || event;
				var x = e.pageX - disX - gameEngine.ele.offsetLeft;
				var y = e.pageY - disY;
				if(x<0){
					x = 0;
				}else if(x>gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth){
					x = gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth;
				}
				if(y<0){
					y = 0;
				}else if(y>gameEngine.ele.offsetHeight - myPlane.ele.offsetHeight){
					y = gameEngine.ele.offsetHeight - myPlane.ele.offsetHeight;
				}
				myPlane.ele.style.left = x + "px";
				myPlane.ele.style.top = y + "px";
			} 
			document.onmouseup = function(){
				document.onmousemove = document.onmouseup = null;
			}
		}
	},
	//我的飞机射出子弹
	onfire: function(){
		var that = this;
		var timer = setInterval(function(){  //定时器实现连续射击
			var bullet = new Bullet();
			bullet.init().move();
		},that.onfireHz) 
	},
	boom: function(){
		clearInterval(this.timer);  //子弹爆炸时停止移动
		
		this.ele.className = "myplaneboom";

		let [that,index] = [this,1]; 
		let timer = setInterval(()=>{
			if(index>1){
				gameEngine.ele.removeChild(that.ele);
				clearInterval(timer); 
			}else{
				that.ele.style.background = "url(../img/images/me_die" + (++index) +".png)" ; 
			}
		},100)   
	}
	
}




