(function() {
    function UserModalCtrl($uibModalInstance, $cookies) {
    
        this.newUsername = "";
 
/**
@method
@desc saves a new User and close the modal window
param (name)
*/
        this.setUsername = function() {
            $cookies.put('blocChatCurrentUser', newUsername);
            $uibModalInstance.close();
            
        };

    };
    
/* need to prevent blank text area from saving */    
    
        
    angular
        .module('blocChat')
        .controller('UserModalCtrl', ['$uibModalInstance', '$cookies', UserModalCtrl]);
})();

