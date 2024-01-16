using wholefoodService as service from '../../catalog-service';

annotate service.MatGroups with {
    MATKL       @(title: '{i18n>ID}');
    MATKLTX     @(title: '{i18n>description}');
    createdBy   @(title: '{i18n>createdBy}')   @UI.HiddenFilter: false;
    createdAt   @(title: '{i18n>createdOn}')   @UI.HiddenFilter: false;
    modifiedBy  @(title: '{i18n>modifiedBy}')  @UI.HiddenFilter: false;
    modifiedAt  @(title: '{i18n>modifiedOn}')  @UI.HiddenFilter: false;

}

annotate service.MatGroups with @(UI : {
    SelectionFields     : [
        MATKL,
        

    
    ],
    LineItem            : {$value : [
        {
            $Type : 'UI.DataField',
            Value : MATKL,
        },
        {
            $Type             : 'UI.DataField',
            Value             : MATKLTX,
            ![@UI.Importance] : #High
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


/**
  **
 *
 * Object Page Header
 *
  **
 */
annotate service.MatGroups with @(UI : {HeaderInfo : {
    TypeName       : '{i18n>materialgroup}',
    TypeNamePlural : '{i18n>materialgroups}',
    Title          : {Value : MATKL},
    Description    : {Value : MATKLTX},
    TypeImageUrl   : 'sap-icon://inventory',
}});


/**
  **
 *
 * Object Page Facets
 *
  **
 */
annotate service.MatGroups with @(UI : {
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
        {Value : MATKL},
        {Value : MATKLTX}
       

    ]},
    FieldGroup #AdministrativeData : {Data : [
        {Value : createdBy},
        {Value : createdAt},
        {Value : modifiedBy},
        {Value : modifiedAt}
    ]}
});