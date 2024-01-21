sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'inventory/test/integration/FirstJourney',
		'inventory/test/integration/pages/MARDList',
		'inventory/test/integration/pages/MARDObjectPage'
    ],
    function(JourneyRunner, opaJourney, MARDList, MARDObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('inventory') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheMARDList: MARDList,
					onTheMARDObjectPage: MARDObjectPage
                }
            },
            opaJourney.run
        );
    }
);