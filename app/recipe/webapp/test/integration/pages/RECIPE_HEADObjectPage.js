sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'recipe',
            componentId: 'RECIPE_HEADObjectPage',
            contextPath: '/RECIPE_HEAD'
        },
        CustomPageDefinitions
    );
});