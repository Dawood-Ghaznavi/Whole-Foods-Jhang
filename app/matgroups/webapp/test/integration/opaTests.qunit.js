sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'matgroups/test/integration/FirstJourney',
		'matgroups/test/integration/pages/MatGroupsList',
		'matgroups/test/integration/pages/MatGroupsObjectPage'
    ],
    function(JourneyRunner, opaJourney, MatGroupsList, MatGroupsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('matgroups') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheMatGroupsList: MatGroupsList,
					onTheMatGroupsObjectPage: MatGroupsObjectPage
                }
            },
            opaJourney.run
        );
    }
);