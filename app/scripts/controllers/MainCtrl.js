(function() {
    function MainCtrl(Room, Message, $uibModal, $cookies) {
        
        this.rooms = Room.all;
        this.currentRoom = "";
        this.messages = "";
        this.activeRoom = false;
        this.content = "";
    
    
        this.open = function() {
            var modalInst = $uibModal.open({
                templateUrl: '/templates/modal.html',
                controller: 'ModalInstCtrl', 
                controllerAs: 'modal'
                });
        };
                
        this.setRoom = function(room) {
            this.currentRoom = room;
            this.messages = Message.getByRoomId(room.$id);
            this.activeRoom = true;
        };
        
        
        this.sendMessage = function() {
            Message.send(this.content, this.currentRoom.$id);
            this.content = "";
        };

    };
 
    
    angular
        .module('blocChat')
        .controller('MainCtrl', ['Room', 'Message', '$uibModal', '$cookies', MainCtrl]);
})();

