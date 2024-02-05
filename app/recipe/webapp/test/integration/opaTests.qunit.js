sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'recipe/test/integration/FirstJourney',
		'recipe/test/integration/pages/RECIPE_HEADList',
		'recipe/test/integration/pages/RECIPE_HEADObjectPage',
		'recipe/test/integration/pages/RECIPE_ITEMObjectPage'
    ],
    function(JourneyRunner, opaJourney, RECIPE_HEADList, RECIPE_HEADObjectPage, RECIPE_ITEMObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('recipe') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheRECIPE_HEADList: RECIPE_HEADList,
					onTheRECIPE_HEADObjectPage: RECIPE_HEADObjectPage,
					onTheRECIPE_ITEMObjectPage: RECIPE_ITEMObjectPage
                }
            },
            opaJourney.run
        );
    }
);