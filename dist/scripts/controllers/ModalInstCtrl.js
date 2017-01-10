(function() {
    function ModalInstCtrl($uibModal, $uibModalInst, $scope) {
        
        $scope.newRoom = "";
        
/**
@method
@desc saves a new instance of Room and close the modal window
param (room)
*/
        $scope.createRoom = function(room) {
            var newRoom = Room.addRoom(room);
            $uibModalInst.close(newRoom);
        };

/**
@method
@desc close the modal window without save
*/
        $scope.cancel = function() {
            $uibModalInst.dismiss('cancel');
        };
            
    };
    
        
    
    angular
        .module('blocChat')
        .controller('ModalInstCtrl', ['$scope', 'Room', '$uibModal', ModalInstCtrl,]);
})();