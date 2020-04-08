/**
    * Controller for ssdarray
    *
    * @module app/serverControl
    * @exports powerUsageController
    * @name ssdArrayController
    *
    *
    * @author Judy
    * @date   20190524
    * @brief  ssd inventory operations modify base the file of power usage controller
*/

window.angular && (function(angular) {
    'use strict';

    angular.module('app.serverControl').controller('ssdArrayController', [
    '$scope', '$window', 'UsiAPIUtils', 'APIUtils', 'dataService', 'toastService',
    function($scope, $window, UsiAPIUtils, APIUtils, dataService, toastService) {
      $scope.loading = false;

	  function changeStatus(flag){
          $scope.ssdFlag = false;
          $scope.cableFlag = false;
          $scope.switchFlag = false;
          $scope.psFlag = false;
		  $scope.psxFlag = false;
		  $scope.fanFlag = false;
          if(flag == 'ssd'){
              $scope.ssdFlag = true;
          }else if(flag == 'cable'){
              $scope.cableFlag = true;
          }else if(flag == 'sw'){
              $scope.switchFlag = true;
          }else if(flag == 'ps'){
              $scope.psFlag = true;
          }else if(flag == 'psx'){
              $scope.psxFlag = true;
          }else if(flag == 'fan'){
              $scope.fanFlag = true;
          }
      };
	  
      var arrayInfo=[];
      var PSInfo=[];
	  $scope.leave = function(id){
		  $scope.ssdFlag = false;
          $scope.cableFlag = false;
          $scope.switchFlag = false;
          $scope.psFlag = false;
		  $scope.psxFlag = false;
		  $scope.fanFlag = false;
	      var lab = document.getElementById(id);
		  console.log('leave');
		  console.log(lab);
		  lab.style.display = "none";
	  };
	  
	  ///ssd information
      $scope.SSD = function(num){
      angular.forEach(arrayInfo['Ssdinfo'], function(ssdInfo, ssdNum){
        console.log(ssdInfo);
        console.log(ssdNum);
        if(angular.equals(ssdNum, num)){
            console.log('equal');
			$scope.ssdNo=ssdNum;
			$scope.ssdx=ssdInfo;
			changeStatus('ssd');
			
			var frontImg = document.getElementById('front-img');
			var frontImgRect = frontImg.getBoundingClientRect();
			
			var lab = document.getElementById('usi-ssd');
			//var windowEvent = window.event;               ///Get windowEvent
			var mousePosition = getMousePos(window.event); ///Get mouse position
			lab.style.position = "absolute";
			lab.style.display="block";
			//lab.style.left = mousePosition.x  + 'px';
			//lab.style.top = mousePosition.y  + 'px';	
			lab.style.left = frontImgRect.left +(frontImgRect.right - frontImgRect.left)/2 + 'px';
			lab.style.top = frontImgRect.top+70+ 'px';
			console.log(mousePosition);
			console.log(frontImgRect.left);
			console.log(frontImgRect.bottom);
        }
      });
    };

	///ps information
    $scope.PowerSupply = function(name) {		
		
		if(angular.equals(name, 'PS')) {
			changeStatus('ps');	
			var lab=document.getElementById('usi-ps');
			var mousePosition = getMousePos(window.event); ///Get mouse position
			//var insideImg = document.getElementById('inside-img');
			//var insideImgRect = insideImg.getBoundingClientRect();
			lab.style.position = "absolute";
			lab.style.display="block";
			lab.style.left = mousePosition.x-150 + 'px';
			lab.style.top = mousePosition.y-50 + 'px';
			//lab.style.left = insideImgRect.left + 470 + 'px';
			//lab.style.top = insideImgRect.top + 390 + 'px';
			$scope.psinfo=PSInfo['Status'];
			console.log(lab);
			console.log($scope.psinfo);
		}else{
			angular.forEach(PSInfo['Status'], function(psInfo, psName) {
				changeStatus('psx');	
				var lab=document.getElementById('usi-psx');
				var rearImg = document.getElementById('rear-img');
				var rearImgRect = rearImg.getBoundingClientRect();
				var mousePosition = getMousePos(window.event); ///Get mouse position
				lab.style.position = "absolute";
				lab.style.display= "block";
				//lab.style.left = mousePosition.x + 'px';
				//lab.style.top = mousePosition.y + 'px';
				lab.style.left = rearImgRect.left-100 + 'px'; ///ok
				//lab.style.top = rearImgRect.top+190 + 'px';
				lab.style.top = rearImgRect.top+250 + 'px';
				console.log(lab);
				if(angular.equals(psName, name)) {
					$scope.psname=psName;
					$scope.psinfo=psInfo;
					console.log($scope.psinfo);
				}
			});
		}
    };

	///cable information
	$scope.Cable = function(name) {
		changeStatus('cable');
		console.log(name);
        console.log(arrayInfo);
		$scope.cableinfo=arrayInfo['Cableinfo'];
		var lab=document.getElementById('usi-cable');
		//var mousePosition = getMousePos(window.event); ///Get mouse position
		
		var rearImg = document.getElementById('rear-img');
		var rearImgRect = rearImg.getBoundingClientRect();
		lab.style.position = "absolute";
		lab.style.display="block";
		//lab.style.left = mousePosition.x + 'px';
		//lab.style.top = mousePosition.y + 'px';
		lab.style.left = rearImgRect.left+100+ 'px';
		lab.style.top = rearImgRect.top+50+ 'px';
		console.log(mousePosition.x + 'px');
		console.log(mousePosition.y + 'px');
		console.log(lab); 
	};
	
	///switch information
	$scope.Switch = function(name) {
		changeStatus('sw');
		$scope.swinfo = arrayInfo['Swinfo'];
		var lab = document.getElementById('usi-switch');
		var mousePosition = getMousePos(window.event); ///Get mouse position
		lab.style.position = "absolute";
		lab.style.display = "block";		
		lab.style.left = mousePosition.x - 350 + 'px';
		lab.style.top = mousePosition.y - 150 + 'px';
		console.log("Switch"); 
		console.log(mousePosition.x + 'px');
		console.log(mousePosition.y + 'px');
		//console.log(lab); 
	};
	
	
	  	///fan sensor information
	$scope.Fan = function(name) {
		changeStatus('fan');
		console.log(name);
		console.log(fanData);
		
		var lab=document.getElementById('usi-fan');
		//var windowEvent = window.event;               ///Get windowEvent
		var mousePosition = getMousePos(window.event); ///Get mouse position
		lab.style.position = "absolute";
		lab.style.display="block";
		lab.style.left = mousePosition.x-250 + 'px';
		lab.style.top = mousePosition.y + 'px'; 
		console.log("Fan");

		for(var i = 0; i < fanData.length; i++){
			if(fanData[i].title.indexOf(name+' INLET') != -1) {
				$scope.faninfoIN=fanData[i];
				console.log($scope.faninfoIN);
			}else if(fanData[i].title.indexOf(name+' OUTLET') != -1){
				$scope.faninfoOUT=fanData[i];
				console.log($scope.faninfoOUT);
			}
		}
	  };
	
	  ///arrow loop
	  var index = 0;
      var imgElement = document.getElementById("imgs").getElementsByTagName("li");
	  console.log(imgElement);
      var imgLen = imgElement.length;
      $scope.moveNext = function(arrow){
		  if(arrow == 'right'){
			index++;
			if (index == imgLen){
				index = 0; // The first image
			}
			angular.element(imgElement).eq(index-1).addClass('img_display');
			angular.element(imgElement).eq(index).removeClass('img_display');
		  }else if(arrow == 'left'){
			index--;
			if (index == -1){
				index = imgLen - 1; // The last image
			}
			if (index == 2){
				angular.element(imgElement).eq(0).addClass('img_display');
			}else{
				angular.element(imgElement).eq(index+1).addClass('img_display');
			}
			angular.element(imgElement).eq(index).removeClass('img_display');
		  }
	  };

	   
	  // Get mouse relative position
      function getMousePos(event) {
          var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
          var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		  //var x = event.pageX || event.clientX + scrollX;
		  //var y = event.pageY || event.clientY + scrollY;
		  var x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		  var y = event.clientY+ document.body.scrollTop + document.documentElement.scrollTop;
		  return { 'x': x, 'y': y };
      }
	
	
      $scope.loadSsdInfo = function(){
        UsiAPIUtils.getSsdArrayInfo().then(
            function(data){
                arrayInfo = data;
                /*   $scope.ssdinfo = arrayInfo['Ssdinfo'];
                }
                if (arrayInfo.hasOwnProperty('Cableinfo')){
                    $scope.cableinfo = arrayInfo['Cableinfo'];
                }
                if (arrayInfo.hasOwnProperty('Dspinfo')){
                    $scope.dspinfo = arrayInfo['Dspinfo'];
                }
                if (arrayInfo.hasOwnProperty('Patopoinfo')){
                    $scope.patopoinfo = arrayInfo['Patopoinfo'];
                }
                if (arrayInfo.hasOwnProperty('Swinfo')){
                    $scope.swinfo = arrayInfo['Swinfo'];
                }
                if (arrayInfo.hasOwnProperty('Bindinfo')){
                    $scope.bindinfo = arrayInfo['Bindinfo'];
                } */
            },
            function(error) {
               toastService.error('Error during getSsdArrayInfo');
            }
        );
      };
	  
      // Get power supply info
      $scope.loadPowerSupplyInfo = function(){
        UsiAPIUtils.getPowerSupplyInfo().then(
            function(data){
                PSInfo = data;
                /* if (psinfo.hasOwnProperty('Status')){
                    $scope.psinfo = psinfo['Status'];
                } */
            },
            function(error) {
               toastService.error('Error during get PowerSupplyInfo');
            }
        );
      };
	  
	  
      var fanData = [];
	  $scope.loadFanSensorData = function(){
          APIUtils.getAllSensorStatus(function(data, originalData) {
              for(var i = 0; i < data.length; i++){
                  if(data[i].title.indexOf('Fan') != -1 &&  data[i].title.indexOf('Tach') != -1){
                      fanData.push(data[i]);
					  //console.log(data[i]);
					  //console.log(data[i].title);
                  }
              }
              
         });
	  };

      $scope.loadSsdInfo();
      $scope.loadPowerSupplyInfo();
	  $scope.loadFanSensorData();
    }
  ]);
})(angular);
