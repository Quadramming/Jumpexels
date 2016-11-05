//================================================================
// Name: QQ.Camera
// Version: 16..
// 
// Interface:
// 
//================================================================
'use strict';

var QQ = QQ || {};

QQ.Camera = function(inCanvas, inWidth, inHeight, inX, inY) {

	//================================
	// Public methods
	//================================

	this.draw = function(subjects) {
		cleanCanvas();
		for ( var i in subjects ) {
			var subj  = subjects[i];
			var pos   = subj.getCenterPos();
			var scale = subj.getScale();
			var M     = QQ.Matrix.getScale(scale.x, -scale.y); // Important minus
				M     = QQ.Matrix.mul( M, QQ.Matrix.getMove(pos.x, pos.y));
				M     = QQ.Matrix.mul( M, mainMatrix);

			canvas.getContext('2d').setTransform(M[0][0], M[0][1], M[1][0], M[1][1], M[2][0], M[2][1]);
			subj.draw();
		}
		//drawAxis();
	};
	
	this.getViewRect = function() {
		return { x1: x-width/2, y1: y+height/2, x2: x+width/2, y2: y-height/2 };
	};
	
	this.getWorldPoint = function(x, y) {
		var mainMatrix = QQ.Matrix.mul(getInverseMatrix(), getScreenMatrix());
		var M = QQ.Matrix.mul( [[x, y, 1]], QQ.Matrix.inverse(mainMatrix) );
		return {x: M[0][0], y: M[0][1]};
	};
	
	this.setPos = function(inX, inY) {
		x = inX;
		y = inY;
		calcMainMatrix();
	};
	
	this.addView = function(w, h) {
		width  += w;
		height += h;
		calcMainMatrix();
	};
	
	this.setView = function(w, h) {
		width  = w;
		height = h;
		calcMainMatrix();
	};
	
	//================================
	// Private methods
	//================================
	
	function calcMainMatrix() {
		mainMatrix = QQ.Matrix.mul(getInverseMatrix(), getScreenMatrix());
	}

	function drawAxis() {
		var M   = mainMatrix;
		var ctx = canvas.getContext('2d');
		ctx.setTransform(M[0][0], M[0][1], M[1][0], M[1][1], M[2][0], M[2][1]);
		for ( var i = -10; i <= 10; i++ ) {
			ctx.beginPath();
			ctx.moveTo(-10, i);
			ctx.lineTo( 10, i);
			ctx.lineWidth   = 0.1;
			ctx.strokeStyle = '#00ff00';
			ctx.stroke();
		}
		for ( var i = -10; i <= 10; i++ ) {
			ctx.beginPath();
			ctx.moveTo(i, -10);
			ctx.lineTo(i,  10);
			ctx.lineWidth   = 0.1;
			ctx.strokeStyle = '#00ff00';
			ctx.stroke();
		}
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(-0.1, -0.1, 0.2, 0.2);
		ctx.fillStyle = "#0000FF";
		ctx.fillRect(10, 10, 0.2, 0.2);
	}

	function getMatrix() {
		var M = QQ.Matrix.getIdentity();
			M = QQ.Matrix.mul(M, QQ.Matrix.getRotate(0)   );
			M = QQ.Matrix.mul(M, QQ.Matrix.getScale(1, 1) );
			M = QQ.Matrix.mul(M, QQ.Matrix.getMove( x, y) );
		return M;
	}
	
	function getInverseMatrix() {
		return QQ.Matrix.inverse( getMatrix() );
	}

	function getScreenMatrix() {
		var M = QQ.Matrix.getIdentity();
			M = QQ.Matrix.mul(M, QQ.Matrix.getRotate(0));
			M = QQ.Matrix.mul(M, QQ.Matrix.getScale(canvas.width/width, -canvas.height/height));
			M = QQ.Matrix.mul(M, QQ.Matrix.getMove( canvas.width/2,      canvas.height/2     ));
		return M;
	}
	
	function cleanCanvas() {
		var ctx       = canvas.getContext('2d');
		ctx.fillStyle = 'gray';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	//================================
	// Private vars
	//================================
	
	var self       = this;
	
	var canvas     = inCanvas;
	var width      = inWidth;
	var height     = inHeight;
	var x          = inX || 0;
	var y          = inY || 0;
	var mainMatrix = 0;
	calcMainMatrix();
};
