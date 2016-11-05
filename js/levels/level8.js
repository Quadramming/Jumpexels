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
		pos    : { x :  0, y :  110 },
		travel : { w : 3, h :  3 },
		period : 20
	},
	
	ground : {
		pos    : { x :    0, y : -70 },
		size   : { w : 1150, h : 150 }
	},
	
	ramps : [
		{
			pos    : { x :   50, y :  20 },
			size   : { w :  20, h :   3 },
			travel : 20,
			period : 3,
			time   : 0
		},
		
		{
			pos    : { x :  -50, y :  20 },
			size   : { w :  20, h :   3 },
			travel : 20,
			period : 3,
			time   : 1.5
		},
		
		{
			pos    : { x :  0, y :  35 },
			size   : { w :  20, h :   3 },
			travel : 0,
			period : 1,
			time   : 0
		},
		{
			pos    : { x :  0, y :  55 },
			size   : { w :  20, h :   3 },
			travel : 80,
			period : 7,
			time   : 0
		},
		
		{
			pos    : { x :  0, y :  75 },
			size   : { w :  20, h :   3 },
			travel : 80,
			period : 5,
			time   : 0
		}
		
	],
	
	aliens : [
		{
			pos    : { x : -30, y : 10 }
		},
		
		{
			pos    : { x :  30, y : 10 }
		}
	]
	
});