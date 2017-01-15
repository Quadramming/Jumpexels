QQ.levels['bunny'] = {
	
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
		pos    : { x : 150,   y : 280 },
		travel : { w : 10,  h :  40 },
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
			pos    : { x :   -200, y :  150 },
			size   : { w :  15, h :   15 },
			travel : 0,
			period : 1
		}],
	
	aliens : [
		{ pos : { x : -180,    y : 60 } }
	]
	
};
