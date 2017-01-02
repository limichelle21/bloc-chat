(function() {
  function Room($firebaseArray) {
    var ref = firebase.database().ref().child("rooms");
    
/**
@desc rooms Variable stores an array of rooms
@type {object}
*/
    var rooms = $firebaseArray(ref);
      
      
      
    return {
        all: rooms
    }; 
  }

  angular
    .module('blocChat')
    .factory('Room', ['$firebaseArray', Room]);
})();