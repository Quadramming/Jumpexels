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
		pos    : { x :  0, y : 100 },
		travel : { w : 40, h :  10 },
		period : 20
	},
	
	ground : {
		pos    : { x :    0, y : -70 },
		size   : { w : 1150, h : 150 }
	},
	
	ramps : [
		{
			pos    : { x :   0, y :  25 },
			size   : { w :  40, h :   3 },
			travel : 50,
			period : 5
		},
		
		{
			pos    : { x :   0, y :  45 },
			size   : { w :  40, h :   3 },
			travel : 50,
			period : 5,
			time   : 2.5
		}
	],
	
	aliens : [
		{
			pos    : { x : 0, y : 10 }
		}
	]
	
});
