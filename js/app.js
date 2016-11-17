//引入路由
angular.module('myApp',['ngRoute','Controller', 'Service'])

//定制路由
.config(['$routeProvider', function($routeProvider) {
	//通过when
	$routeProvider
		.when('/home', {
			templateUrl: 'template/home.html',
			controller:'myController'
		})
		.when('/menu',{
			templateUrl:'template/menu.html',
			controller:'menuCtroller'
		})
		.when('/finish',{
			templateUrl:'template/finish.html',
			controller:'finishController'
		})
		//用来给他设置 默认
		.otherwise('/home')
}])