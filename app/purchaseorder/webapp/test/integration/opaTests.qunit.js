sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'purchaseorder/test/integration/FirstJourney',
		'purchaseorder/test/integration/pages/PO_HEADList',
		'purchaseorder/test/integration/pages/PO_HEADObjectPage'
    ],
    function(JourneyRunner, opaJourney, PO_HEADList, PO_HEADObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('purchaseorder') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePO_HEADList: PO_HEADList,
					onThePO_HEADObjectPage: PO_HEADObjectPage
                }
            },
            opaJourney.run
        );
    }
);