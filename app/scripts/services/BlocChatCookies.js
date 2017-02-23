(function() {
    function BlocChatCookies($cookies, $uibModal, User) {
        
        var currentUser = firebase.auth().currentUser;
        
        // change value of currentUser - should reflect firebase CurrentUser
        
        if (!currentUser || currentUser === '') {
            $uibModal.open({
              // require user to enter a user name, no cancel allowed
                templateUrl: '/templates/usermodal.html',
                controller: 'UserModalCtrl',
                controllerAs: 'user',
                size: 'md',
                backdrop: 'static',
                keyboard: false
            })
            
        }
        

    }
    
    angular
        .module('blocChat')
        .run(['$cookies', '$uibModal', 'User', BlocChatCookies]);
})();