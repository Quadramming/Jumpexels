QQ.levels['jump'] = {
	
	backGround : {
		img : 'img/backgrounds/castle.png'
	},
	
	camera : {
		type   : 'fixed',
		lookAt : { x :  0,   y :  200 },
		size   : { w : 450,  h : 600 }
	},
	
	escapeShip : {
		size   : { w : 140,  h :  140 },
		pos    : { x : 130,   y : 300 },
		travel : { w : 0,  h :  10 },
		period : 20
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
			pos    : { x :   -80, y :  100 },
			size   : { w :  100, h :   15 },
			travel : 80,
			period : 2.5
		}],
	
	aliens : [
		{ pos : { x : -150,    y : 60 } }
	]
	
};
