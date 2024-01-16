sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'businesspartnerroles/test/integration/FirstJourney',
		'businesspartnerroles/test/integration/pages/BPRolesList',
		'businesspartnerroles/test/integration/pages/BPRolesObjectPage'
    ],
    function(JourneyRunner, opaJourney, BPRolesList, BPRolesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('businesspartnerroles') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheBPRolesList: BPRolesList,
					onTheBPRolesObjectPage: BPRolesObjectPage
                }
            },
            opaJourney.run
        );
    }
);