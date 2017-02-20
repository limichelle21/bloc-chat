// Message factory needs to search firebase, return list of messages of current room based on room ID, which needs to be stored in a variable that the Message controller can access?
// a send function needs to add a new message to firebase using the required keys/values


(function() {
  function Message($firebaseArray, $cookies, Room) {
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
        var messagesRef = ref.orderByChild('roomID').equalTo(roomId);
        messages = $firebaseArray(messagesRef);
        return messages;
    }; 
    
/**
@desc private function send
@desc adds a message to the database
@param {object} message
*/
    var send = function(newMessage, roomId) {
       messages.$add({
                username: $cookies.blocChatCurrentUser.email,
                content: newMessage,
                sentAt: Date.now(),
                roomID: roomId
            });
    };
      
/** Authentication.firebaseUser is undefined in the Message.send function. h*/      
      

    return {
        getByRoomId: getByRoomId,
        send: send   
    }; 
  }

  angular
    .module('blocChat')
    .factory('Message', ['$firebaseArray', '$cookies', 'Room', Message]);
})();