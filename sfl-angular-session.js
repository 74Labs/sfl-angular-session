'use strict';

angular.module('sfl.session', [])

.service('sflSession', function ($log, $rootScope, $parse) {

    var self = this;
    
    self.prefix = 'app';
    
    self.setAll = function(properties) {
        $log.debug('Session', 'set:', properties, 'at:', $rootScope[self.prefix]);
        $rootScope[self.prefix] = properties;
    }
    
    self.set = function(property, value) {
        $log.debug('Session', 'set:', property, 'to:', value, 'at:', $rootScope[self.prefix]);
        $rootScope[self.prefix][property] = value;
    };
    
    self.get = function(property) {
        return $rootScope[self.prefix][property];    
    };

    self.restore = function () {

        $log.debug('Session', 'restore');

        var data = JSON.parse(localStorage.getItem('sfl:session'));
        $rootScope[self.prefix] = data || {};
        
    };

    self.save = function () {

        $log.debug('Session', 'save');

        var data = $rootScope[self.prefix];
        localStorage.setItem('sfl:session', JSON.stringify(data));
        
    };

    self.clear = function () {

        $log.debug('Session', 'clear');

        localStorage.clear();
        $rootScope[self.prefix] = {};

    };

});
