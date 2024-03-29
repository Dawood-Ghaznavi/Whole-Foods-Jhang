using wholefoodService as service from '../../catalog-service';


annotate service.PO_ITEM  with {
    EBELP       @(title: '{i18n>itemnumber}');
     ID       @(title: '{i18n>ID}') @UI.Hidden;
    EBELN       @(title: '{i18n>purchaseorderno}') @UI.Hidden;
    WERKS     @(title: '{i18n>plantID}');
    MATNR     @(title: '{i18n>materialID}');
    MENGE     @(title: '{i18n>quantity}');
    createdBy   @(title: '{i18n>createdBy}')   @UI.HiddenFilter: false;
    createdAt   @(title: '{i18n>createdOn}')   @UI.HiddenFilter: false;
    modifiedBy  @(title: '{i18n>modifiedBy}')  @UI.HiddenFilter: false;
    modifiedAt  @(title: '{i18n>modifiedOn}')  @UI.HiddenFilter: false;

}  

annotate service.PO_ITEM @(Common : {
    SideEffects #WERKS : {
        $Type : 'Common.SideEffectsType',
        SourceProperties : ['WERKS_WERKS'],
        TargetEntities   : ['WERKS'],
       
    }
});  

annotate service.PO_ITEM @(Common : {
    SideEffects #MATNR  : {
        $Type : 'Common.SideEffectsType',
        SourceProperties : ['MATNR_MATNR'],
        TargetEntities   : ['MATNR'],
       
    }
});  

annotate service.PO_ITEM @(UI : {
    
    
    LineItem   #iteminp      : {$value : [
        
        {
            $Type             : 'UI.DataField',
            Value             : EBELP,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults]  : {width : 'auto'},
            ![@Common.FieldControl] : #ReadOnly
            
        },
        {
            $Type             : 'UI.DataField',
            Value             : MATNR_MATNR,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults]  : {width : 'auto'},
            
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
            ![@HTML5.CssDefaults]  : {width : 'auto'},
            

            
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
            ![@HTML5.CssDefaults]  : {width : 'auto'},
            
        },
         {
            $Type             : 'UI.DataField',
            Value             : MATNR.UOM,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults]  : {width : 'auto'},
             ![@Common.FieldControl] : #ReadOnly
            
            
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

/*
//annotate service.PO_ITEM   with @(UI: {UpdateHidden : true});

annotate service.PO_ITEM   with @(UI : {HeaderInfo : {
    TypeName       : '{i18n>item}',
   TypeNamePlural : '{i18n>items}',
    //Title          : {Value : EBELP},
    //Description    : {Value : MATNR_MATNR},
    //TypeImageUrl   : 'sap-icon://product',
}});

annotate service.PO_ITEM  with @(UI : {
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
        {Value : EBELP},
        {Value : MATNR_MATNR,
        },
        { Value: MATNR.MAKTX,
         ![@Common.FieldControl] : #ReadOnly},
        {Value : WERKS_WERKS},
        {Value : WERKS.NAME1,
         ![@Common.FieldControl] : #ReadOnly},
        {Value : MENGE},
        {Value : MATNR.UOM,
        ![@Common.FieldControl] : #ReadOnly}

    ]},
    FieldGroup #AdministrativeData : {Data : [
        {Value : createdBy},
        {Value : createdAt},
        {Value : modifiedBy},
        {Value : modifiedAt}
    ]}
});



annotate service.PO_ITEM  with {
    EBELP @Common.FieldControl : #ReadOnly
}
*/

annotate service.PO_ITEM  with {
    MATNR @(Common : {
                ValueListWithFixedValues,
                ValueList : {
                    SearchSupported : true,
                    CollectionPath  : 'LISTMATERIALS',
                    Parameters      : [{
                        $Type             : 'Common.ValueListParameterInOut',
                        LocalDataProperty : MATNR_MATNR,
                        ValueListProperty : 'MATNR'
                    },
                    {
                        $Type   : 'Common.ValueListParameterDisplayOnly',
                        
                        ValueListProperty : 'MAKTX'
                        
                    }
                    ]
                }
                 
            });
};

annotate service.PO_ITEM   with {
    WERKS @(Common : {
                ValueListWithFixedValues,
                ValueList : {
                    SearchSupported : true,
                    CollectionPath  : 'Plants',
                    Parameters      : [{
                        $Type             : 'Common.ValueListParameterInOut',
                        LocalDataProperty : WERKS_WERKS,
                        ValueListProperty : 'WERKS'
                    },
                    {
                        $Type   : 'Common.ValueListParameterDisplayOnly',
                        
                        ValueListProperty : 'NAME1'
                        
                    }
                    ]
                }
                 
            });
};




