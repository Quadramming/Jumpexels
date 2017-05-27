game.levels['doubleTrouble'] = {
	
	backGround : {
		img : 'img/backgrounds/castle.png'
	},
	
	camera : {
		type   : 'fixed',
		lookAt : { x :  0,   y :  200 },
		size   : { w : 450,  h : 600 }
	},
	
	escapeShip : {
		size   : { w : 150,  h :  150 },
		pos    : { x : 0,   y : 400 },
		travel : { w : 40,  h :  10 },
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
			pos    : { x :   0, y :  100 },
			size   : { w :  100, h :   15 },
			travel : 50,
			period : 2
		}, {
			pos    : { x :   0, y :  200 },
			size   : { w :  30, h :   15 },
			travel : 40,
			period : 1
	}],
	
	aliens : [
		{ pos : { x : 0,    y : 60 } }
	]
	
};
