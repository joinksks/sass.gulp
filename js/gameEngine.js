

//游戏引擎对象
var gameEngine = {
	//属性 ele
	ele:null, 
	
	allBullet:{},  //页面上所有的子弹
	allEnemyplane:{}, //页面上所有的敌机
	
	totalScore:0,  //统计总分 
	
	//初始化属性的init方法
	init:function(){
		gameEngine.ele = document.getElementById("main");
		return this;
	},
	//游戏开始
	start:function(){
		
		gameEngine.loading(function(){   //这里的函数是实参与形参callback相对
			var oMain = document.getElementById("main");
			console.log(oMain);
			var oDiv = document.createElement("div");
			oDiv.id = "scro";
			console.log(oDiv);
			oDiv.innerHTML = 0;
			oMain.appendChild(oDiv);  
			myPlane.init().move();  //创建我的飞机并可以拖拽
			myPlane.onfire();       //我的飞机发射子弹
			
			gameEngine.listeningKeybord();//监听键盘让我的飞机移动
			
			gameEngine.crateEnemyplane(); //创建敌机并向下移动
			
			gameEngine.isCrashed(); //检测碰撞 
			
			
			gameEngine.bgmove();   //背景移动

		});
	},
	//加载游戏
	loading:function(callback){
		//创建logo节点
		var logo = document.createElement("div");
		logo.className = "logo";
		gameEngine.ele.appendChild(logo);
		
		//创建load节点
		var load = document.createElement("div");
		load.className = "load";
		gameEngine.ele.appendChild(load);
		
		
		//让加载图片动起来
		var index = 0; 
		var timer = setInterval(function(){
			
			if(index<6){  //6
				
				load.style.background = "url(img/images/loading" + (index++%3+1) +".png) no-repeat"; 
			}
			else{
				clearInterval(timer);
				gameEngine.ele.removeChild(logo);
				gameEngine.ele.removeChild(load);
				
				//回调 相当于让参数函数马上执行
				callback();
			}
		},500)	
	},
	//监听键盘ListeningKeybord
	listeningKeybord: function(){
		var xSpeed = 0;
		var ySpeed = 0;
		window.onkeydown = function(e){
			e = e || event;
			
			if(e.keyCode == 37){
				xSpeed = -5;
			}
			if(e.keyCode == 38){
				ySpeed = -5;
			}
			if(e.keyCode == 39){
				xSpeed = 5;
			}
			if(e.keyCode == 40){
				ySpeed = 5;	
			}
		}
		window.onkeyup = function(){
			xSpeed = 0;
			ySpeed = 0;
		}
		setInterval(function(){   //解决我的飞机myPlane无法同时向俩个方向移动的问题 定时器一直存在，只是速度为0 只有在按下方向键时才不为0
			var x = myPlane.ele.offsetLeft + xSpeed;
			var y = myPlane.ele.offsetTop + ySpeed;
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
			myPlane.ele.style.left = x +"px";
			myPlane.ele.style.top = y +"px"; 
		},30)
	},
	
	//创建敌机
	crateEnemyplane: function(){
		//创建小飞机
		setInterval(function(){
			var flag = Math.random()>0.3?true:false;
			if(flag){
				var smallplane = new EnemyPlane(EnemyPlane.prototype.Enemy_type_small);
				smallplane.init().move();
			}
		},1000); 
		setInterval(function(){
			var flag = Math.random()>0.4?true:false;
			if(flag){
				var middleplane = new EnemyPlane(EnemyPlane.prototype.Enemy_type_middle);
				middleplane.init().move();
			}
		},3000);
		setInterval(function(){
			var flag = Math.random()>0.5?true:false;
			if(flag){
				var largeplane = new EnemyPlane(EnemyPlane.prototype.Enemy_type_large);
				largeplane.init().move();
			}
		},7000);
	},
	
	//碰撞检测
	isCrashed: function(){
		var isCrashMyPlane = false; //目的是：使定时器中我的飞机和敌机碰撞代码只执行一次
		setInterval(function(){
			//console.log("sss");
			for(var i in gameEngine.allEnemyplane){  //遍历所有敌机
				//console.log(gameEngine.allEnemyplane);
			
				for(var j in gameEngine.allBullet){ //遍历所有子弹
					//console.log(gameEngine.allBullet[j].ele);
					//console.log(gameEngine.allEnemyplane[i].ele);
					//console.log(isCrash(isCrash(gameEngine.allBullet[j].ele,gameEngine.allEnemyplane[i].ele))); 
					if(isCrash(gameEngine.allBullet[j].ele,gameEngine.allEnemyplane[i].ele)){  //子弹和敌机发生碰撞
						//console.log("发生了碰撞") ;
						gameEngine.allBullet[j].boom(); //子弹爆炸
						delete gameEngine.allBullet[j]; //将爆炸子弹从屏幕上移除
						 
						gameEngine.allEnemyplane[i].hurt();//敌机掉血 
					}else{
						//console.log("没发生碰撞");
					}

				}
				if(!isCrashMyPlane && isCrash(gameEngine.allEnemyplane[i].ele,myPlane.ele)){
					myPlane.boom(); 
					isCrashMyPlane = true; 
					//console.log("Game Over");  
					var name1 = prompt("您的总分数是:"+ gameEngine.totalScore +", 请输入您的大名");
					 
					if(name1){  //点击确定
						//ajax上传数据 
						ajax({
							type:"post",
							url:"http://60.205.181.47/myPHPCode4/uploadScore.php",
							data:{name:name1,score:gameEngine.totalScore},
							async:true,
							success: function(data){
								console.log(data);
								var data = JSON.parse(data);
								console.log(data.msg);
								//进入排行榜页面
								location.href = "html/ranking.html";
							},
							error: function(){
								console.log("error");
							}
						})
					}else{   //点击取消
						location.reload(); //重新加载 
					}
				} 
			}
		},30)
	},
	
	//背景移动
	bgmove: function(){
		var y = 0;
		setInterval(function(){
			gameEngine.ele.style.backgroundPositionY = y++ + "px";
		}, 30);
	}
	
}



