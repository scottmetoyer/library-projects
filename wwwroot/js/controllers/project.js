(function() {
  // ===============================================================================
  // Controllers / Project
  //

  function ProjectCtrl($http, $stateParams, $anchorScroll) {
    var self = this;
    self.project = {};
    self.formData = {};

    self.createProject = function(isValid) {
      if (isValid) {
        $http.post(
          "https://nlm8zahqm4.execute-api.us-west-1.amazonaws.com/test/projects",
          JSON.stringify(self.formData))
        .then(function(response) {
          console.log(response);
        }, function(response){
          $anchorScroll();
          self.hasError = true;
        });
      }
    }

    // Load up a project if we have passed a key in the state parameters
    if ($stateParams.key != '') {
      $http.get("https://nlm8zahqm4.execute-api.us-west-1.amazonaws.com/test/projects/" + $stateParams.key)
      .then(function(response) {
        self.project = response.data.Item;
      }, function(response){
        $anchorScroll();
        self.hasError = true;
      });
    }
  }

  angular.module('pixeladmin')
    .controller('ProjectCtrl', ProjectCtrl);

})();