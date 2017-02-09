define(function(require) {
	Victor = require('./lib/victor')
	
	function vec(x, y) {
		
		var v = new Victor(x, y);
		
		// var v = {
		// 	x: x,
		// 	y: y,
		// 	0: x,
		// 	1: y,
		// 	equals: function(v2) {
		// 		return v.x == v2.x && v.y == v2.y;
		// 	},
		// 	copy: function() {
		// 		return vec(v.x, v.y);
		// 	},
		// 	arr: function() {
		// 		return [v.x, v.y];				
		// 	},
		// 	toString: function(roundTo=null) {
		// 		vToString = v.copy()
		// 		if(roundTo) {
		// 			vToString = v.map(function(i) {return round(i, roundTo)})
		// 		}
		// 		return "v("+vToString.x+", "+vToString.y+")";
		// 	},
		// 	map: function(f) {
		// 		return vec(f(v.x), f(v.y));
		// 	},
		// 	map2: function(v2, f) {
		// 		return vec(f(v.x, v2.x), f(v.y, v2.y));
		// 	},
		// 	inv: function() {
		// 		return vec(v.y, v.x);
		// 	},
		// 	dot: function(v2) {
		// 		return v.x * v2.x + v.y * v2.y;
		// 	},
		// 	len: function() {
		// 		return Math.sqrt(v.dot(v));
		// 	},
		// 	angle: function() {
		// 		return Math.atan2(v.y, v.x);
		// 	},
		// 	slope: function() {
		// 		return (v.x == 0 ? NaN : v.y / v.x);
		// 	},
		// 	cross: function(v2) {
		// 		return v.x * v2.y - v.y * v2.x;
		// 	},
		// 	mul: function(n) {
		// 		return vec(v.x * n, v.y * n);
		// 	},
		// 	elementMul: function(v2) {
		// 		return vec(v.x * v2.x, v.y * v2.y);
		// 	}
		// 	add: function(v2) {
		// 		return vec(v.x + v2.x, v.y + v2.y)
		// 	},
		// 	sub: function(v2) {
		// 		return v.add(v2.mul(-1));
		// 	},
		// 	rotate: function(angle) {
		// 		return vec(
		// 			v.x * Math.cos(angle) - v.y * Math.sin(angle),
		// 			v.x * Math.sin(angle) + v.y * Math.cos(angle)
		// 		);
		// 	},
		// 	rotateAbout: function(angle, v2) {
		// 		vd = v.sub(v2);
		// 		vdRot = vd.rotate(angle);
		// 		return v.sub(vd).add(vdRot);
		// 	},
		// 	limit: function(vLim) {
		// 		return vec(limit(v.x, vLim.x), limit(v.y, vLim.y));
		// 	},
		// 	unit: function() {
		// 		l = v.len();
		// 		if(l == 0) { return vec(0,0); }
		// 		return v.copy().mul(1/l);
		// 	},
		// 	project: function(vProject) {
		// 		vProjectUnit = vProject.unit();
		// 		return vProjectUnit.mul(v.dot(vProjectUnit));
		// 	},
		// 	projectScalar: function(vProject) {
		// 		return v.dot(vProject.unit());
		// 	},
		// 	normal: function() {
		// 		return v.rotate(Math.PI/2).unit();
		// 	},
		// 	mulAlong: function(vAlong, n) {
		// 		return v.add(v.project(vAlong).mul(n-1));
		// 	}
		// };
		return v;
	}
	return vec;
});

// function vecPolar(length, angle) {
// 	return vec(Math.cos(angle), Math.sin(angle)).mul(length);
// }
