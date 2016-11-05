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
		pos    : { x :  0, y :  160 },
		travel : { w : 3, h :  3 },
		period : 20
	},
	
	ground : {
		pos    : { x :    0, y : -70 },
		size   : { w : 1150, h : 150 }
	},
	
	ramps : [
		{
			pos    : { x :   0, y :  25 },
			size   : { w :  80, h :   3 },
			travel : 50,
			period : 10
		},
		
		{
			pos    : { x :   0, y :  45 },
			size   : { w :  60, h :   3 },
			travel : 40,
			period : 8
		},
		
		{
			pos    : { x :   0, y :  65 },
			size   : { w :  40, h :   3 },
			travel : 30,
			period : 6
		},
		
		{
			pos    : { x :   0, y :  85 },
			size   : { w :  20, h :   3 },
			travel : 20,
			period : 4
		},
		{
			pos    : { x :   0, y :  105 },
			size   : { w :  10, h :   3 },
			travel : 10,
			period : 2
		},
		{
			pos    : { x :   0, y :  125 },
			size   : { w :  5, h :   3 },
			travel : 5,
			period : 1
		}
		
	],
	
	aliens : [
		{
			pos    : { x : 0, y : 10 }
		}
	]
	
});