sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'materialtypes/test/integration/FirstJourney',
		'materialtypes/test/integration/pages/MatTypesList',
		'materialtypes/test/integration/pages/MatTypesObjectPage'
    ],
    function(JourneyRunner, opaJourney, MatTypesList, MatTypesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('materialtypes') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheMatTypesList: MatTypesList,
					onTheMatTypesObjectPage: MatTypesObjectPage
                }
            },
            opaJourney.run
        );
    }
);