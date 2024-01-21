using wholefoodService as service from '../../catalog-service';


/**
  **
 *
 * Base list
 *
  **
 */


annotate service.Materials with {
    MATNR       @(title: '{i18n>ID}');
    GROUP     @(title: '{i18n>group}');
    TYPE        @(title: '{i18n>type}');
    MAKTX       @(title: '{i18n>description}');
    UOM         @(title: '{i18n>unitofmeasure}');
    createdBy   @(title: '{i18n>createdBy}')   @UI.HiddenFilter: false;
    createdAt   @(title: '{i18n>createdOn}')   @UI.HiddenFilter: false;
    modifiedBy  @(title: '{i18n>modifiedBy}')  @UI.HiddenFilter: false;
    modifiedAt  @(title: '{i18n>modifiedOn}')  @UI.HiddenFilter: false;

}

annotate service.Materials with @(UI : {
    SelectionFields     : [
        MATNR,
        

    
    ],
    LineItem            : {$value : [
        
        {
            $Type             : 'UI.DataField',
            Value             : MATNR,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults] : {width : 'auto'}
        },
        {
            $Type             : 'UI.DataField',
            Value             : GROUP_MATKL,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults] : {width : 'auto'}
        },
        {
            $Type             : 'UI.DataField',
            Value             : TYPE_MTART,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults] : {width : 'auto'}
        },
        {
            $Type             : 'UI.DataField',
            Value             : MAKTX,
            ![@UI.Importance] : #High,
            ![@HTML5.CssDefaults] : {width : 'auto'}
        },
        {
            $Type             : 'UI.DataField',
            Value             : UOM,
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

/**
  **
 *
 * Object Page Header
 *
  **
 */
annotate service.Materials with @(UI : {HeaderInfo : {
    TypeName       : '{i18n>material}',
    TypeNamePlural : '{i18n>materials}',
    Title          : {Value : MATNR},
    Description    : {Value : MAKTX},
    TypeImageUrl   : 'sap-icon://product',
}});

/**
  **
 *
 * Object Page Facets
 *
  **
 */
annotate service.Materials with @(UI : {
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
        {Value : TYPE_MTART},
        {Value : GROUP_MATKL},
        {Value : MAKTX},
        {Value : UOM}
        

    ]},
    FieldGroup #AdministrativeData : {Data : [
        {Value : createdBy},
        {Value : createdAt},
        {Value : modifiedBy},
        {Value : modifiedAt}
    ]}
});

annotate service.Materials with {
    GROUP @(Common : {
                ValueListWithFixedValues,
                ValueList : {
                    SearchSupported : true,
                    CollectionPath  : 'MatGroups',
                    Parameters      : [{
                        $Type             : 'Common.ValueListParameterInOut',
                        LocalDataProperty : GROUP_MATKL,
                        ValueListProperty : 'MATKL'
                    },
                    {
                        $Type   : 'Common.ValueListParameterDisplayOnly',
                        
                        ValueListProperty : 'MATKLTX'
                    }
                    ]
                }
                
                 
                 
            });
};

annotate service.Materials with {
    TYPE @(Common : {
                ValueListWithFixedValues,
                ValueList : {
                    SearchSupported : true,
                    CollectionPath  : 'MatTypes',
                    Parameters      : [{
                        $Type             : 'Common.ValueListParameterInOut',
                        LocalDataProperty : TYPE_MTART,
                        ValueListProperty : 'MTART'
                    },
                    {
                        $Type   : 'Common.ValueListParameterDisplayOnly',
                        
                        ValueListProperty : 'MTARTTX'
                        
                    }
                    ]
                }
                 
            });
};