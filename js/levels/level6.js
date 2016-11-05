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
		pos    : { x :  0, y :  100 },
		travel : { w : 3, h :  3 },
		period : 20
	},
	
	ground : {
		pos    : { x :    0, y : -70 },
		size   : { w : 1150, h : 150 }
	},
	
	ramps : [
		{
			pos    : { x :   30, y :  40 },
			size   : { w :  3, h :  30 },
			travel : 15,
			period : 1
		},
		
		{
			pos    : { x :  -40, y :  20 },
			size   : { w :  10, h :   3 },
			travel : 0,
			period : 1
		},
		
		{
			pos    : { x :  -40, y :  40 },
			size   : { w :  10, h :   3 },
			travel : 30,
			period : 3
		},
		
		{
			pos    : { x :  0, y :  60 },
			size   : { w :  30, h :   3 },
			travel : 30,
			period : 5
		}	

	],
	
	aliens : [
		{
			pos    : { x : 30, y : 10 }
		}
	]
	
});