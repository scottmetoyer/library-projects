(function() {
  // ===============================================================================
  // Controllers / Project
  //

  function ProjectCtrl($http, $stateParams, $anchorScroll, $location) {
    var self = this;

    // Initialize the empty project container with sensible defaults
    self.project = {};
    self.project.executionStatus = 'backlog';
    self.showStatusUpdateForm = false;

    self.toggleStatusUpdateForm = function() {
      self.showStatusUpdateForm = !self.showStatusUpdateForm;
    }

    self.createProject = function(isValid) {
      if (isValid) {
        self.project.key = self.project.key.toUpperCase();

        saveProject(function(){
          $location.path('/pages/view-project/' + self.project.key).search({ new: 'true' });
        });
      }
    }

    self.updateProject = function(isValid) {
      if (isValid) {
        saveProject(function(){
          $location.path('/pages/view-project/' + self.project.key).search({ updated: 'true' });
        });
      }
    }

    function saveProject(callback){
      $http.post("https://nlm8zahqm4.execute-api.us-west-1.amazonaws.com/test/projects", JSON.stringify(self.project))
      .then(function(response) {
        callback();
      }, function(response){
        $anchorScroll();
        self.hasError = true;
      });
    }

    // Load up a project if we have passed a key in the state parameters
    if ($stateParams.key) {
      $http.get("https://nlm8zahqm4.execute-api.us-west-1.amazonaws.com/test/projects/" + $stateParams.key)
      .then(function(response) {
        self.project = response.data.Item;

        if (self.project != null) {
          // Toggle visibility on the new and updated project indicators
          if ('new' in $location.search()) {
            self.showCreatedAlert = true;
          }

          if ('updated' in $location.search()) {
            self.showUpdatedAlert = true;
          }
        } else {
          self.hasError = true;
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