using wholefoodService as service from '../../catalog-service';

annotate service.RECIPE_ITEM with {
    RECIPE      @(title: '{i18n>recipeno}');
    RAWQTY      @(title: '{i18n>quantity}');
    RECIPE_ITM  @(title: '{i18n>item}');
    MATNR       @(title: '{i18n>materialID}');
    createdBy   @(title: '{i18n>createdBy}')   @UI.HiddenFilter: false;
    createdAt   @(title: '{i18n>createdOn}')   @UI.HiddenFilter: false;
    modifiedBy  @(title: '{i18n>modifiedBy}')  @UI.HiddenFilter: false;
    modifiedAt  @(title: '{i18n>modifiedOn}')  @UI.HiddenFilter: false;

}
annotate service.RECIPE_ITEM@(Common : {
    SideEffects #MATNR  : {
        $Type : 'Common.SideEffectsType',
        SourceProperties : ['MATNR_MATNR'],
        TargetEntities   : ['MATNR'],
       
    }
});  

annotate service.RECIPE_ITEM with @(UI: {
    LineItem  #ingtable         : {$value: [

        {
            $Type            : 'UI.DataField',
            Value            : RECIPE_ITM,
            ![@UI.Importance]: #High,
            ![@HTML5.CssDefaults]  : {width : 'auto'},
            ![@Common.FieldControl] : #ReadOnly


        },
        {
            $Type            : 'UI.DataField',
            Value            : MATNR_MATNR,
            ![@UI.Importance]: #High,
            ![@HTML5.CssDefaults]  : {width : 'auto'},

        },
        {
            $Type            : 'UI.DataField',
            Value            : RAWQTY,
            ![@UI.Importance]: #High,
            ![@HTML5.CssDefaults]  : {width : 'auto'},

        },
        {
            $Type            : 'UI.DataField',
            Value            : MATNR.UOM,
            ![@UI.Importance]: #High,
            ![@Common.FieldControl] : #ReadOnly,
            ![@HTML5.CssDefaults]  : {width : 'auto'}

        },
    ]},
    PresentationVariant: {
        SortOrder     : [{
            $Type     : 'Common.SortOrderType',
            Property  : createdAt,
            Descending: false
        }],
        Visualizations: ['@UI.LineItem#ingtable ']
    }
});

annotate service.RECIPE_ITEM with {
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