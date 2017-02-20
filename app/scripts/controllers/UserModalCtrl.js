(function() {
    function UserModalCtrl($uibModalInstance, $cookies, User) {

/**
@method
@desc saves a new User and close the modal window
param (name)
*/
        this.setUsername = function() {
            if (this.newUsername && this.newUsername !== '') {
                $cookies.blocChatCurrentUser = this.newUsername;
                $uibModalInstance.close();
            } else {
                alert("Please enter your username")
            }
        };
           
        
        this.signUp = function() {
          console.log("signed up " + this.email1);
          User.signUpWithEmail(this.email1, this.password1);
            
          $cookies.blocChatCurrentUser = firebase.auth().currentUser;
            
          console.log($cookies.blocChatCurrentUser); // returns the last signed in user, not currently signed up user
            
            $uibModalInstance.close();
        }


        this.signIn = function() {
          console.log("signed in " + this.email2);
          User.signInWithEmail(this.email2, this.password2);
          
            $cookies.blocChatCurrentUser = firebase.auth().currentUser;
          
            $uibModalInstance.close();
        }

        this.signOut = function() {
          User.signOut();
        }
    
      }
    
        
    angular
        .module('blocChat')
        .controller('UserModalCtrl', ['$uibModalInstance', '$cookies', 'User', UserModalCtrl]);
})();

