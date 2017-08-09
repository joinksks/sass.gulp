

//创建敌机构造函数
function EnemyPlane(type){
	//属性ele
	this.ele = document.createElement("div");
	//标记敌机allEnemyplane
	this.id = parseInt(Math.random()*1000000);
	
	this.speed = 10;  //速度
	this.Hp = 1;   //血量
	this.score = 10;
	//方法init 重置属性
	this.init = function(){
		gameEngine.ele.appendChild(this.ele);
		//添加标记敌机到所有敌机对象
		gameEngine.allEnemyplane[this.id] = this;
		//console.log(gameEngine.allEnemyplane); 
		
		switch(type){
			case this.Enemy_type_large:
				this.ele.className = "largePlane";
				this.speed = this.Enemy_speed_large;
				this.Hp = this.Enemy_Hp_large;
				this.dieImgs = ["img/images/plane3_die1.png", "img/images/plane3_die2.png", "img/images/plane3_die3.png", "img/images/plane3_die4.png", "img/images/plane3_die5.png", "img/images/plane3_die6.png"];
				this.score = 50;
				break;
			case this.Enemy_type_middle:
				this.ele.className = "middlePlane";
				this.speed = this.Enemy_speed_middle;
				this.Hp = this.Enemy_Hp_middle;
				this.dieImgs = ["img/images/plane2_die1.png", "img/images/plane2_die2.png", "img/images/plane2_die3.png", "img/images/plane2_die4.png"];
				this.score = 20;
				break;
			case this.Enemy_type_small:
				this.ele.className = "smallPlane";
				this.speed = this.Enemy_speed_small;
				this.Hp = this.Enemy_Hp_small;
				this.dieImgs = ["img/images/plane1_die1.png", "img/images/plane1_die2.png", "img/images/plane1_die3.png"];
				this.score = 5;  
				break;
			default :
				console.log("error");
		}
		this.ele.style.left = parseInt(Math.random()*(gameEngine.ele.offsetWidth - this.ele.offsetWidth)) + "px";
		this.ele.style.top = -this.ele.offsetHeight + "px";
		return this;
	}
	
	//方法移动
	this.move = function(){
		var that = this;
		this.timer = setInterval(function(){
			var y = that.ele.offsetTop + that.speed; 
			if(y>gameEngine.ele.offsetHeight){ 
				clearInterval(that.timer);
				gameEngine.ele.removeChild(that.ele);
				
				delete gameEngine.allEnemyplane[that.id];  //删除移动到屏幕外的标记敌机
			}else{
				that.ele.style.top = y + "px";
			}
			
		},50)
	}
	//方法掉血
	this.hurt = function(){
		this.Hp--;
		if(this.Hp == 0){
			this.boom();
			gameEngine.totalScore += this.score;
			console.log(gameEngine.totalScore);
			var oDiv = document.getElementById("scro");
			oDiv.innerHTML = gameEngine.totalScore;  
		}
	}
	
	//方法爆炸boom
	this.boom = function(){
		clearInterval(this.timer); //爆炸时停止移动
		
		var that = this;
		var index = 0;
		var timer = setInterval(function(){
			if(index>that.dieImgs.length-1){
				clearInterval(timer); 
				gameEngine.ele.removeChild(that.ele);
				
				delete gameEngine.allEnemyplane[that.id];
			}else{ 
				that.ele.style.background = "url("+ that.dieImgs[index++] + ")";
			} 
		},100)
	}
}

//原型对象 里面全是属性   机型属性
EnemyPlane.prototype = {
	//机型
	Enemy_type_large: 3,
	Enemy_type_middle: 2,
	Enemy_type_small: 1,
	
	//速度
	Enemy_speed_large: 3,
	Enemy_speed_middle: 5,
	Enemy_speed_small: 7,
	
	//血量
	Enemy_Hp_large: 7,
	Enemy_Hp_middle: 4,
	Enemy_Hp_small: 1 
}




