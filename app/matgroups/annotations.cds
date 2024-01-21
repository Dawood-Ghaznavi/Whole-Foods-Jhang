using wholefoodService as service from '../../srv/catalog-service';
using from '../../srv/annotations/materialGroup/materialGroup-fiori';



annotate service.MatGroups with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : MATKL,
        },
        {
            $Type : 'UI.DataField',
            Value : MATKLTX,
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : createdAt,
        },
        {
            $Type : 'UI.DataField',
            Value : createdBy,
        },
        {
            $Type : 'UI.DataField',
            Value : modifiedAt,
        },
        {
            $Type : 'UI.DataField',
            Value : modifiedBy,
        },
    ]
);
