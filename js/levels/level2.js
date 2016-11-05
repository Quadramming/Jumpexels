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
		pos    : { x :  50, y : 70 },
		travel : { w :  3, h :  3 },
		period : 20
	},
	
	ground : {
		pos    : { x :    0, y : -70 },
		size   : { w : 1150, h : 150 }
	},
	
	ramps : [
		{
			pos    : { x :  -25, y :  25 },
			size   : { w :  40, h :   3 },
			travel : 25,
			period : 5
		}
	],
	
	aliens : [
		{
			pos    : { x : 0, y : 10 }
		}
	]
	
});
