var app = angular.module("talentApp", ['ngAnimate']).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});



app.controller('formController', ['$scope', '$http', '$filter',  function($scope, $http, $filter){

    $scope.formParams = {};
    $scope.step = 0;
    $scope.viewJSON = true;

    $scope.ranks = [
      "AB",
      "A1C",
      "SrA",
      "SSgt",
      "TSgt",
      "MSgt",
      "SMSgt",
      "CMSgt",
      "2LT",
      "1LT",
      "Capt",
      "Major",
      "Lt. Col",
      "Col"
    ];

    $scope.units = [
      "548 ISRG",
      "548 OSS",
      "48 IS",
      "13 IS",
      "9 IS"
    ];

    $scope.val = 3;
    $scope.min = 1;
    $scope.max = 5;

    $scope.formParams = {
      name: "",
      email: "",
      number: "",
      edipi: "",
      rank: "",
      unit: "",
      skills: []

    }

    $scope.next = function(){
      $scope.getValues();
      $scope.step++;
    }

    $http.get('gather/return').then(function(response){
        $scope.users = response.data;
        console.log(response.data);
    });
    $http.get('gather/skills').then(function(response){
        $scope.skills = response.data;
        console.log(response.data);
    });


    $scope.search = function(){
      $scope.step = 4;

    };

    $scope.viewCard = function(name){
      $scope.step = 5;
      $scope.selectedUser = name;

    };

    $scope.getValues = function(){
      if($scope.name){
        $scope.formParams.name = $scope.name;
      }
      if($scope.workNumber){
        $scope.formParams.number = $scope.workNumber;
      }
      if($scope.email){
        $scope.formParams.email = $scope.email;
      }
      if($scope.edipi){
        $scope.formParams.edipi = $scope.edipi;
      }
      if($scope.rank){
        $scope.formParams.rank = $scope.rank;
      }
      if($scope.unit){
        $scope.formParams.unit = $scope.unit;
      }
    }

    $scope.prev = function(){
      $scope.step--;
    }

    $scope.talentList = [];

    $scope.talentAdd = function() {
        var interest_percentage = ($scope.interest_level * 20);
        var skill_percentage = ($scope.skill_level * 20);
        $scope.talentList.push({talentText:$scope.talentInput, done:false});
        $scope.formParams.skills.push({
                    talentText:$scope.talentInput,
                    interest_level:$scope.interest_level,
                    interest_percentage:interest_percentage,
                    skill_level:$scope.skill_level,
                    skill_percentage:skill_percentage,
                    edipi:$scope.edipi,
                    done:false
                  });
        $scope.talentInput = "";
    };

    $scope.showSkillPercentage = function(skill){
      var percentage = skill.skill_percentage + '%';
      return {
        width: percentage,
        color: '#000000'
      }
    }

    $scope.revealSkillPercentage = function(skill){
      var percentage = skill.skill_level + '%';
      return {
        width: percentage,
        color: '#000000'
      }
    }

    $scope.showInterestLevel = function(skill){
      var percentage = skill.interest_percentage + '%';
      return {
        width : percentage,
        color: '#000000'
      }
    }

    $scope.revealInterestLevel = function(skill){
      var percentage = skill.skill_interest + '%';
      return {
        width: percentage,
        color: '#000000'
      }
    }

    $scope.submit = function(){
      $http({
        method: 'POST',
        url: 'signup/submit',
        data: $scope.formParams,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(res){
        $scope.response = res.data;
        $scope.status = res.status;
      }, function(res){
        $scope.response = res.data || "There was an error in the submission";
        $scope.status = res.status;
      });
    };

}]);

// app.filter('flatten', function(){
//   return function(array){
//     var flattenArray = [];
//     angular.forEach(array, function(value, index){
//       angular.forEach(value.list1, function(val, index){
//         flattenArray.push(val);
//       })
//     })
//     return flattenArray;
//   };
// });
