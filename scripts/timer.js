define(function() {	
	function getAbsTime() {
		return (new Date).getTime();	
	}
	startTime = getAbsTime();
	return {
		ms: function() {
			return getAbsTime() - startTime;
		},
		s: function() {
			return getMS() / 1000;
		}
	}
})
