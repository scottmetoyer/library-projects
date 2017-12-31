(function() {
  // ===============================================================================
  // Controllers / ProjectList
  //

  function ProjectListCtrl($http, $state, $filter, bl) {
    var self = this;
    self.projects = [];

    self.moveToInFlight = function(key) {
      var postData = { key: key, executionStatus: 'in-flight'};

      $http.post("https://nlm8zahqm4.execute-api.us-west-1.amazonaws.com/test/projects/" + key + "/execution-status", JSON.stringify(postData))
      .then(function(response) {
        loadProjects();
      });
    }

    self.moveToOnDeck = function(key) {
      var postData = { key: key, executionStatus: 'on-deck'};

      $http.post("https://nlm8zahqm4.execute-api.us-west-1.amazonaws.com/test/projects/" + key + "/execution-status", JSON.stringify(postData))
      .then(function(response) {
        loadProjects();
      });
    }

    self.moveToBacklog = function(key) {
      var postData = { key: key, executionStatus: 'backlog'};

      $http.post("https://nlm8zahqm4.execute-api.us-west-1.amazonaws.com/test/projects/" + key + "/execution-status", JSON.stringify(postData))
      .then(function(response) {
        loadProjects();
      });
    }

    function loadProjects() {
      $http.get("https://nlm8zahqm4.execute-api.us-west-1.amazonaws.com/test/projects")
      .then(function(response) {

        // Filter the list based on route
        if ($state.current.name == 'pages.backlog') {
          self.projects = response.data.filter(function(project) {
            return (project.executionStatus == 'backlog');
          });
        } else if ($state.current.name == 'pages.on-deck') {
          self.projects = response.data.filter(function(project) {
            return (project.executionStatus == 'on-deck');
          });
        } else if ($state.current.name == 'pages.archive') {
          self.projects = response.data.filter(function(project) {
            return (project.executionStatus == 'archive');
          });
        } else {
          self.projects = response.data.filter(function(project) {
            return (project.executionStatus == 'in-flight');
          });

          self.projects.forEach(function(project) {
            project.status = bl.calculateStatus(project);

            $http.get("https://nlm8zahqm4.execute-api.us-west-1.amazonaws.com/test/project-updates/" + project.key)
            .then(function(res) {
              var list = res.data.Items;

              if (list.length > 0) {
                list = $filter('orderBy')(list, "created", true);
                project.latestUpdate = list[0].text;
              }
            }, function(response){
              // Error loading status updates for this project
              console.log(err);
            });
          })
        }
      });
    }

    // Kick off the initial load
    loadProjects();
  }

  angular.module('pixeladmin')
    .controller('ProjectListCtrl', ProjectListCtrl);

})();