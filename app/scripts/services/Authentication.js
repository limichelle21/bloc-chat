(function() {
  function Authentication($firebaseAuth, $firebaseArray) {
      
        var authObj = $firebaseAuth();
        var firebaseUser = authObj.$getAuth();    // this is authData variable
        var currentUser = "";
        var name = "";
        
        var ref = firebase.database().ref().child("users");
        var users = $firebaseArray(ref);
              
      
        if (firebaseUser) {
            var userId = firebaseUser.uid;
            email = firebaseUser[firebaseUser.email];
            console.log("User " + firebaseUser.uid + " is logged in with " + firebaseUser.email);
        } else {
            console.log("User is logged out");
        };
              
      
      
        var authDataCallback = function(firebaseUser) {
            var userId = firebaseUser.uid;
            email = firebaseUser[firebaseUser.email];
            users.child(userId).once("value", function(snapshot){
                var ifExists = snapshot.exists();
                if (ifExists){
                    console.log('User already exists');
                } else {
                    users.child(userId).$add({id: userId, email: email});
                }
            });
        };
            
        
        var signUpWithEmail = function(email, password) {
            authObj.$createUserWithEmailAndPassword(email, password).then(function(firebaseUser) {
                alert("User " + firebaseUser.email + " created successfully");
                authDataCallback(firebaseUser);
                var currentUser = firebaseUser;
            }).catch(function(error) {
                alert("Error: ", error);
            });
            
        }
      
        var signInWithEmail = function(email, password) {
            authObj.$signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
                alert("Signed in as: " + firebaseUser.email);
                authDataCallback(firebaseUser);
                var currentUser = firebaseUser;
                console.log(currentUser.email, firebaseUser.provider);
            
            }).catch(function(error) {
                alert("Authentication failed", error);
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
    .factory('Authentication', ['$firebaseAuth', '$firebaseArray', Authentication]);
})();