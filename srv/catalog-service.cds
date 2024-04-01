using wholefood from '../db/data-model';

service wholefoodService {
    @odata.draft.enabled: true
    entity Plants    as projection on wholefood.Wholefoods.Plants;
    @odata.draft.enabled: true
    entity Materials as projection on wholefood.Wholefoods.Materials;
    @odata.draft.enabled: true
    entity MatGroups as projection on wholefood.Wholefoods.MatGroups;
    @odata.draft.enabled: true
    entity MatTypes as projection on wholefood.Wholefoods.MatTypes;
    @odata.draft.enabled: true
    entity BPGENERAL as projection on wholefood.Wholefoods.BPGENERAL;
    entity BPTYPES as projection on wholefood.Wholefoods.BPTYPES;
    entity Roles as projection on wholefood.Wholefoods.Roles;
    @odata.draft.enabled: true
    entity BPRoles as projection on wholefood.Wholefoods.BPRoles;

    entity MARD as projection on wholefood.Wholefoods.MARD;
    @odata.draft.enabled: true
    entity PO_HEAD as projection on wholefood.Wholefoods.PO_HEAD;
  
    entity PO_ITEM as projection on wholefood.Wholefoods.PO_ITEM;

    entity LISTROLE as select from BPRoles{key BPARTNER ,key BROLES,BPARTNER.NAME as NAME} where BROLES.ROLE = 'VEND';

     entity LISTMATERIALS as select from Materials {key MATNR,TYPE,MAKTX,UOM  }where TYPE.MTART = 'ROH';

    @odata.draft.enabled: true
     entity RECIPE_HEAD as projection on wholefood.Wholefoods.RECIPE_HEAD;

      entity RECIPE_ITEM as projection on wholefood.Wholefoods.RECIPE_ITEM;

    //entity LISTFINISHED as select from Materials  left outer join RECIPE_HEAD  on Materials.MATNR != RECIPE_HEAD.MAT {Materials.MATNR,MAKTX,Materials.TYPE} where TYPE.MTART = 'FERT' ;
      
    
    entity LISTFINISHED as select from Materials where ((Materials.MATNR not in (select MAT from RECIPE_HEAD)) and (TYPE.MTART = 'FERT'));
    entity LISTFILTER as select from Materials where TYPE.MTART = 'FERT';

}
