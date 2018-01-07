(function() {
  // ===============================================================================
  // Controllers / RecurringTasks
  //

  function RecurringTasksController($http, $state, $filter, $anchorScroll, $location, bl) {
    var self = this;
    self.tasks = [];
    self.month = new Date().getMonth() + 1;
    // self.month = 5;

    function loadTasks() {
      // Fetch the task list

      // Fetch the task instances for this year

      // Build the month list
      for (var i = 1; i <= 12; i++) {
        var monthName = moment().month(i - 1).format('MMMM');
        var month = { id: i, name: monthName };

        // Add in tasks from this year

        // Add in the instance details

        self.tasks.push(month);
      }

      /*
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
                project.latestUpdate = list[0];
              }
            }, function(response){
              // Error loading status updates for this project
              console.log(err);
            });
          })
        }
      });
      */
    }

    // Kick off the initial load
    loadTasks();

    // Scroll to the current month tasks
    $location.hash('anchor' + self.month);
    $anchorScroll();
  }

  angular.module('pixeladmin')
    .controller('RecurringTasksCtrl', RecurringTasksController);

})();