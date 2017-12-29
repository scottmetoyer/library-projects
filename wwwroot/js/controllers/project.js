(function() {
  // ===============================================================================
  // Controllers / Project
  //

  function ProjectCtrl($http, $stateParams, $anchorScroll, $location) {
    var self = this;
    self.project = {};

    self.createProject = function(isValid) {
      if (isValid) {
        $http.post("https://nlm8zahqm4.execute-api.us-west-1.amazonaws.com/test/projects", JSON.stringify(self.project))
        .then(function(response) {
          $location.path('/pages/view-project/' + self.project.key).search({ new: 'true' });
        }, function(response){
          $anchorScroll();
          self.hasError = true;
        });
      }
    }

    self.updateProject = function(isValid) {
      if (isValid) {
        $http.post("https://nlm8zahqm4.execute-api.us-west-1.amazonaws.com/test/projects", JSON.stringify(self.project))
        .then(function(response) {
          $location.path('/pages/view-project/' + self.project.key).search({ updated: 'true' });
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

        // Toggle visibility on the new and updated project indicators
        if ('new' in $location.search()) {
          self.showCreatedAlert = true;
        }

        if ('updated' in $location.search()) {
          self.showUpdatedAlert = true;
        }
      }, function(response){
        $anchorScroll();
        self.hasError = true;
      });
    }
  }

  angular.module('pixeladmin')
    .controller('ProjectCtrl', ProjectCtrl);

})();