(function() {
  function User($firebaseArray, Authentication) {
    var ref = firebase.database().ref().child("users");
    
/**
@desc users Variable stores an array of users
@type {object}
*/
    var users = $firebaseArray(ref);
//    var authData = Authentication.firebaseUser;
      
/**
@desc private function saveUser, return them in an object
@desc add a Usesr to the database using firebaseUID, set user's name
@param {object} user
*/
  
//      var saveUser = function() {
//        users.$add({
//            ref.child(authData.uid).set({
//              provider: authData.provider,
//              name: getName(authData)
//            });
//          })
//    }
//      
      
      

// Setting up getName function to be used with FB authentication in the future    
      var getName = function(authData) {
          switch(authData.provider) {
              case 'password':
                  return authData.password.email.replace(/@.*/, '');
              case 'facebook':
                  return authData.facebook.displayName;
          }
      }
      

    return {
        all: users,
        saveUser: saveUser
    }; 
  }

  angular
    .module('blocChat')
    .factory('User', ['$firebaseArray', 'Authentication', User]);
})();