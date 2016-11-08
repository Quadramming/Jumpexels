var QQ = QQ || {};

QQ.level = {
	
	backGround : {
		img : './img/backgrounds/tmp.png'
	},
	
	camera : {
		type   : 'fixed',
		lookAt : { x :  0, y :  8 },
		size   : { w : 15, h : 20 }
	},
	
	escapeShip : {
		pos    : { x : 0, y : 8 },
		travel : { w : 4, h :  1 },
		period : 20
	},
	
	ground : {
		pos    : { x :  0, y : 0 },
		size   : { w : 15, h : 15 }
	},
	
	
	ramps : [
		{
			pos    : { x :   0, y :  2.5 },
			size   : { w :  2, h :   0.3 },
			travel : 5,
			period : 10
		},
		
		{
			pos    : { x :   0, y :  4.5 },
			size   : { w :  3, h :   0.3 },
			travel : 4,
			period : 8
		},
		
		{
			pos    : { x :   0, y :  6.5 },
			size   : { w :  4, h :   0.3 },
			travel : 3,
			period : 6
		},
		
		{
			pos    : { x :   0, y :  8.5 },
			size   : { w :  2, h :  0.3 },
			travel : 2,
			period : 4
		},
		{
			pos    : { x :   0, y :  10.5 },
			size   : { w :  1, h :   0.3 },
			travel : 1,
			period : 2
		},
		{
			pos    : { x :   0, y :  12.5 },
			size   : { w :  0.5, h :   0.3 },
			travel : 0.5,
			period : 1
		}
		
	],
	
	aliens : [
		{ pos : { x : 0, y : 0 } },
		{ pos : { x : 1.5, y : 0 } },
		{ pos : { x : -1.5, y : 0 } },
		{ pos : { x : 4.5, y : 0 } },
		{ pos : { x : -4.5, y : 0 } },
	]
	
};
