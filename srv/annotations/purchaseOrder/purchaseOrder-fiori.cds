using wholefoodService as service from '../../catalog-service';
using from '../PO_ITEM/PO_ITEM-fiori';

annotate service.PO_HEAD with {
    EBELN       @(title: '{i18n>purchaseordernumber}');     
    EBELP       @(title: '{i18n>itemnumber}');
    PARTNER     @(title: '{i18n>businesspartnerid}');
    createdBy   @(title: '{i18n>createdBy}')   @UI.HiddenFilter: false;
    createdAt   @(title: '{i18n>createdOn}')   @UI.HiddenFilter: false;
    modifiedBy  @(title: '{i18n>modifiedBy}')  @UI.HiddenFilter: false;
    modifiedAt  @(title: '{i18n>modifiedOn}')  @UI.HiddenFilter: false;

}

annotate service.PO_HEAD with @(UI : {
    SelectionFields     : [
        EBELN,
        PARTNER_PARTNER
        

    
    ],
    LineItem            : {$value : [
        
        {
            $Type             : 'UI.DataField',
            Value             : EBELN,
            ![@UI.Importance] : #High,
            
            
        },
        {
            $Type             : 'UI.DataField',
            Value             : PARTNER_PARTNER,
            ![@UI.Importance] : #High,
            
        }
    ]},
    PresentationVariant : {
        SortOrder      : [{
            $Type      : 'Common.SortOrderType',
            Property   : createdAt,
            Descending : false
        }],
        Visualizations : ['@UI.LineItem']
    }
});

annotate service.PO_HEAD with @(UI : {HeaderInfo : {
    TypeName       : '{i18n>purchaseorder}',
    TypeNamePlural : '{i18n>purchaseorders}',
    Title          : {Value : EBELN},
    Description    : {Value : PARTNER_PARTNER},
    TypeImageUrl   : 'sap-icon://product',
}});

annotate service.PO_HEAD with @(UI : {
    Facets                         : [
         {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>vendor}',
            Target : '@UI.FieldGroup#VENDOR'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>items}',
            Target : 'EBELP/@UI.LineItem#iteminp'
        }
    ],
    FieldGroup #VENDOR         : {Data : [
        {Value : PARTNER_PARTNER},
        

    ]}});


annotate service.PO_HEAD with {
    EBELN @Common.FieldControl : #ReadOnly
}
   




annotate service.PO_HEAD with {
    PARTNER @(Common : {
                ValueListWithFixedValues,
                ValueList : {
                    SearchSupported : true,
                    CollectionPath  : 'LISTROLE',
                    Parameters      : [{
                        $Type             : 'Common.ValueListParameterOut',
                        LocalDataProperty : PARTNER_PARTNER,
                        ValueListProperty : 'BPARTNER_PARTNER'
                    }
                    ,
                    {
                        $Type   : 'Common.ValueListParameterDisplayOnly',
                        
                        ValueListProperty : 'NAME'
                        
                   } 
                   

                    ]
                }
                 
            });
};

annotate service.PO_HEAD with @(UI: {UpdateHidden : true});

annotate service.PO_HEAD with {
    
    PARTNER @(Common : {Text : {
        $value                 : PARTNER.NAME,
        ![@UI.TextArrangement] : #TextLast
    }})
	
}





















