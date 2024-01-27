using wholefoodService as service from '../../catalog-service';

annotate service.MARD with {
    MATNR       @(title: '{i18n>materialID}');
    WERKS     @(title: '{i18n>plantID}');
    LABST       @(title: '{i18n>unrestrictedstock}');
    UOM         @(title: '{i18n>unitofmeasure}'); 
    createdBy   @(title: '{i18n>createdBy}')   @UI.HiddenFilter: false;
    createdAt   @(title: '{i18n>createdOn}')   @UI.HiddenFilter: false;
    modifiedBy  @(title: '{i18n>modifiedBy}')  @UI.HiddenFilter: false;
    modifiedAt  @(title: '{i18n>modifiedOn}')  @UI.HiddenFilter: false;

}
 @UI.DeleteHidden : true
 
 
 
annotate service.MARD with @(UI : {
    
    SelectionFields     : [
        MATNR_MATNR,
        WERKS_WERKS
        

    
    ],
    LineItem            : {$value : [
        {
            $Type : 'UI.DataField',
            Value : MATNR_MATNR,
            ![@HTML5.CssDefaults] : {width : 'auto'}
        },
        {
            $Type             : 'UI.DataField',
            Value             : WERKS_WERKS,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults] : {width : 'auto'}
        },
        {
            $Type             : 'UI.DataField',
            Value             : LABST,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults] : {width : 'auto'}
        },
        {
            $Type             : 'UI.DataField',
            Value             : MATNR.UOM,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults] : {width : 'auto'},
            
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

annotate service.MARD with @(UI : {HeaderInfo : {
    TypeName       : '{i18n>inventory}',
    TypeNamePlural : '{i18n>inventory}',
    Title          : {Value : MATNR_MATNR},
    Description    : {Value : WERKS_WERKS},
    TypeImageUrl   : 'sap-icon://inventory',
}});

annotate service.MARD with @(UI : {
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
        {Value : MATNR_MATNR},
        {Value : WERKS_WERKS},
        {Value : LABST},
        {Value : MATNR.UOM}
        

    ]},
    FieldGroup #AdministrativeData : {Data : [
        {Value : createdBy},
        {Value : createdAt},
        {Value : modifiedBy},
        {Value : modifiedAt}
    ]}
});
