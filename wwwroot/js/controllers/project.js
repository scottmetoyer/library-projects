(function() {
  // ===============================================================================
  // Controllers / Project
  //

  function ProjectCtrl($http, $stateParams) {
    var self = this;
    self.project = {};

    $http.get("https://nlm8zahqm4.execute-api.us-west-1.amazonaws.com/test/projects/" + $stateParams.key)
    .then(function(response) {
      self.project = response.data.Item;
    });
  }

  angular.module('pixeladmin')
    .controller('ProjectCtrl', ProjectCtrl);

})();