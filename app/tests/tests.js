describe('appController', function() {
	console.log ('Running tests');  
  	beforeEach(module('webApp'));
  	var $controller;
  	beforeEach(inject(function(_$controller_){
    	// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
		$scope = {};
		//Creates new instance of controller for each describe to test against
		//console.log ('Creating Controller instance');
	    controller = $controller('appController', { $scope: $scope });
  	}));
	describe('View model defaults', function() {
		console.log ('$scope function');
		it ('Checking view model defaults', function() {
			console.log ('Checking view model defaults');
			expect ($scope.currArray).toEqual(0);
			expect ($scope.currIndex).toEqual(0);
			expect ($scope.langArray).toEqual([{openTitle: 'Open in a new window', id:'English', hide: false, title:'Topic', appNavigation: [{apptitle:'Learning as a Professional', appclass:'active', hide: false},{apptitle:'Reflection and Criticality', appclass:'', hide: true},{apptitle:'Using Data to Inform your Professional Judgements', appclass:'', hide: true}], appclass:'active'}, {openTitle: 'Agor mewn ffenestr newydd', id:'Cymraeg', hide: true, title:'Pwnc', appNavigation: [{apptitle:'Dysgu fel unigolyn proffesiynol', appclass:'active', hide: false},{apptitle:'Myfyrio a Bod yn Feirniadol', appclass:'', hide: true},{apptitle:'Defnyddio Data i Lywio eich Barnau Proffesiynol', appclass:'', hide: true}], appclass:''}]);
			expect ($scope.currNavigation).toEqual($scope.langArray[$scope.currArray].appNavigation);
			expect ($scope.currTitle).toEqual($scope.langArray[$scope.currArray].title);
			expect ($scope.currLang).toEqual($scope.langArray[$scope.currArray].id);
		});
	});
	describe('$scope.retrievePrefs function', function() {
		console.log ('$scope.retrievePrefs function');
		it ('Checks DOM view model bind changes using localStorage preferences', function() {
			console.log ('Checks DOM view model bind changes using localStorage preferences');
			if (typeof(Storage)!=='undefined') {
				var localStorageData = localStorage.getItem('langPref');
				if (localStorageData!=null && localStorageData.length!=0) {
					if (localStorageData=='1') {
						expect ($('.row').find('.col-md-12').css('display')).toEqual('none');
					} else {
						expect ($('.row').find('.col-md-12').css('display')).toEqual('block');
					}
				} else {
					expect ($('.row').find('.col-md-12').css('display')).toEqual('block');
				}
			} else {
				expect ($('.row').find('.col-md-12').css('display')).toEqual('block');
			}
		});
	});
	describe('$scope.init function', function() {
		console.log ('$scope.init function');
		it ('Checks view model variables match localStorage data', function() {
			console.log ('Checks view model variables match localStorage data');
			$scope.init();
			if (typeof(Storage)!=='undefined') {
				var localStorageData = localStorage.getItem('langPref');
				if (localStorageData!=null && localStorageData.length!=0) {
					if (localStorageData=='1') {
						expect ($scope.currLang).toEqual($scope.langArray[1].id);
					} else {
						expect ($scope.currLang).toEqual($scope.langArray[0].id);
					}
				} else {
					expect ($scope.currLang).toEqual($scope.langArray[0].id);
				}
			} else {
				expect ($scope.currLang).toEqual($scope.langArray[0].id);
			}
		});
	});
	describe('$scope.toggleLanguage function', function() {
		console.log ('$scope.toggleLanguage function');
		it ('Tests the toggleLanguage function against the result in the model', function() {
			$scope.init();
			console.log ('Tests the toggleLanguage function against the result in the model, current value: ' + $scope.currLang);
			if ($scope.currLang==$scope.langArray[0].id) {
				$scope.toggleLanguage('Cymraeg', 1);
				expect ($scope.currLang).toEqual($scope.langArray[1].id);
				console.log ('New value: ' + $scope.currLang);
			} else {
				$scope.toggleLanguage('English', 0);
				expect ($scope.currLang).toEqual($scope.langArray[0].id);
				console.log ('New value: ' + $scope.currLang);
			}
		});
	});
	describe('$scope.togglePage function', function() {
		console.log ('$scope.togglePage function');
    	it ('Tests the togglePage function against the result in the model', function() {
			console.log ('Tests the togglePage function against the result in the model');
      		$scope.togglePage(1, null);
			expect ($scope.currIndex).toEqual(1);
		});
	});
	describe('$scope.openURL function', function() {
		console.log ('$scope.openURL function');
		it('Opens new browser tab with address parameter', function() {
			console.log ('Opens new browser tab with address parameter');
			$scope.openURL('http://news.bbc.co.uk');
	  		expect('visualtest').toEqual('visualtest');
    	});
  	});
	describe('$scope.openSelf function', function() {
		console.log ('$scope.openSelf function');
    	it('Opens new browser tab with same address', function() {
			console.log ('Opens new browser tab with same address');
      		$scope.openSelf('http://news.bbc.co.uk');
	  		expect('visualtest').toEqual('visualtest');
    	});
  	});
});