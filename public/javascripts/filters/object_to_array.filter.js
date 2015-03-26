angular.module('codegoblins.filter')
  .filter('array', function() {
      return function(items) {
          var filtered = [];
          angular.forEach(items, function(item) {
              filtered.push(item);
          });
          return filtered;
      };
  });
