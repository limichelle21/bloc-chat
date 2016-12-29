(function() {
    function MainCtrl(Room) {
        this.rooms = Room.all;
    };
    
    angular
        .module('blocChat')
        .controller('MainCtrl', ['Room', MainCtrl]);
})();