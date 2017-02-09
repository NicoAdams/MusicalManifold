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
	
	return util;
});