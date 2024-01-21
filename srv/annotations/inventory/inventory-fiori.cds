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
        MATNR,
        WERKS
        

    
    ],
    LineItem            : {$value : [
        {
            $Type : 'UI.DataField',
            Value : MATNR,
            ![@HTML5.CssDefaults] : {width : 'auto'}
        },
        {
            $Type             : 'UI.DataField',
            Value             : WERKS,
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
            Value             : UOM,
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
    Title          : {Value : MATNR},
    Description    : {Value : WERKS},
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
        {Value : MATNR},
        {Value : WERKS},
        {Value : LABST},
        {Value : UOM}
        

    ]},
    FieldGroup #AdministrativeData : {Data : [
        {Value : createdBy},
        {Value : createdAt},
        {Value : modifiedBy},
        {Value : modifiedAt}
    ]}
});
