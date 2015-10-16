'use strict';

describe('Operation Detail Controller', function() {
  var scope, rootScope, entity, createController;

  beforeEach(module('sampleapplicationApp'));
  beforeEach(inject(function($rootScope, $controller) {
    rootScope = $rootScope;
    scope = rootScope.$new();
    entity = jasmine.createSpyObj('entity', ['unused']);

    createController = function() {
      return $controller("OperationDetailController", {
        '$scope': scope,
        '$rootScope': rootScope,
        'entity': null,
        'Operation' : null,
        'BankAccount' : null,
        'Label' : null
      });
    };
  }));


  describe('Root Scope Listening', function() {
    it('Unregisters root scope listener upon scope destruction',
      function() {
        var eventType = 'sampleapplicationApp:operationUpdate';

        createController();
        expect(rootScope.$$listenerCount[eventType]).toEqual(1);

        scope.$destroy();
        expect(rootScope.$$listenerCount[eventType]).toBeUndefined();
      });
  });
});
