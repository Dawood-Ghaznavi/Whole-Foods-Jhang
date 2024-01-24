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
    
    

}
