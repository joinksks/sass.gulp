"use strict";function EnemyPlane(e){this.ele=document.createElement("div"),this.id=parseInt(1e6*Math.random()),this.speed=10,this.Hp=1,this.score=10,this.init=function(){switch(gameEngine.ele.appendChild(this.ele),gameEngine.allEnemyplane[this.id]=this,e){case this.Enemy_type_large:this.ele.className="largePlane",this.speed=this.Enemy_speed_large,this.Hp=this.Enemy_Hp_large,this.dieImgs=["img/images/plane3_die1.png","img/images/plane3_die2.png","img/images/plane3_die3.png","img/images/plane3_die4.png","img/images/plane3_die5.png","img/images/plane3_die6.png"],this.score=50;break;case this.Enemy_type_middle:this.ele.className="middlePlane",this.speed=this.Enemy_speed_middle,this.Hp=this.Enemy_Hp_middle,this.dieImgs=["img/images/plane2_die1.png","img/images/plane2_die2.png","img/images/plane2_die3.png","img/images/plane2_die4.png"],this.score=20;break;case this.Enemy_type_small:this.ele.className="smallPlane",this.speed=this.Enemy_speed_small,this.Hp=this.Enemy_Hp_small,this.dieImgs=["img/images/plane1_die1.png","img/images/plane1_die2.png","img/images/plane1_die3.png"],this.score=5;break;default:console.log("error")}return this.ele.style.left=parseInt(Math.random()*(gameEngine.ele.offsetWidth-this.ele.offsetWidth))+"px",this.ele.style.top=-this.ele.offsetHeight+"px",this},this.move=function(){var e=this;this.timer=setInterval(function(){var i=e.ele.offsetTop+e.speed;i>gameEngine.ele.offsetHeight?(clearInterval(e.timer),gameEngine.ele.removeChild(e.ele),delete gameEngine.allEnemyplane[e.id]):e.ele.style.top=i+"px"},50)},this.hurt=function(){0==--this.Hp&&(this.boom(),gameEngine.totalScore+=this.score,console.log(gameEngine.totalScore),document.getElementById("scro").innerHTML=gameEngine.totalScore)},this.boom=function(){clearInterval(this.timer);var e=this,i=0,s=setInterval(function(){i>e.dieImgs.length-1?(clearInterval(s),gameEngine.ele.removeChild(e.ele),delete gameEngine.allEnemyplane[e.id]):e.ele.style.background="url("+e.dieImgs[i++]+")"},100)}}EnemyPlane.prototype={Enemy_type_large:3,Enemy_type_middle:2,Enemy_type_small:1,Enemy_speed_large:3,Enemy_speed_middle:5,Enemy_speed_small:7,Enemy_Hp_large:7,Enemy_Hp_middle:4,Enemy_Hp_small:1};