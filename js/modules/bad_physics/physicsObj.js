//================================================================
// Physics object
//================================================================
function Physics() {
	this.objects = [];
};

//================================================================
// Static constants
//================================================================
Physics.G       = 120;
Physics.mistake = 0.01;

//================================================================
// Static methods
//================================================================

Physics.isZero = function(v, mistake) {
	if ( mistake === undefined ) {
		mistake = Physics.mistake;
	}
	return -mistake < v && v < mistake;
};

Physics.toBound = function(obj) {
	if ( 'pGetBound' in obj) {
		obj = obj.pGetBound();
	}
	if ( typeof obj === 'object'  ) {
		if ( obj.name === 'pBound' ) {
			return obj;
		}
	}
	alert('toBound() problem with' + obj);
};

Physics.isBoundHit = function(bound, vertex) {
	if ( bound.type === 'rect' ) {
		var isHitX = 
			bound.vertexs[0].x < vertex.x && 
			bound.vertexs[2].x > vertex.x  ;
		var isHitY = 
			bound.vertexs[0].y < vertex.y && 
			bound.vertexs[2].y > vertex.y  ;
		return isHitX && isHitY;
	}
	alert('Physics.isHit: bound of undefined type');
	return false;
};

Physics.distance = function(A, B) {
	if ( typeof A === 'object' && typeof B === 'object' ) {
		var dX = A.x - B.x;
		var dY = A.y - B.y;
		return sqrt(dX*dX + dY*dY);
	}
	if ( typeof A === 'number' && typeof B === 'number' ) {
		return abs(A-B);
	}
	alert('distance() error. Bad arguments.');
};

Physics.isPointsClose = function(vertexA, vertexB) {
	return Physics.distance(vertexA, vertexB) < Physics.mistake;
};	

Physics.checkCollision = function(A, B) {
	if ( A.pGetType() === 'ghost' || B.pGetType() === 'ghost' ) {
		return false;
	}
	return Physics.checkBoundCollision(A.pGetBound(), B.pGetBound());
};

Physics.checkBoundCollision = function(A, B) {

	function checkDist(first, second) {
		var dist = Physics.distance(first.center, second.center);
		return dist <= first.radius + second.radius;
	}

	function checkVertexs(first, second) {
		var vertexs = first.vertexs;
		for ( var i in vertexs ) {
			if ( Physics.isBoundHit(second, vertexs[i]) ) {
				return true;
			}
		}
		return false;
	}

	function checkCenter(first, second) {
		return Physics.isBoundHit(second, first.center);
	}
	
	var checkCenter  = checkCenter(A, B)  || checkCenter(B, A);
	var checkVertexs = checkVertexs(A, B) || checkVertexs(B, A);

	return checkDist(A, B) && (checkCenter || checkVertexs);
};

Physics.isStandOn = function(obj, ground)  {
	if ( obj.pGetVelY() > 0 ) {
		return false; // Взлетающие объекты не стоят
	}
	var A = obj.pGetBound();
	var B = ground.pGetBound();
	if ( A.type === 'rect' && B.type === 'rect' ) {
		var minDist = A.width/2 + B.width/2;
		if ( Physics.distance(A.center.x, B.center.x) < minDist - Physics.mistake ) {
			var yDistance = A.center.y - B.center.y;
			var minDist   = A.height/2 + B.height/2;
			if ( yDistance > 0 && yDistance < minDist + Physics.mistake ) {
				return true;
			}
		}
	} else {
		alert('isStandOn() problem. No such type.');
	}
	return false;
};

Physics.isSameVelXDirection = function(A, B) {
	if ( A.pGetVelX() >= 0 && B.pGetVelX() >= 0 ) return true;
	if ( A.pGetVelX() <= 0 && B.pGetVelX() <= 0 ) return true;
	return false;
};

Physics.fixCollision = function(first, second) {
	if ( first.pGetType() === 'ghost' || second.pGetType() === 'ghost' ) {
		return false;
	}

	function fix(A, B) {
		if ( A.pGetType() === 'free' && B.pGetType() === 'static' ) {
			function isSmallest(x, a, b, c) { return x < a && x < b && x < c; }
			
			var boundA         = A.pGetBound();
			var boundB         = B.pGetBound();
			var minDistY       = boundA.height/2 + boundB.height/2;
			var minDistX       = boundA.width/2  + boundB.width/2;
			var aMBy1          = Physics.distance( boundB.center.y - minDistY, boundA.center.y );
			var aMBy2          = Physics.distance( boundB.center.y + minDistY, boundA.center.y );
			var aMBx1          = Physics.distance( boundB.center.x - minDistX, boundA.center.x );
			var aMBx2          = Physics.distance( boundB.center.x + minDistX, boundA.center.x );
			var BMoveDirection = getSign(B.pGetVelX());
			
			if ( isSmallest(aMBy1, aMBy2, aMBx1, aMBx2) ) {
				A.pSubY(aMBy1);
				if ( A.pGetVelY() > 0 ) {
					A.pSetVelY(0);
					A.pSetVelX(0);
				}
			} else if ( isSmallest(aMBy2, aMBy1, aMBx1, aMBx2) ) {
				A.pAddY(aMBy2);
			} else if ( isSmallest(aMBx1, aMBy1, aMBy2, aMBx2) ) {
				A.pSubX(aMBx1);
				if ( BMoveDirection === -1 || Physics.isSameVelXDirection(A, B) ) {
					if ( B.pGetVelX() < A.pGetVelX() ) {
						A.pSetVelX(B.pGetVelX());
					}
				}
			} else if ( isSmallest(aMBx2, aMBy1, aMBy2, aMBx1) ) {
				A.pAddX(aMBx2);
				if ( BMoveDirection === 1 || Physics.isSameVelXDirection(A, B) ) {
					if ( B.pGetVelX() > A.pGetVelX() ) {
						A.pSetVelX(B.pGetVelX());
					}
				}
			}
		}
	}

	fix(first, second);
	fix(second, first);
};

//================================================================
// Methods
//================================================================

Physics.prototype.addObject = function(obj) {
	this.objects.push(obj);
};

Physics.prototype.deleteObject = function(obj) {
	deleteFrom(this.objects, obj);
};

Physics.prototype.process = function(delta) {
	this.fixCollisions();
	
	for ( var i in this.objects ) {
		var obj = this.objects[i];
		
		if ( obj.pGetType() === 'static' ) { }
		if ( obj.pGetType() === 'ghost' )  { }
		if ( obj.pGetType() === 'free' ) {
			if ( ! this.isStand(obj) ) {
				obj.pSubVelY( Physics.G * delta );
			} else {
				obj.pSetVelY(0);
			}
		}
	}
};

Physics.prototype.getGround = function(obj) {
	if ( obj.pGetVelY() > 0 ) {
		return false;
	}
	for ( var i in this.objects ) {
		var ground = this.objects[i];
		if ( ground.pGetType() === 'static' ) {
			if ( Physics.isStandOn(obj, ground) ) {
				return ground;
			}
		}
	}
	return false;
};

Physics.prototype.isStand = function(obj)  {
	return this.getGround(obj) ? true : false;
};

Physics.prototype.fixCollisions = function() {
	if ( this.objects.length > 1 ) {
		for ( var i = 0; i < this.objects.length-1; ++i ) {
			for ( var j = i+1; j < this.objects.length; ++j ) {
				if ( Physics.checkCollision(this.objects[i], this.objects[j]) ) {
					Physics.fixCollision(this.objects[i], this.objects[j]);
				}
			}
		}
	}
};
