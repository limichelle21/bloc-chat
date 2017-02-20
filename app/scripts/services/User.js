(function() {
  function User($firebaseAuth, $firebaseArray) {
      
        var authObj = $firebaseAuth();
        var firebaseUser = authObj.$getAuth();    // this is authData variable
        var currentUser = "";
      
        var ref = firebase.database().ref().child("users");
        var users = $firebaseArray(ref);

// check if user is already signed in      
      
        if (firebaseUser) {
            var userId = firebaseUser.uid;
            var email = firebaseUser[firebaseUser.email];
            console.log("User " + userId + " is logged in with " + email);
        } else {
            console.log("User is logged out");
        };
              
// Check if user already exists in Firebase User's node
// Set user.id and user.email properties with firebaseUser values
      
        var authDataCallback = function(firebaseUser) {
            var userId = firebaseUser.uid;
            
            ref.child(userId).once("value", function(snapshot){
                var ifExists = snapshot.exists();
                if (ifExists){
                    console.log('User already exists');
                } else {
                    users.$add({ 
                        userID: userId,
                        provider: firebaseUser.provider
                    });
                }
            });
        };
 
    
// Create firebaseUser and save User's node      
      
        var signUpWithEmail = function(email, password) {
            authObj.$createUserWithEmailAndPassword(email, password).then(function(firebaseUser) {
                alert("User " + firebaseUser.email + " created successfully");
                authDataCallback(firebaseUser);
                currentUser = firebaseUser;
                
            }).catch(function(error) {
                console.log("error", error);
                alert("Error: " + error.message);
            });
            
            console.log("currentUser", currentUser); // currentUser var returns blank
            
        }
               
      
        var signInWithEmail = function(email, password) {
            authObj.$signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
                alert("Signed in as: " + firebaseUser.email);
                currentUser = firebaseUser;
            }).catch(function(error) {
                alert("Authentication failed" + error.message);
            });   
        }
    
        
        var signOut = function() {
            authObj.$signOut(email, password).then(function() {
                alert("You have been signed out");
                var currentUser = "";
            }).catch(function(error) {
                alert("Error: ", error);
            });
        }
         
        
    
       return {
            users: users,
            currentUser: currentUser,
            signUpWithEmail: signUpWithEmail,
            signInWithEmail: signInWithEmail,
            signOut: signOut,
            };         
    }
 
 
  angular
    .module('blocChat')
    .factory('User', ['$firebaseAuth', '$firebaseArray', User]);
})();