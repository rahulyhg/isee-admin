myApp.controller('ViewLogCtrl', function ($scope, TemplateService, NavigationService, $stateParams, $timeout, $uibModal, $state) {
    $scope.template = TemplateService.getHTML("content/view-log.html");
    TemplateService.title = "View Log"; //This is the Title of the Website
    TemplateService.class = "view-log"; //This is the Class of Page
    $scope.navigation = NavigationService.getNavigation();
    // console.log($stateParams);

    var sendData={};
    sendData._id=$stateParams.log_id
    NavigationService.apiCall("AllLogs/getOne", sendData, function (data) {
        if (data.value == true) {
            $scope.logss=data.data;
            // $scope.logInsideData = data.data.logs;
            // _.forEach($scope.logInsideData, function (value, key) {
            //     value.rowNo = key;
            // });
        }
    });

})