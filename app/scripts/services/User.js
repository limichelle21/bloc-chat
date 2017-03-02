(function() {
  function User($firebaseAuth, $firebaseArray) {
      
        var authObj = $firebaseAuth();
        var firebaseUser = authObj.$getAuth();    // this is authData variable, attempting to get data before user is authenticated
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
            var name = getName(firebaseUser);
            
            ref.child(userId).once("value", function(snapshot){
                var ifExists = snapshot.exists();
                if (ifExists){
                    console.log('User already exists');
                } else {
                    users.$add({ 
                        userID: userId,
                        username: name
                    });
                }
            });
        
        };
  // Create firebaseUser and save User's node         

        var getName = function(firebaseUser) {
            var name = ""
            firebaseUser.updateProfile({
                displayName: "Test Random"
            }).then(function() {
                name = firebaseUser.displayName;
            }, function(error) {
                console.log("error" + error.message)
            });
            console.log("name", name);
            return name;
        };
    
 
      
        var signUpWithEmail = function(email, password) {
            authObj.$createUserWithEmailAndPassword(email, password).then(function(firebaseUser) {
                alert("User " + firebaseUser.email + " created successfully");
                authDataCallback(firebaseUser);
                currentUser = firebaseUser;
                
            }).catch(function(error) {
                console.log("error", error);
                alert("Error: " + error.message);
            });
            
            console.log("currentUser", currentUser.email); // currentUser var returns blank. issue to do with Auth obj being in n initialization state?
            
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
            authObj.$signOut(email).then(function() {
                alert("You have been signed out");
                var currentUser = "";
            }).catch(function(error) {
                alert("Error: ", error);
            });
        }
         
        // on page refresh, auto-log out? 
        
    
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