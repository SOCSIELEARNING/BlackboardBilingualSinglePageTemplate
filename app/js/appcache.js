$( document ).ready(function() {
	var manualCheck=false;
	window.applicationCache.addEventListener('cached', handleCacheEvent, false);
	window.applicationCache.addEventListener('checking', handleCacheEvent, false);
	window.applicationCache.addEventListener('downloading', handleCacheEvent, false);
	window.applicationCache.addEventListener('error', handleCacheError, false);
	window.applicationCache.addEventListener('noupdate', handleCacheEvent, false);
	window.applicationCache.addEventListener('obsolete', handleCacheEvent, false);
	window.applicationCache.addEventListener('progress', handleCacheEvent, false);
	window.applicationCache.addEventListener('updateready', handleUpdate, false);
	function handleCacheError(e) {
  		console.log('Error: Cache failed to update!');
	};
	function handleCacheEvent(e) {
		console.log ('handleCacheEvent: ' + e.type);
		if (e.type == 'noupdate') {
			checkCacheManually();
		}
	}
	function checkCacheManually() {
		if (window.applicationCache && manualCheck==false) {
			console.log ('checkCacheManually: ' + window.applicationCache);
			manualCheck=true;
			window.applicationCache.update();
		}
	}
	function handleUpdate() {
		console.log ('handleUpdate: reload');
		window.location.reload();
	}
});