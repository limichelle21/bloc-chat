(function() {
    function MainCtrl(Room, $uibModal) {
        this.rooms = Room.all;
    
        this.open = function() {
        var modalInst = $uibModal.open({
            templateUrl: '/templates/modal.html',
            controller: 'ModalInstCtrl'
            });
        };
    
        /**
        template Url linking back to modal.html, the same place from which it is being called - causing errors?
        */
    
    };
 
    
    angular
        .module('blocChat')
        .controller('MainCtrl', ['Room', '$uibModal', MainCtrl]);
})();