(function() {
  // ===============================================================================
  // Controllers / Project
  //

  function ProjectCtrl($http, $stateParams) {
    var self = this;
    self.project = {};
    self.formData = {};

    self.createProject = function() {
      $http.post("https://nlm8zahqm4.execute-api.us-west-1.amazonaws.com/test/projects/")
      .then(function(response) {
        self.project = response.data.Item;
      });
    }

    // Load up a project if we have passed a key in the state parameters
    if ($stateParams.key != '') {
      $http.get("https://nlm8zahqm4.execute-api.us-west-1.amazonaws.com/test/projects/" + $stateParams.key)
      .then(function(response) {
        self.project = response.data.Item;
      });
    }
  }

  angular.module('pixeladmin')
    .controller('ProjectCtrl', ProjectCtrl);

})();