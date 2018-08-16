angular.module('userListController', ['angularUtils.directives.dirPagination']) //angular.module('app', ...

    .controller('userListController',
        [
            '$scope',
            '$http',
            '$window',
            '$cookies',
            function ($scope, $http, $window, $cookies) {
                $scope.AddModal = false;
                $scope.EditModal = false;
                $scope.DeleteModal = false;

                $scope.errorFirstname = false;

                $scope.showAdd = function () {
                    $scope.firstname = null;
                    $scope.lastname = null;
                    $scope.address = null;
                    $scope.errorFirstname = false;
                    $scope.errorLastname = false;
                    $scope.errorAddress = false;
                    $scope.AddModal = true;
                }

                $scope.fetch = function () {
                     $scope.members = $cookies.users;

/*                    $scope.members = [
                        {memid: 1, firstname: 'Fred', lastname: "Testoni", address: 'Silay City'},
                        {memid: 2, firstname: 'Mark', lastname: "Lopez", address: 'Montevideo City'},
                        {memid: 3, firstname: 'Tito', lastname: "Lopez", address: 'New York City'},
                        {memid: 4, firstname: 'Triven', lastname: "Lopez", address: 'Sydney City'},
                        {memid: 5, firstname: 'Fabi', lastname: "Lopez", address: 'Burundagui City'},
                        {memid: 6, firstname: 'Maria Noel', lastname: "Lopez", address: 'Silay City'},
                        {memid: 7, firstname: 'Novick', lastname: "Lopez", address: 'Silay City'},
                        {memid: 8, firstname: 'John Lennon', lastname: "Lopez", address: 'Silay City'},
                        {memid: 9, firstname: 'Tatcher', lastname: "Lopez", address: 'Silay City'},
                        {memid: 10, firstname: 'Walker', lastname: "Lopez", address: 'Silay City'},
                        {memid: 11, firstname: 'O.J. Simpson', lastname: "Lopez", address: 'Silay City'},
                        {memid: 12, firstname: 'Marcos Wey', lastname: "Lopez", address: 'Silay City'},
                        {memid: 13, firstname: 'DJ Khaled', lastname: "Lopez", address: 'Silay City'},
                        {memid: 14, firstname: 'Neo', lastname: "Lopez", address: 'Silay City'},
                        {memid: 15, firstname: 'Morpheus', lastname: "Lopez", address: 'Silay City'},
                        {memid: 16, firstname: 'White Bunny', lastname: "Lopez", address: 'Silay City'},
                        {memid: 17, firstname: 'Chris Novoselic', lastname: "Lopez", address: 'Silay City'}
                    ];*/
                }

                $scope.sort = function (keyname) {
                    $scope.sortKey = keyname;
                    $scope.reverse = !$scope.reverse;
                }

                $scope.clearMessage = function () {
                    $scope.success = false;
                    $scope.error = false;
                }

                $scope.addUser = function () {
                    $http.post(
                        "add.php", {
                            'firstname': $scope.firstname,
                            'lastname': $scope.lastname,
                            'address': $scope.address,
                        }
                    ).success(function (data) {
                        if (data.firstname) {
                            $scope.errorFirstname = true;
                            $scope.errorLastname = false;
                            $scope.errorAddress = false;
                            $scope.errorMessage = data.message;
                            $window.document.getElementById('firstname').focus();
                        }
                        else if (data.lastname) {
                            $scope.errorFirstname = false;
                            $scope.errorLastname = true;
                            $scope.errorAddress = false;
                            $scope.errorMessage = data.message;
                            $window.document.getElementById('lastname').focus();
                        }
                        else if (data.address) {
                            $scope.errorFirstname = false;
                            $scope.errorLastname = false;
                            $scope.errorAddress = true;
                            $scope.errorMessage = data.message;
                            $window.document.getElementById('address').focus();
                        }
                        else if (data.error) {
                            $scope.errorFirstname = false;
                            $scope.errorLastname = false;
                            $scope.errorAddress = false;
                            $scope.error = true;
                            $scope.errorMessage = data.message;
                        }
                        else {
                            $scope.AddModal = false;
                            $scope.success = true;
                            $scope.successMessage = data.message;
                            $scope.fetch();
                        }
                    });
                }

                $scope.selectMember = function (member) {
                    $scope.clickMember = member;
                }

                $scope.showEdit = function () {
                    $scope.EditModal = true;
                }

                $scope.updateMember = function () {
                    $http.post("edit.php", $scope.clickMember)
                        .success(function (data) {
                            if (data.error) {
                                $scope.error = true;
                                $scope.errorMessage = data.message;
                                $scope.fetch();
                            }
                            else {
                                $scope.success = true;
                                $scope.successMessage = data.message;
                            }
                        });
                }

                $scope.showDelete = function () {
                    $scope.DeleteModal = true;
                }

                $scope.deleteMember = function () {
                    $http.post("delete.php", $scope.clickMember)
                        .success(function (data) {
                            if (data.error) {
                                $scope.error = true;
                                $scope.errorMessage = data.message;
                            }
                            else {
                                $scope.success = true;
                                $scope.successMessage = data.message;
                                $scope.fetch();
                            }
                        });
                }

            }]);