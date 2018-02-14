var app = angular.module('todoController', []);
app.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.tab = 1;
		$scope.loading = true;
		$scope.configLine = {
            type: 'line',
            data: {
                labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                datasets: [{
                    label: "Ventas del año",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [],
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                title:{
                    display:true,
                    text:''
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Mes'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Valor'
                        }
                    }]
                }
            }
        };
				$scope.configBar = {
          type: 'bar',
          data: {
			           labels: [],
			            datasets: [{
			                label: 'Datos del año',
			                backgroundColor: 'rgb(32, 39, 68)',
			                borderColor: 'rgb(32, 39, 68)',
			                borderWidth: 1,
			                data: []
			            }]

			        },
          options: {
              responsive: true,
              legend: {
                  position: 'top',
              },
              title: {
                  display: true,
                  text: 'Cantidad de personas atendidas'
              }
          }
      };

			$scope.configPie = {
        type: 'pie',
        data: {
            datasets: [{
                data: [],
                backgroundColor: [
                    'rgb(32, 39, 68)',
                    'rgb(204, 83, 101)',
                    'rgb(166, 173, 147)',
                    'rgb(229, 225, 13)',
                    'rgb(10, 219, 188)',
										'rgb(224, 187, 114)',
                ],
                label: 'Dataset 1'
            }],
            labels: []
        },
        options: {
            responsive: true
        }
    };

		$scope.selected = function(setTab){
			$scope.tab = setTab;
			if(setTab === 1){
				var canvas = $('#ventas');

				Todos.getDatosVentas()
					.success(function(data) {
						$scope.loading = false;
						$scope.configLine.data.datasets[0].data = data;
						var myLineChart = new Chart(canvas,$scope.configLine);
					});
			}
			else if(setTab === 2){
				var canvas = $('#empleados');

				Todos.getDatosEmpleados()
					.success(function(data) {
						$scope.loading = false;
						$scope.configBar.data.datasets[0].data = data.cifras;
						$scope.configBar.data.labels = data.empleados;
						var barChart = new Chart(canvas,$scope.configBar);
					});
			}
			else if(setTab === 3){
				var canvas = $('#servicios');

				Todos.getDatosServicios()
					.success(function(data) {
						$scope.loading = false;
						$scope.configPie.data.datasets[0].data = data.numeros;
						$scope.configPie.data.labels = data.tipos;
						var pieChart = new Chart(canvas,$scope.configPie);
					});
			}
		};



		$scope.isSelected = function(checkTab){
			return $scope.tab === checkTab;
		};

	}]);


	app.controller('PanelController',['$scope' , '$http', function($scope, $http){
		$scope.tab = 1;

		$scope.selected = function(setTab){
			$scope.tab = setTab;
		};

		$scope.isSelected = function(checkTab){
			return $scope.tab === checkTab;
		};
	}]);
