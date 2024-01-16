sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'businesspartners/test/integration/FirstJourney',
		'businesspartners/test/integration/pages/BPGENERALList',
		'businesspartners/test/integration/pages/BPGENERALObjectPage'
    ],
    function(JourneyRunner, opaJourney, BPGENERALList, BPGENERALObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('businesspartners') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheBPGENERALList: BPGENERALList,
					onTheBPGENERALObjectPage: BPGENERALObjectPage
                }
            },
            opaJourney.run
        );
    }
);