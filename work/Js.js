function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}
var box = document.getElementById('box');
var oNavlist = document.getElementById('nav').children;
var slider = document.getElementById('slider');
var left = document.getElementById('left');
var right = document.getElementById('right');
var doc = document.getElementById('doc');
var index = 1;
var isMoving = false;
//文字滑动
document.body.onload= function(){
	var bi = setInterval(function(){
		var now = parseInt(getStyle(doc,"right"));
		if(now == 900){
			doc.style.right = -600+"px";
			now = 0;
		}
		else{
			doc.style.right = now +1 +"px";
		}
	},10)
}
//前进
function next(){
	if(!isMoving){
		isMoving = true;
		index++;
		nacvhange();
		animate(slider,{left:-1200*index},function(){
			if(index === 6){
			slider.style.left == "-1200px";
			index =1;
			}
			isMoving = false;
		});
	}	
} 
//后退
function prev(){
	if(isMoving){
		return;
	}
	isMoving = true;
	index--;
	nacvhange();
	animate(slider,{left:-1200*index},function(){
		if(index === 0){
			slider.style.left == "-6000px";
			index =5;
		}
		isMoving = false;	
	});
}
var timer =setInterval(next, 3000);
// 鼠标划入清定时器
box.onmouseover = function(){
	animate(left,{opacity:50});
	animate(right,{opacity:50});
	clearInterval(timer);
}
// 鼠标划出开定时器
box.onmouseout = function(){
	animate(left,{opacity:0});
	animate(right,{opacity:0});
	timer = setInterval(next,3000);
}
right.onclick = next;
left.onclick = prev;
for(var i = 0 ;i<oNavlist.length;i++){
	oNavlist[i].idx = i;
	oNavlist[i].onclick = function(){
		index = this.idx +1;
		nacvhange();
		animate(slider,{left:-1200*index})
	}
}
//小按钮背景色
function nacvhange(){
	for(var i = 0 ; i<oNavlist.length;i++){
		oNavlist[i].className = '';
	}
	if(index == 6){
		oNavlist[0].className = 'active';
	}else if(index == 0){
		oNavlist[4].className = 'active';
	}else{
		oNavlist[index-1].className = 'active';
	}			
}