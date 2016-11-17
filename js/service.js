angular.module("Service", [])
	//自定义服务器,获取json
	.service("Dinner", ['$http','$rootScope',function($http,$rootScope) {
		return {
			"dinnerSearch": function() {
				$http.get("js/groups.json", {

				}).then(function(res) {
//					console.log(res.data)
						//把数据存到广播上,以便于控制器调用
					$rootScope.$broadcast("dinnerData",res.data)
//					console.log(dinnerData)
				}, function(error) {
					console.log(error)
				})
			}
		}
	}])