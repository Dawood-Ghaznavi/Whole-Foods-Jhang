using wholefoodService as service from '../../catalog-service';

annotate service.Roles with {
    ROLE       @(title: '{i18n>ID}') ;
    DESC       @(title: '{i18n>description}');
    createdBy   @(title: '{i18n>createdBy}')   @UI.HiddenFilter: false;
    createdAt   @(title: '{i18n>createdOn}')   @UI.HiddenFilter: false;
    modifiedBy  @(title: '{i18n>modifiedBy}')  @UI.HiddenFilter: false;
    modifiedAt  @(title: '{i18n>modifiedOn}')  @UI.HiddenFilter: false;

}

annotate service.Roles with @(UI : {
    SelectionFields     : [
        ROLE,
        

    
    ],
    LineItem           : {$value : [
        {
            $Type : 'UI.DataField',
            Value : ROLE,
           
            
            
            
        },
        {
            $Type             : 'UI.DataField',
            Value             : DESC,
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

annotate service.Roles with @(UI : {HeaderInfo : {
    TypeName       : '{i18n>businesspartnerroles}',
    TypeNamePlural : '{i18n>businesspartnersroles}',
    Title          : {Value : ROLE},
    Description    : {Value : DESC},
    TypeImageUrl   : 'sap-icon://process',
}});

annotate service.Roles with @(UI : {
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
        {Value : ROLE},
        {Value : DESC}
       

    ]},
    FieldGroup #AdministrativeData : {Data : [
        {Value : createdBy},
        {Value : createdAt},
        {Value : modifiedBy},
        {Value : modifiedAt}
    ]}
});
