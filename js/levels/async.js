QQ.levels['async'] = {
	
	backGround : {
		img : 'img/backgrounds/castle.png'
	},
	
	camera : {
		type   : 'fixed',
		lookAt : { x :  0,   y :  200 },
		size   : { w : 450,  h : 600 }
	},
	
	escapeShip : {
		size   : { w : 100,  h :  100 },
		pos    : { x : -100,   y : 400 },
		travel : { w : 5,  h :  5 },
		period : 10
	},
	
	grounds : [{
			pos    : { x :  0,  y : 0 },
			size   : { w : 500, h : 100 }
		}, {
			pos    : { x : 300,  y : 500 },
			size   : { w : 100, h : 600 }
		}, {
			pos    : { x : -300,  y : 500 },
			size   : { w : 100, h : 600 }
	}],
	
	
	ramps : [{
			pos    : { x :   -100, y :  100 },
			size   : { w :  100, h :   15 },
			travel : 80,
			time   : 2,
			period : 4
		},{
			pos    : { x :   100, y :  220 },
			size   : { w :  100, h :   15 },
			travel : 60,
			time   : 2.5,
			period : 3
		}],
	
	aliens : [
		{ pos : { x : 0,    y : 60 } }
	]
	
};
