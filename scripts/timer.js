define(function() {	
	function getAbsTime() {
		return (new Date).getTime();	
	}
	startTime = getAbsTime();
	return {
		getTime: function() {
			return getAbsTime() - startTime;
		}
	}
})
