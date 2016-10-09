'use strict';

angular.module('belatrixApp')

.controller('MainCtrl', function ($scope) {
    var dict=[{}];
    $scope.invalid=false;
    $scope.ubigeos=dict;
    $scope.showContent = function($fileContent){
        $scope.ubigeos=[{}];
        strToArray($fileContent);
        $scope.content = $fileContent;
    };
    function strToArray(str) {
        str=str.replace(/“/gi,"");
        str=str.replace(/”/gi,"");
        var array=str.split("\n")

        if(array[0].match(/[' “"]?[\d]*[\s][\w ]*[\s]\/[\s]*[\d]*[\s][\w ]*[\s]*\/[\s]*[\d]*[\s][\w ]*[\s]*[' ”"]?/g)==null){
            $scope.invalid=true;
        }else{
            $scope.invalid=false;
            arrayToStructure(array);
        }
    };
    function arrayToStructure(array){
        var i,j;
        for (i = 0; i < array.length; i++) { 
            var arrayTmp=array[i].split("/");

            var deparmentTmp=arrayTmp[0].split(" ");
            var provinceTmp=arrayTmp[1].split(" ");
            var districtTmp=arrayTmp[2].split(" ");

            //New department

            var deparmentCode=arrayTmp[0].match(/\d/g);
            if(deparmentCode!=null){
                deparmentCode=deparmentCode.join("");
            }
            var deparmentString=arrayTmp[0].match(/[a-zA-Z]+/g);
            if(deparmentString!=null){
                deparmentString=deparmentString.join(" ");
            }

            //New Province
            var provinceCode=arrayTmp[1].match(/\d/g);
            if(provinceCode!=null){
                provinceCode=provinceCode.join("");
            }
            var provinceString=arrayTmp[1].match(/[a-zA-Z]+/g);
            if(provinceString!=null){
                provinceString=provinceString.join(" ");
            }

            //New District
            var districtCode=arrayTmp[2].match(/\d/g);
            if(districtCode!=null){
                districtCode=districtCode.join("");
            }
            var districtString=arrayTmp[2].match(/[a-zA-Z]+/g);
            if(districtString!=null){
                districtString=districtString.join(" ");
            }            

            console.log("lo que viene:");
            console.log("deparments code:");
            console.log(deparmentCode);
            console.log("deparments string:");
            console.log(deparmentString);

            console.log("provinces code:");
            console.log(provinceCode);
            console.log("provinces string:");
            console.log(provinceString);

            console.log("districts code:");
            console.log(districtCode);
            console.log("districts string:");
            console.log(districtString);
            
        


            var foundDeparment=findCodeInArray($scope.ubigeos,deparmentCode);
            if(foundDeparment!=false){
                var foundProvince=findCodeInArray($scope.ubigeos[foundDeparment].childs,provinceCode);
                if(foundProvince!=false){
                    var foundDistrict=findCodeInArray($scope.ubigeos[foundDeparment].childs[foundProvince].childs,districtCode);
                    if(foundDistrict==false){
                        $scope.ubigeos[foundDeparment].childs[foundProvince].childs.push({code:districtCode,district:districtString})
                    }
                }else{
                    $scope.ubigeos[foundDeparment].childs.push({
                        code:provinceCode,
                        province:provinceString,
                        childs:[{
                            code:districtCode,
                            district:districtString
                        }]
                    })
                }
            }else{
                $scope.ubigeos.push({
                    code:deparmentCode,
                    department:deparmentString,
                    childs:[{
                        code:provinceCode,
                        province:provinceString,
                        childs:[{
                            code:districtCode,
                            district:districtString
                        }],
                    }]
                })
            }
        }
        console.log($scope.ubigeos);
    }

    function findCodeInArray(array,item){
       var i;
       for(i=0;i<array.length;i++){
        if(array[i].code==item){
            return i;
        }
        
       }
       return false;
    }

})

;
