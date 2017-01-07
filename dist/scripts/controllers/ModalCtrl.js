(function() {
    function ModalCtrl() {
        

        this.open = function(size, parentSelector) {
            var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
            
            var modalInst = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateURL: 'modal.html',
                controller: 'ModalInstCtrl',
                size: size,
                appendTo: parentElem,
                resolve: {
                    items: function() {
                        return this.items;
                            }
                        }
                    });
            };
    
       
        
        }
    };
    
    angular
        .module('blocChat')
        .controller('ModalCtrl', [ModalCtrl]);
})();