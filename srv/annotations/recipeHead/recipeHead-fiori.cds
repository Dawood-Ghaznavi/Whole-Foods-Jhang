using wholefoodService as service from '../../catalog-service';
using from '../recipeItem/recipeItem-fiori';

annotate service.RECIPE_HEAD with {
    RECIPE      @(title: '{i18n>recipeno}');
    RECIPEQTY   @(title: '{i18n>quantity}');
    RECIPE_ITM  @(title: '{i18n>item}');
    MATN     @(title: '{i18n>materialID}');
    MAT  @(title: '{i18n>materialID}') @UI.Hidden;
    ID @(title: '{i18n>materialID}') @UI.Hidden;
    MATNR       @(title: '{i18n>materialID}') @UI.HiddenFilter: true;
    createdBy   @(title: '{i18n>createdBy}')   @UI.HiddenFilter: false;
    createdAt   @(title: '{i18n>createdOn}')   @UI.HiddenFilter: false;
    modifiedBy  @(title: '{i18n>modifiedBy}')  @UI.HiddenFilter: false;
    modifiedAt  @(title: '{i18n>modifiedOn}')  @UI.HiddenFilter: false;

}

annotate service.RECIPE_HEAD @(Common : {
    SideEffects #MATNR  : {
        $Type : 'Common.SideEffectsType',
        SourceProperties : ['MATNR_MATNR'],
        TargetEntities   : ['MATNR'],
       
    }
});  

annotate service.RECIPE_HEAD with @(UI: {
    SelectionFields    : [
        RECIPE,
        MATN_MATNR


    ],
    LineItem           : {$value: [

        {
            $Type            : 'UI.DataField',
            Value            : RECIPE,
            ![@UI.Importance]: #High,
            ![@HTML5.CssDefaults]  : {width : 'auto'}

        },
        
        {
            $Type            : 'UI.DataField',
            Value            : MATN_MATNR,
            ![@UI.Importance]: #High,
            ![@HTML5.CssDefaults]  : {width : 'auto'},
        },
        {
            $Type            : 'UI.DataField',
            Value            : MATN.MAKTX,
            ![@UI.Importance]: #High,
            ![@HTML5.CssDefaults]  : {width : 'auto'},
        },
        {
            $Type            : 'UI.DataField',
            Value            : RECIPEQTY,
            ![@UI.Importance]: #High,
            ![@Common.FieldControl] : #ReadOnly,
            ![@HTML5.CssDefaults]  : {width : 'auto'}

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
        Visualizations: ['@UI.LineItem']
    }
});

annotate service.RECIPE_HEAD with @(UI : {HeaderInfo : {
    TypeName       : '{i18n>recipe}',
    TypeNamePlural : '{i18n>recipes}',
    Title          : {Value : RECIPE},
    Description    : {Value : MATNR.MAKTX},
    TypeImageUrl   : 'sap-icon://product',
}});

annotate service.RECIPE_HEAD with @(UI : {
    Facets                         : [
         {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>recipe}',
            Target : '@UI.FieldGroup#RECIPE'
        },
       {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>ingredients}',
            Target : 'RECIPE_ITM/@UI.LineItem#ingtable'
        }
    ],
    FieldGroup #RECIPE         : {Data : [
        {Value : MATNR_MATNR},
        {Value : RECIPEQTY,
        ![@Common.FieldControl] : #ReadOnly},
        {Value : MATNR.UOM,
        ![@Common.FieldControl] : #ReadOnly}
        

    ]}});

annotate service.RECIPE_HEAD  with {
    MATNR @(Common : {
                ValueListWithFixedValues,
                ValueList : {
                    SearchSupported : true,
                    CollectionPath  : 'LISTFINISHED',
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

annotate service.RECIPE_HEAD  with {
    MATN @(Common : {
                ValueListWithFixedValues,
                ValueList : {
                    SearchSupported : true,
                    CollectionPath  : 'LISTFILTER',
                    Parameters      : [{
                        $Type             : 'Common.ValueListParameterInOut',
                        LocalDataProperty : MATN_MATNR,
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
