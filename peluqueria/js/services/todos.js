angular.module('todoService', [])

	// super simple service
	// each function returns a promise object
	.factory('Todos', ['$http',function($http) {
		return {
			getDatosVentas : function() {
				return $http.get('/api/ventas');
			},
			getDatosEmpleados : function() {
				return $http.get('/api/empleados');
			},
			getDatosServicios : function() {
				return $http.get('/api/servicios');
			}
			// create : function(todoData) {
			// 	return $http.post('/api/todos', todoData);
			// },
			// delete : function(id) {
			// 	return $http.delete('/api/todos/' + id);
			// }
		}
	}]);
