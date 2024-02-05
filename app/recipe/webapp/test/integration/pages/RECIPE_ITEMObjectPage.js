sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'recipe',
            componentId: 'RECIPE_ITEMObjectPage',
            contextPath: '/RECIPE_HEAD/RECIPE_ITEM'
        },
        CustomPageDefinitions
    );
});