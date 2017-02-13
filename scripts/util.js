define(function() {
	util = {};
	
	util.round = function(n, exponent) {
		const base = Math.round(Math.pow(10, Math.abs(exponent)));
		if (exponent > 0) {
			return Math.round(n / base) * base;
		}
		else {
			return Math.round(n * base) / base;
		}
	}
	
	util.sum = function(arr) {
		return arr.reduce(function(a, b) {return a + b;}, 0)
	}
	
	util.rgb = function(r,g,b) {
		return "rgb("+Math.round(r)+","+Math.round(g)+","+Math.round(b)+")";
	}
	
	return util;
});