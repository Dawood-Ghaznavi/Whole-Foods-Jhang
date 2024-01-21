using wholefoodService as service from '../../catalog-service';

annotate service.BPRoles with {
    BPARTNER    @(title: '{i18n>businesspartnerID}');
    BROLES      @(title: '{i18n>roleID}');
    createdBy   @(title: '{i18n>createdBy}')   @UI.HiddenFilter: false;
    createdAt   @(title: '{i18n>createdOn}')   @UI.HiddenFilter: false;
    modifiedBy  @(title: '{i18n>modifiedBy}')  @UI.HiddenFilter: false;
    modifiedAt  @(title: '{i18n>modifiedOn}')  @UI.HiddenFilter: false;

}

annotate service.BPRoles with @(UI : {
    SelectionFields     : [
        BPARTNER_PARTNER,
        

    
    ],
    LineItem           : {$value : [
        {
            $Type : 'UI.DataField',
            Value : BPARTNER_PARTNER,
           
            
            
            
        },
        {
            $Type             : 'UI.DataField',
            Value             : BROLES_ROLE,
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

annotate service.BPRoles with @(UI : {HeaderInfo : {
    TypeName       : '{i18n>businesspartnerroles}',
    TypeNamePlural : '{i18n>businesspartnersroles}',
    Title          : {Value : BPARTNER_PARTNER},
    Description    : {Value : BROLES_ROLE},
    TypeImageUrl   : 'sap-icon://suitcase',
}});

annotate service.BPRoles with @(UI : {
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
        {Value : BPARTNER_PARTNER},
        {Value : BROLES_ROLE}
       

    ]},
    FieldGroup #AdministrativeData : {Data : [
        {Value : createdBy},
        {Value : createdAt},
        {Value : modifiedBy},
        {Value : modifiedAt}
    ]}});

annotate service.BPRoles with {
    BPARTNER @(Common : {
                ValueListWithFixedValues,
                ValueList : {
                    SearchSupported : true,
                    CollectionPath  : 'BPGENERAL',
                    Parameters      : [{
                        $Type             : 'Common.ValueListParameterInOut',
                        LocalDataProperty : BPARTNER_PARTNER,
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

annotate service.BPRoles with {
    BROLES @(Common : {
                ValueListWithFixedValues,
                ValueList : {
                    SearchSupported : true,
                    CollectionPath  : 'Roles',
                    Parameters      : [{
                        $Type             : 'Common.ValueListParameterInOut',
                        LocalDataProperty : BROLES_ROLE,
                        ValueListProperty : 'ROLE'
                    },
                    {
                        $Type   : 'Common.ValueListParameterDisplayOnly',
                        
                        ValueListProperty : 'DESC'
                    }]
                }
                 
            });
};
