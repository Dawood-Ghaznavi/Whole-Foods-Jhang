using wholefoodService as service from '../../catalog-service';

/**
  **
 *
 * Base list
 *
  **
 */


annotate service.Plants with {
    WERKS       @(title: '{i18n>plantID}');
    NAME1       @(title: '{i18n>plantname}');
    STRAS       @(title: '{i18n>houseNo}');
    PSTLZ       @(title: '{i18n>postalCode}');
    ORT01       @(title: '{i18n>city}');
    LANDX       @(title: '{i18n>country}');
    CNTACT      @(title: '{i18n>phoneNumber}');
    createdBy   @(title: '{i18n>createdBy}')  @UI.HiddenFilter: false;
    createdAt   @(title: '{i18n>createdOn}')   @UI.HiddenFilter: false;
    modifiedBy  @(title: '{i18n>modifiedBy}')  @UI.HiddenFilter: false;
    modifiedAt  @(title: '{i18n>modifiedOn}')  @UI.HiddenFilter: false;

}

annotate service.Plants with @(UI : {
    SelectionFields     : [
        WERKS,
        NAME1,

    
    ],
    LineItem            : {$value : [
        {
            $Type : 'UI.DataField',
            Value : WERKS,
            
        },
        {
            $Type             : 'UI.DataField',
            Value             : NAME1,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : STRAS,
            ![@UI.Importance] : #High,
        },
        {
            $Type             : 'UI.DataField',
            Value             : PSTLZ,
            ![@UI.Importance] : #High,
        },
        {
            $Type             : 'UI.DataField',
            Value             : ORT01,
            ![@UI.Importance] : #High,
        },
        {
            $Type             : 'UI.DataField',
            Value             : LANDX,
            ![@UI.Importance] : #High,
        },
         {
            $Type             : 'UI.DataField',
            Value             : CNTACT,
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

/**
  **
 *
 * Object Page Header
 *
  **
 */
annotate service.Plants with @(UI : {HeaderInfo : {
    TypeName       : '{i18n>plant}',
    TypeNamePlural : '{i18n>plants}',
    Title          : {Value : WERKS},
    Description    : {Value : NAME1},
    TypeImageUrl   : 'sap-icon://factory',
}});

/**
  **
 *
 * Object Page Facets
 *
  **
 */
annotate service.Plants with @(UI : {
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
        {Value : WERKS},
        {Value : NAME1},
        {Value : STRAS},
        {Value : PSTLZ},
        {Value : ORT01},
        {Value : LANDX},
        {Value : CNTACT}

    ]},
    FieldGroup #AdministrativeData : {Data : [
        {Value : createdBy},
        {Value : createdAt},
        {Value : modifiedBy},
        {Value : modifiedAt}
    ]}
});