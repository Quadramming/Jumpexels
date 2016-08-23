//================================================================
// pObj class
//================================================================

function pObj(x, y, width, height, type) {
	this.pX              = x;
	this.pY              = y;
	this.pWidth          = width;
	this.pHeight         = height;
	this.pVelX           = 0;
	this.pVelY           = 0;
	this.pType           = type;
	this.pRadius         = sqrt(width*width + height*height);
	this.pBoundType      = 'rect';
	this.pStaticFriction = 1;
	this.pKFriction      = 0.5;
}

pObj.prototype.process = function(delta, physics) {
	if ( this.pType === 'free' ) {
		this.pX += this.pVelX * delta;
		this.pY += this.pVelY * delta;
		if ( physics !== undefined ) {
			var ground = physics.getGround(this);
			if ( ground ) {
				var deltaX = ground.pGetVelX() - this.pGetVelX();
				if ( Physics.isZero(deltaX, this.pStaticFriction) ) {
					this.pAddVelX(deltaX);
				} else {
					this.pAddVelX(deltaX*this.pKFriction); // Do right
				}
			}
		}
	}
	if ( this.pType === 'static' ) {
		this.pAddX(this.pVelX * delta);
		this.pAddY(this.pVelY * delta);
	}	
};
// X methods
pObj.prototype.pAddX      = function(v) { this.pX += v;        };
pObj.prototype.pSubX      = function(v) { this.pX -= v;        };
pObj.prototype.pSetX      = function(v) { this.pX  = v;        };
pObj.prototype.pGetX      = function()  { return this.pX;      };
// Y methods
pObj.prototype.pAddY      = function(v) { this.pY += v;        };
pObj.prototype.pSubY      = function(v) { this.pY -= v;        };
pObj.prototype.pSetY      = function(v) { this.pY  = v;        };
pObj.prototype.pGetY      = function()  { return this.pY;      };
// X vel methods
pObj.prototype.pAddVelX   = function(v) { this.pVelX += v;     };
pObj.prototype.pSubVelX   = function(v) { this.pVelX -= v;     };
pObj.prototype.pSetVelX   = function(v) { this.pVelX  = v;     };
pObj.prototype.pGetVelX   = function()  { return this.pVelX;   };
// Y vel methods
pObj.prototype.pAddVelY   = function(v) { this.pVelY += v;     };
pObj.prototype.pSubVelY   = function(v) { this.pVelY -= v;     };
pObj.prototype.pSetVelY   = function(v) { this.pVelY  = v;     };
pObj.prototype.pGetVelY   = function()  { return this.pVelY;   };
// else methods
pObj.prototype.pGetType   = function()  { return this.pType;   };
pObj.prototype.pSetType   = function(v) { this.pType = v;      };
pObj.prototype.pGetHeight = function()  { return this.pHeight; };
pObj.prototype.pGetWidth  = function()  { return this.pWidth;  };
pObj.prototype.pGetRadius = function()  { return this.pRadius; };

pObj.prototype.isHit = function(vertex) {
	if ( this.pBoundType === 'rect' ) {
		var isHitX = 
			this.pX - this.pWidth/2 < vertex.x && 
			this.pX + this.pWidth/2 > vertex.x  ;
		var isHitY = 
			this.pY - this.pHeight/2 < vertex.y && 
			this.pY + this.pHeight/2 > vertex.y  ;
		return isHitX && isHitY;
	}
	alert('pObj.prototype.isHit: bound of undefined type');
	return false;
};

pObj.prototype.pStop      = function()  { 
	this.pSetVelX(0);
	this.pSetVelY(0);
};

pObj.prototype.pGetBound  = function()  {
	return {
		name:    'pBound',
		type:    this.pBoundType,
		width:   this.pWidth,
		height:  this.pHeight,
		center:  { x: this.pX, y: this.pY },
		radius:  this.pRadius,
		vertexs: [ // Strong order
			{ x: this.pX - this.pWidth/2, y: this.pY - this.pHeight/2 }, // LEFT BOTTOM
			{ x: this.pX - this.pWidth/2, y: this.pY + this.pHeight/2 }, // LEFT TOP
			{ x: this.pX + this.pWidth/2, y: this.pY + this.pHeight/2 }, // RIGHT TOP
			{ x: this.pX + this.pWidth/2, y: this.pY - this.pHeight/2 }  // RIGHT BOTTOM
		]
	}; 
};
