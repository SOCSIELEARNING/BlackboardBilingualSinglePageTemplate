app.controller('appController', function($scope) {
	console.log ('Initialising Controller');
	$scope.currArray = 0;
	$scope.currIndex = 0;
	$scope.langArray = [{openTitle: 'Open in a new window', id:'English', hide: false, title:'Topic', appNavigation: [{apptitle:'Learning as a Professional', appclass:'active', hide: false},{apptitle:'Reflection and Criticality', appclass:'', hide: true},{apptitle:'Using Data to Inform your Professional Judgements', appclass:'', hide: true}], appclass:'active'}, {openTitle: 'Agor mewn ffenestr newydd', id:'Cymraeg', hide: true, title:'Pwnc', appNavigation: [{apptitle:'Dysgu fel unigolyn proffesiynol', appclass:'active', hide: false},{apptitle:'Myfyrio a Bod yn Feirniadol', appclass:'', hide: true},{apptitle:'Defnyddio Data i Lywio eich Barnau Proffesiynol', appclass:'', hide: true}], appclass:''}];
	$scope.currNavigation = $scope.langArray[$scope.currArray].appNavigation;
	$scope.currTitle = $scope.langArray[$scope.currArray].title;
	$scope.currLang = $scope.langArray[$scope.currArray].id;
	$scope.togglePage = function(index, $event) {
		$scope.currNavigation[$scope.currIndex].appclass='';
		$scope.currNavigation[$scope.currIndex].hide=true;
		$scope.currIndex = index;
		$scope.currNavigation[index].appclass='active';
		$scope.currNavigation[index].hide=false;
		clearMenu();
	};
	$scope.toggleLanguage = function(lang, index) {
	  	renderLanguage(index);
		if (typeof(Storage) !== 'undefined') {
			localStorage.setItem('langPref', String(index));
		}
	};
	$scope.openURL = function(address) {
		window.open(address);
	};
	$scope.openSelf = function(address) {
		if (address==''||address==null) {
			window.open(window.location.href);
		} else {
			window.open(address);
		}
	};
	$scope.init = function() {
		retrievePrefs();
	};
	function renderLanguage(index) {
		$scope.langArray[$scope.currArray].hide=true;
		$scope.langArray[$scope.currArray].appclass='';
		$scope.currNavigation[$scope.currIndex].appclass='';
		$scope.currNavigation[$scope.currIndex].hide=true;
		$scope.currArray = index;
		$scope.currNavigation = $scope.langArray[$scope.currArray].appNavigation;
		$scope.currTitle = $scope.langArray[$scope.currArray].title;
	    $scope.currLang = $scope.langArray[$scope.currArray].id;
	  	$scope.langArray[$scope.currArray].hide=false;
		$scope.langArray[$scope.currArray].appclass='active';
		$scope.currNavigation[0].appclass='';
		$scope.currNavigation[0].hide=true;
		$scope.currNavigation[$scope.currIndex].appclass='active';
		$scope.currNavigation[$scope.currIndex].hide=false;
		clearMenu();
	}
	function retrievePrefs() {
		if (typeof(Storage) !== 'undefined') {
			var localStorageData = localStorage.getItem('langPref');
			if (localStorageData!=null && localStorageData.length!=0) {
				if (localStorageData=='1') {
					renderLanguage (1);
				}
			}
		}
	}
	function clearMenu() {
		//Redundant untestable function but useful to leave in should changes be made to Bootstrap hidden properties
		if ($('.navbar .navbar-header button').css('display')=='block') {
			$('.navbar-collapse').collapse('hide');
		}
	}
});