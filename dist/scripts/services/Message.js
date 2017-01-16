// Message factory needs to search firebase, return list of messages of current room based on room ID, which needs to be stored in a variable that the Message controller can access?
// a send function needs to add a new message to firebase using the required keys/values



(function() {
  function Message($firebaseArray, Room) {
    var ref = firebase.database().ref().child("messages");
      
/**
@desc messages Variable stores an array of messages
@type {object}
*/
    var messages = "";

      
/**
search for all messages with a given room ID and store in messages Variable
*/
    var getByRoomId = function(roomId) {
        ref.orderByChild('roomId').equalTo('room');
        messages = $firebaseArray(ref);
        return messages;
    }; 
      
      
/**
@desc private function send
@desc adds a message to the database
@param {object} message
*/
    var send = function(newMessage) {
       messages.$add({
                username: "current user",
                content: newMessage,
                sentAt: Date.now(),
                roomId: Room.roomID
            });
    };
      

    return {
        getByRoomId: getByRoomId,
        send: send   
    }; 
  }

  angular
    .module('blocChat')
    .factory('Message', ['$firebaseArray', 'Room', Message]);
})();