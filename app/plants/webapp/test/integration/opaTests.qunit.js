sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'plants/test/integration/FirstJourney',
		'plants/test/integration/pages/PlantsList',
		'plants/test/integration/pages/PlantsObjectPage'
    ],
    function(JourneyRunner, opaJourney, PlantsList, PlantsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('plants') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePlantsList: PlantsList,
					onThePlantsObjectPage: PlantsObjectPage
                }
            },
            opaJourney.run
        );
    }
);