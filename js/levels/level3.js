QQ.levels[3] = {
	
	backGround : {
		img : './img/backgrounds/tmp.png'
	},
	
	camera : {
		type   : 'fixed',
		lookAt : { x :  0,   y :  200 },
		size   : { w : 450,  h : 600 }
	},
	
	escapeShip : {
		pos    : { x : 0,   y : 200 },
		travel : { w : 40,  h :  10 },
		period : 20
	},
	
	grounds : [{
			pos    : { x :  0,  y : 0 },
			size   : { w : 450, h : 450 }
		}, {
			pos    : { x : 450,  y : 500 },
			size   : { w : 500, h : 500 }
		}, {
			pos    : { x : -450,  y : 500 },
			size   : { w : 500, h : 500 }
	}],
	
	
	ramps : [],
	
	aliens : [
		{ pos : { x : 0,    y : 60 } }
	]
	
};
