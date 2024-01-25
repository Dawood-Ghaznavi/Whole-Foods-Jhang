using {managed} from '@sap/cds/common';

namespace wholefood;

context Wholefoods {

    entity Plants : managed {
        key WERKS  : String(4); //Plant ID
            NAME1  : String(30); //Name
            STRAS  : String(45); //House No. & Street
            PSTLZ  : String(10); //Postal/zip code
            ORT01  : String(25); //City
            LANDX  : String(15); //Country
            CNTACT : String(20); //Phone number


    }

    entity Materials : managed {
        key MATNR : String(25); //Material ID
            GROUP : Association to MatGroups; //Material group
            TYPE  : Association to MatTypes; //Material type
            MAKTX : String(40); //Material desciption
            UOM   : String(2); //Unit of measure
    }

    entity MatGroups : managed {

        key MATKL   : String(9); //Material group
            MATKLTX : String(40); //Material group desc
    }

    entity MatTypes : managed {

        key MTART   : String(4); //Material type
            MTARTTX : String(40); //Material type desc
    }

    entity BPGENERAL : managed {
        key PARTNER : String(10); //Business partner ID
            BPTYPE  : Association to BPTYPES; //BP Category
            NAME    : String(50); //BP Name
            STRAS   : String(30); //House No. & Street
            PSTLZ   : String(10); //Postal code
            ORT01   : String(25); //City
            LANDX   : String(15); //Country
            CNTACT  : String(20); //Contact No.


    }

    entity BPTYPES : managed {
        key ID : String(15); //Organization-Person

    }

    entity Roles : managed {
        key ROLE : String(4); //BP Role ID
            DESC : String(30); //Role Description
    }

    entity BPRoles : managed {
       key  BPARTNER:Association to BPGENERAL; //BP Role ID
        key   BROLES:Association to Roles; //Role Description


    }
    entity MARD : managed 
    {
       KEY MATNR : String(18); //Material ID
       KEY WERKS : String(4);  //Plant ID
           LABST : Integer;   //Unrestricted Stock
           UOM : String(2);   //Unit of Measure
           }

     entity PO_ITEM : managed {

         key ID : UUID @Core.Computed : true;     
           EBELP : String(4); //Item Number
              EBELN : Association to PO_HEAD; //Purchasing Document Number
              WERKS : Association to Plants; //Plant ID
              MATNR : Association to Materials; //Material ID
              MENGE : Integer; //PO Quantity
              UOMM : String(2); //Unit of Measure
}      

    entity PO_HEAD : managed {
        key ID : UUID @Core.Computed : true;     
         EBELN : String(10) ; //Purchasing Document Number
            EBELP : Composition of many PO_ITEM on  EBELP.EBELN = $self; //Item Number
            PARTNER : Association to BPGENERAL; //Business Partner ID



    }       


}
