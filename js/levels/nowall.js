QQ.levels['nowall'] = {
	
	backGround : {
		img : 'img/backgrounds/castle.png'
	},
	
	camera : {
		type   : 'fixed',
		lookAt : { x :  0,   y : 200 },
		size   : { w : 450,  h : 600 }
	},
	
	escapeShip : {
		size   : { w : 100,  h :  100 },
		pos    : { x : 150,   y : 430 },
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
			pos    : { x : -110,  y : 200 },
			size   : { w : 15, h : 15 }
		}, {
			pos    : { x : -300,  y : 500 },
			size   : { w : 100, h : 600 }
	}],
	
	ramps : [{
			size   : { w :  100, h :   15 },
			f: function(t) {
				const startX = 50;
				const moveX  = 50;
				const y      = 100;
				const period = 1.5;
				const x = startX + moveX * Math.sin(t/period * QQ.Math.PIx2);
				return {x, y};
			}
		}, {
			size   : { w :  75, h :   15 },
			f: function(t) {
				const startX = 10;
				const moveX  = 150;
				const y      = 315;
				const period = 5;
				const x = startX - moveX * Math.sin(t/period * QQ.Math.PIx2);
				return {x, y};
			}
	}],
	
	aliens : [
		{ pos : { x : 0,    y : 25 } }
	]
	
};
