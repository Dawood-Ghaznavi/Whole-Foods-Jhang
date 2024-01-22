using wholefoodService as service from '../../catalog-service';

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
            ![@Common.FieldControl] : #ReadOnly
            
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



   


annotate service.PO_ITEM with {
    EBElP       @(title: '{i18n>itemnumber}');
    EBELN       @(title: '{i18n>purchaseordernumber}');
    WERKS     @(title: '{i18n>plantID}');
    MATNR     @(title: '{i18n>materialID}');
    MENGE     @(title: '{i18n>quantity}');
    UOM     @(title: '{i18n>unitofmeasure}');
    createdBy   @(title: '{i18n>createdBy}')   @UI.HiddenFilter: false;
    createdAt   @(title: '{i18n>createdOn}')   @UI.HiddenFilter: false;
    modifiedBy  @(title: '{i18n>modifiedBy}')  @UI.HiddenFilter: false;
    modifiedAt  @(title: '{i18n>modifiedOn}')  @UI.HiddenFilter: false;

}    

annotate service.PO_ITEM with @(UI : {
    
    
    LineItem   #iteminp      : {$value : [
        
        {
            $Type             : 'UI.DataField',
            Value             : EBElP,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults]  : {width : 'auto'}
            
        },
        {
            $Type             : 'UI.DataField',
            Value             : MATNR_MATNR,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults]  : {width : 'auto'}
        },
        {
            $Type             : 'UI.DataField',
            Value             : MATNR.MAKTX,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults]  : {width : 'auto'},
            ![@Common.FieldControl] : #ReadOnly
             
        },
         {
            $Type             : 'UI.DataField',
            Value             : WERKS_WERKS,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults]  : {width : 'auto'}
            
        },
        {
            $Type             : 'UI.DataField',
            Value             : WERKS.NAME1,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults]  : {width : 'auto'},
            ![@Common.FieldControl] : #ReadOnly
            
        },
         {
            $Type             : 'UI.DataField',
            Value             : MENGE,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults]  : {width : 'auto'}
        },
         {
            $Type             : 'UI.DataField',
            Value             : UOM,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults]  : {width : 'auto'}
            
        }
    ]},
    PresentationVariant : {
        SortOrder      : [{
            $Type      : 'Common.SortOrderType',
            Property   : createdAt,
            Descending : false
        }],
        Visualizations : ['@UI.LineItem#iteminp']
    }

    
   
  
});

//annotate service.PO_ITEM with @(UI: {UpdateHidden : true});

annotate service.PO_ITEM with @(UI : {HeaderInfo : {
    TypeName       : '{i18n>item}',
   TypeNamePlural : '{i18n>items}',
    Title          : {Value : EBElP},
    //Description    : {Value : MATNR_MATNR},
    TypeImageUrl   : 'sap-icon://product',
}});

annotate service.PO_ITEM with @(UI : {
    Facets                         : [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>basicInfo}',
            Target : '@UI.FieldGroup#BasicInfo'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>administrativeData}',
            Target : '@UI.FieldGroup#AdministrativeData'
        }
    ],
    FieldGroup #BasicInfo          : {Data : [
        {Value : EBElP},
        {Value : MATNR_MATNR},
        { Value: MATNR.MAKTX,
         ![@Common.FieldControl] : #ReadOnly},
        {Value : WERKS_WERKS},
        {Value : WERKS.NAME1,
         ![@Common.FieldControl] : #ReadOnly},
        {Value : MENGE},
        {Value : UOM}

    ]},
    FieldGroup #AdministrativeData : {Data : [
        {Value : createdBy},
        {Value : createdAt},
        {Value : modifiedBy},
        {Value : modifiedAt}
    ]}
});


annotate service.PO_HEAD with {
    PARTNER @(Common : {
                ValueListWithFixedValues,
                ValueList : {
                    SearchSupported : true,
                    CollectionPath  : 'BPGENERAL',
                    Parameters      : [{
                        $Type             : 'Common.ValueListParameterInOut',
                        LocalDataProperty : PARTNER_PARTNER,
                        ValueListProperty : 'PARTNER'
                    },
                    {
                        $Type   : 'Common.ValueListParameterDisplayOnly',
                        
                        ValueListProperty : 'NAME'
                        
                    }
                    ]
                }
                 
            });
};




















