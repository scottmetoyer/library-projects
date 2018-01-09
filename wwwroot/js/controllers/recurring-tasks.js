(function() {
  // ===============================================================================
  // Controllers / RecurringTasks
  //

  function RecurringTasksCtrl($http, $scope, $state, $filter, $anchorScroll, $location, bl) {
    var self = this;
    self.month = new Date().getMonth() + 1;
    self.year = new Date().getFullYear();
    self.months = [];
    self.tasks = [];
    self.instances = [];

    // Custom filter for showing tasks of a certain month
    // TODO: Figure out how to get this moved into filter.js
    $scope.byMonth = function(month) {
      return function(task) {
        return task.schedule[month].selected == true;
      }
    }

    function loadTasks() {
      // Build the month list
      for (var i = 1; i <= 12; i++) {
        var monthName = moment().month(i - 1).format('MMMM');
        var month = { id: i, name: monthName };
        self.months.push(month);
      }

      // Fetch all the tasks
      $http.get("https://nlm8zahqm4.execute-api.us-west-1.amazonaws.com/test/tasks")
      .then(function(response) {
        self.tasks = response.data;
      });

      // Fetch the task instance data
      $http.get("https://nlm8zahqm4.execute-api.us-west-1.amazonaws.com/test/tasks/instances/" +  self.year)
      .then(function(response) {
        self.instances = response.data;
      });
    }

    // Kick off the initial load
    loadTasks();

    // Scroll to the current month tasks
    $location.hash('anchor' + self.month);
    $anchorScroll();
  }

  angular.module('pixeladmin')
    .controller('RecurringTasksCtrl', RecurringTasksCtrl);

})();