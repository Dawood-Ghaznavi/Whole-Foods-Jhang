using wholefoodService as service from '../../catalog-service';

annotate service.BPGENERAL with {
    PARTNER       @(title: '{i18n>ID}');
    BPTYPE       @(title: '{i18n>category}');
    NAME         @(title: '{i18n>name}');
    STRAS       @(title: '{i18n>houseNo}');
    PSTLZ       @(title: '{i18n>postalCode}');
    ORT01       @(title: '{i18n>city}');
    LANDX       @(title: '{i18n>country}');
    CNTACT      @(title: '{i18n>phoneNumber}');
    createdBy   @(title: '{i18n>createdBy}')   @UI.HiddenFilter: false;
    createdAt   @(title: '{i18n>createdOn}')   @UI.HiddenFilter: false;
    modifiedBy  @(title: '{i18n>modifiedBy}')  @UI.HiddenFilter: false;
    modifiedAt  @(title: '{i18n>modifiedOn}')  @UI.HiddenFilter: false;

}

annotate service.BPGENERAL with @(UI : {
    SelectionFields     : [
        PARTNER,
        NAME,
        

    
    ],
    LineItem            : {$value : [
        {
            $Type : 'UI.DataField',
            Value : PARTNER,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults] : {width : 'auto'}
        },
        {
            $Type             : 'UI.DataField',
            Value             : BPTYPE_ID,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults] : {width : 'auto'}
        },
        {
            $Type             : 'UI.DataField',
            Value             : NAME,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults] : {width : 'auto'}
        },
        {
            $Type             : 'UI.DataField',
            Value             : STRAS,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults] : {width : 'auto'}
        },
        {
            $Type             : 'UI.DataField',
            Value             : PSTLZ,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults] : {width : 'auto'}
        },
        {
            $Type             : 'UI.DataField',
            Value             : ORT01,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults] : {width : 'auto'}
        },
        {
            $Type             : 'UI.DataField',
            Value             : LANDX,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults] : {width : 'auto'}
        },
         {
            $Type             : 'UI.DataField',
            Value             : CNTACT,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults] : {width : 'auto'}
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

annotate service.BPGENERAL with @(UI : {HeaderInfo : {
    TypeName       : '{i18n>businesspartner}',
    TypeNamePlural : '{i18n>businesspartners}',
    Title          : {Value :PARTNER},
    Description    : {Value :NAME},
    TypeImageUrl   : 'sap-icon://product',
}});

annotate service.BPGENERAL with @(UI : {
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
        {Value : ORT01},
        {Value : BPTYPE_ID},
        {Value : NAME},
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

annotate service.BPGENERAL with {
    BPTYPE @(Common : {
                ValueListWithFixedValues,
                ValueList : {
                    SearchSupported : true,
                    CollectionPath  : 'BPTYPES',
                    Parameters      : [{
                        $Type             : 'Common.ValueListParameterInOut',
                        LocalDataProperty : BPTYPE_ID,
                        ValueListProperty : 'ID'
                    }]
                }
                 
            });
};