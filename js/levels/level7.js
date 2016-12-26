
QQ.levels[7] = {
	
	backGround : {
		img : './img/backgrounds/tmp.png'
	},
	
	camera : {
		type   : 'fixed',
		lookAt : { x :  0,   y : 420 },
		size   : { w : 450*1.6,  h : 600*1.6 }
	},
	
	escapeShip : {
		size   : { w : 150, h :  150 },
		pos    : { x : 0,   y :  850 },
		travel : { w : 10,  h :  3 },
		period : 5
	},
	
	grounds : [{
			pos    : { x :  0,  y : 0 },
			size   : { w : 800, h : 100 }
		}, {
			pos    : { x : 450,  y : 500 },
			size   : { w : 100, h : 600 }
		}, {
			pos    : { x : -450,  y : 500 },
			size   : { w : 100, h : 600 }
	}],
	
	ramps : [
		{
			pos    : { x :   0, y :  100 },
			size   : { w :  220, h :   15 },
			travel : 150,
			period : 8
		},
		
		{
			pos    : { x :   0, y :  210 },
			size   : { w :  180, h :   15 },
			travel : 100,
			period : 7
		},
		
		{
			pos    : { x :   0, y :  320 },
			size   : { w :  140, h :   15 },
			travel : 80,
			period : 6
		},
		
		{
			pos    : { x :   0, y :  430 },
			size   : { w :  100, h :   15 },
			travel : 60,
			period : 4
		},
		{
			pos    : { x :   0, y :  540 },
			size   : { w :  60, h :   15 },
			travel : 40,
			period : 2
		},
		{
			pos    : { x :   0, y :  650 },
			size   : { w :  20, h :   15 },
			travel : 20,
			period : 1
		}
		
	],
	
	aliens : [
		{ pos : { x : 0,    y : 60 } }
	]
	
};
