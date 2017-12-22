(function() {
  // ===============================================================================
  // Controllers / Projects
  //

  function ProjectsCtrl($http) {
    var scope = this;
    this.projects = [];

    $http.get("https://nlm8zahqm4.execute-api.us-west-1.amazonaws.com/test/projects")
    .then(function(response) {
      scope.projects = response.data;
    });
  }

  angular.module('pixeladmin')
    .controller('ProjectsCtrl', ProjectsCtrl);

})();