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
			size   : { w :  4, h :   0.3 },
			travel : 50,
			period : 5
		}
	],
	
	aliens : [
		{
			pos    : { x : 0, y : 0 }
		}
	]
	
};
