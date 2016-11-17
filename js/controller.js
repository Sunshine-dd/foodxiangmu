angular.module("Controller", [])
	.controller("myController", ['$scope', 'Dinner', function($scope, Dinner) {
		Dinner.dinnerSearch();
		//获取广播室的值
		$scope.$on("dinnerData", function(event, data) {
			//页面一进来,默认总价为0,
			$scope.totalPrice = 0;
			//数量为0
			$scope.totalNum = 0;
			getTotalPrice();
				//获取菜单的数据
				$scope.dinnerList = data;
//				console.log(dinnerList)
				//把右边的数据默认显示第一页
				$scope.rightList = data[0].items;
				$scope.rightTitle = data[0].name;
				init();
				
			})
			//点击事件
		var i = 0;
		$scope.changLi = function(index) {
			//					//把之前点亮的那个给灭掉
			$scope.dinnerList[i].ifChose = false;

			//					//同时把当前的点亮
			$scope.dinnerList[index].ifChose = true;
			i = index;
			//方法二:遍历
			//			angular.forEach($scope.dinnerList, function(val, idx) {
			//把点亮的关掉
			//				val.ifChose = false;
			//			})
			//$scope.dinnerList[index].ifChose = true;
			//把右侧的菜品数据,切换成当前点击的导航下的菜品数据
			$scope.rightList = $scope.dinnerList[index].items;
			console.log($scope.rightList)
			$scope.rightTitle = $scope.dinnerList[index].name;
			init();
		}
		
		
		//localstage存储数据做本地购物车
		$scope.totalNum = 0;
		$scope.totalPrice = 0;
		var arr = [];
		//页面已进入,来判断localStorage.dinner有没有存东西
		//封装成一个函数
		function init(){
			if(localStorage.dinner){
				var arr = [];
				arr = JSON.parse(localStorage.dinner);
				//把存储到localstorage里面的数据赋值给$scope.dinnerList
				for(var i = 0; i < arr.length; i++){
					console.log($scope.rightList)
					for(var j = 0; j < $scope.rightList.length; j++){
						console.log($scope.rightList.length)
						if($scope.rightList[j].name == arr[i].name){
							$scope.rightList[j].num = arr[i].num
						}
					}
					console.log(arr[i].num)
//					$scope.totalNum += arr[i].num
				}
			}
		}
		
		$scope.add = function(index){
			//当前点击菜品的数据
			++$scope.rightList[index].num;
			//计算当前的总价
			$scope.totalPrice += $scope.rightList[index].price;
			//每次点击增加按钮就增加一个数量
			$scope.totalNum+=1;
			//首先要判断localstroge.dinner有没有数据,如果没有数据就直接解析会把错
			if(localStorage.dinner){
				arr = JSON.parse(localStorage.dinner)
			}
			//判断当前菜品数据localstroge.dinner里面有没有相同数据,如果有,直接数量增加,如果没有就直接pish
			
			var flag = false;
			angular.forEach(arr,function(val,key){
				if(val.name == $scope.rightList[index].name){
					++arr[key].num;
					flag = true;
				}
			})
			if(!flag){
				arr.push($scope.rightList[index])
			};
			console.log(arr);
			localStorage.dinner = JSON.stringify(arr)
		}
		//减
		$scope.reduce = function(index){
			if($scope.rightList[index].num<=0){
				$scope.rightList[index].num = 0;
			}else{
				--$scope.rightList[index].num;
				//计算当前的总价
				$scope.totalPrice -= $scope.rightList[index].price;
				$scope.totalNum-=1;
				//确定里面肯定有数据
				arr = JSON.parse(localStorage.dinner)
				angular.forEach(arr,function(val,key){
					if(val.name == $scope.rightList[index].name){
						--val.num;
					}
				})
				localStorage.dinner = JSON.stringify(arr)
			}
			
		}
		//封装数量和单价
		function getTotalPrice(){
			var arr = [];
			if(localStorage.dinner){
				arr = JSON.parse(localStorage.dinner)
			}
			angular.forEach(arr,function(val,key){
				$scope.totalPrice += val.num*val.price;
				$scope.totalNum += val.num;
			})
		}
		
		
		
	}])
	.controller("menuCtroller", ['$scope', function($scope) {
		$scope.ifShow = false;
		$scope.cuansongchufang = function(){
			$scope.ifShow = true;
		}
		
		$scope.quxiao = function(){
			$scope.ifShow = false;
		}
		
		//获取存储的数据
		$scope.shopList=JSON.parse(localStorage.dinner);
		//封装数量和单价
//		 getTotalPrice();
//		function getTotalPrice(){
//			var arr = [];
//			if(localStorage.dinner){
//				arr = JSON.parse(localStorage.dinner)
//			}
//			angular.forEach(arr,function(val,key){
//				$scope.totalPrice += val.num*val.price;
//				$scope.totalNum += val.num;
//			})
//		}
		
//		angular.forEach('$scope.shopList',function(val,key){
//			if(val.num<=0){
//				console.log(2344);
//				$scope.shopList.splice(key,1);
//			}
//		})
		//点击减少函数
		$scope.menureduce = function(index){
			--$scope.shopList[index].num;
			//判断是否为0,为0就让他等于0
			if($scope.shopList[index].num==0){
				$scope.shopList.splice(index,1)
			}
			
			//保存
			localStorage.dinner = JSON.stringify($scope.shopList)
		console.log($scope.shopList)
		}
		//点击增加函数
		$scope.menuadd = function(index){
			++$scope.shopList[index].num;
			//保存
			localStorage.dinner = JSON.stringify($scope.shopList)
		}
	}])
	.controller("finishController",['$scope',function($scope){
		
	}])
