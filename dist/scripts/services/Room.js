(function() {
  function Room($firebaseArray) {
    var ref = firebase.database().ref().child("rooms");
    
/**
@desc rooms Variable stores an array of rooms
@type {object}
*/
    var rooms = $firebaseArray(ref);

      
/**
@desc public function addRoom
@desc add a room to the database
@param {object} room
*/
    var addRoom = function(room) {
        rooms.$add({"name": room});
    };
      
      

    return {
        all: rooms
    }; 
  }

  angular
    .module('blocChat')
    .factory('Room', ['$firebaseArray', Room]);
})();