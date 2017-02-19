(function() {
    function UserModalCtrl($uibModalInstance, $cookies, Authentication) {

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
          Authentication.signUpWithEmail(this.email1, this.password1);
          $cookies.blocChatCurrentUser = this.email1;
          $uibModalInstance.close();
        }


        this.signIn = function() {
          console.log("signed in " + this.email2);
          Authentication.signInWithEmail(this.email2, this.password2);
          $cookies.blocChatCurrentUser = this.email2;
          $uibModalInstance.close();
        }

        this.signOut = function() {
          Authentication.signOut();
        }
    
      }
    
        
    angular
        .module('blocChat')
        .controller('UserModalCtrl', ['$uibModalInstance', '$cookies', 'Authentication', UserModalCtrl]);
})();

