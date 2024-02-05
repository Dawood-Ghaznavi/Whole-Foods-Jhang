sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'recipe',
            componentId: 'RECIPE_HEADList',
            contextPath: '/RECIPE_HEAD'
        },
        CustomPageDefinitions
    );
});