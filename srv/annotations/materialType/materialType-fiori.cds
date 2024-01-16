using wholefoodService as service from '../../catalog-service';

annotate service.MatTypes with {
    MTART       @(title: '{i18n>ID}') ;
    MTARTTX     @(title: '{i18n>description}');
    createdBy   @(title: '{i18n>createdBy}')   @UI.HiddenFilter: false;
    createdAt   @(title: '{i18n>createdOn}')   @UI.HiddenFilter: false;
    modifiedBy  @(title: '{i18n>modifiedBy}')  @UI.HiddenFilter: false;
    modifiedAt  @(title: '{i18n>modifiedOn}')  @UI.HiddenFilter: false;

}

annotate service.MatTypes with @(UI : {
    SelectionFields     : [
        MTART,
        

    
    ],
    LineItem           : {$value : [
        {
            $Type : 'UI.DataField',
            Value : MTART,
           
            
            
            
        },
        {
            $Type             : 'UI.DataField',
            Value             : MTARTTX,
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
annotate service.MatTypes with @(UI : {HeaderInfo : {
    TypeName       : '{i18n>materialtype}',
    TypeNamePlural : '{i18n>materialtypes}',
    Title          : {Value : MTART},
    Description    : {Value : MTARTTX},
    TypeImageUrl   : 'sap-icon://process',
}});


/**
  **
 *
 * Object Page Facets
 *
  **
 */
annotate service.MatTypes with @(UI : {
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
        {Value : MTART},
        {Value : MTARTTX}
       

    ]},
    FieldGroup #AdministrativeData : {Data : [
        {Value : createdBy},
        {Value : createdAt},
        {Value : modifiedBy},
        {Value : modifiedAt}
    ]}
});

