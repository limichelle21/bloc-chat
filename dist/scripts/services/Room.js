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
    Room.addRoom = function(room) {
        rooms.$add({"name": room});
    };
      
    Room.deleteRoom = function(room) {
        rooms.$remove(room);
    };  

    return {
        all: rooms
    }; 
  }

  angular
    .module('blocChat')
    .factory('Room', ['$firebaseArray', Room]);
})();