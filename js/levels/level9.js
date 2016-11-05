seizure.loadLevel({
	
	backGround : {
		img : "./img/jump/bg.jpg"
	},
	
	camera : {
		type   : "fixed",
		lookAt : { x :   0, y :  80 },
		size   : { w : 150, h : 200 }
	},
	
	escapeShip : {
		pos    : { x :  0, y :  130 },
		travel : { w : 30, h :  3 },
		period : 20
	},
	
	ground : {
		pos    : { x :    0, y : -70 },
		size   : { w : 1150, h : 150 }
	},
	
	ramps : [
		{
			pos    : { x :   50, y :  20 },
			size   : { w :  85, h :   3 },
			travel : 50,
			period : 5
		},
		
		{
			pos    : { x :   -50, y :  20 },
			size   : { w :  85, h :   3 },
			travel : 50,
			period : 5
		},
		
		{
			pos    : { x :   50, y :  40 },
			size   : { w :  85, h :   3 },
			travel : 50,
			period : 3
		},
		
		{
			pos    : { x :   -50, y :  40 },
			size   : { w :  85, h :   3 },
			travel : 50,
			period : 3
		},
		
		{
			pos    : { x :   50, y :  60 },
			size   : { w :  85, h :   3 },
			travel : 50,
			period : 7
		},
		
		{
			pos    : { x :   -50, y :  60 },
			size   : { w :  85, h :   3 },
			travel : 50,
			period : 7
		},
		
		{
			pos    : { x :   50, y :  80 },
			size   : { w :  85, h :   3 },
			travel : 25,
			period : 7
		},
		
		{
			pos    : { x :   -50, y :  80 },
			size   : { w :  85, h :   3 },
			travel : 25,
			period : 7
		}
	],
	
	aliens : [
		{
			pos    : { x : 0, y : 10 }
		}
	]
	
});