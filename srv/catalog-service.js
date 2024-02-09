let cds = require('@sap/cds');
module.exports = function (){
   
    const { PO_HEAD} = this.entities()
    const { PO_ITEM} = this.entities()
    const {MARD,RECIPE_HEAD,RECIPE_ITEM,Materials} = this.entities()

       this.before ('CREATE','PO_HEAD', async (req)=>{
        if(req.data.PARTNER_PARTNER == null){
                req.error({code :   409,message :   `Business Partner cannot be Null`, target :  'PARTNER_PARTNER'})
                                            }

        for(let x = 0 ; x < req.data.EBELP.length ; x++){
                
            if(req.data.EBELP[x].WERKS_WERKS == null){
                
                req.error({ code : 409, message : `Plant ID for Item ${req.data.EBELP[x].EBELP} cannot be Null`, target : `EBELP/WERKS_WERKS`})
                                                     }
            if(req.data.EBELP[x].MATNR_MATNR == null){
                
                req.error({ code : 409, message : `Material ID for Item ${req.data.EBELP[x].EBELP} cannot be Null`, target : `EBELP.MATNR_MATNR`})
                                                    }
            if(req.data.EBELP[x].MENGE == null){
                
                req.error({ code : 409, message : `Quantity for Item ${req.data.EBELP[x].EBELP} cannot be Null`, target : `EBELP[0].MENGE`})
                                                    }
            else{
                if(req.data.EBELP[x].MENGE < 1){
                    req.error({ code : 409, message : `Quantity for Item ${req.data.EBELP[x].EBELP} should be greater than 0`, target : `EBELP.MENGE`})  
                    }
                else if(req.data.EBELP[x].MENGE > 1000){
                    req.error({ code : 409, message : `Quantity for Item ${req.data.EBELP[x].EBELP} should be less than 1000`, target : `EBELP.MENGE`})

                }

            }                                                                                  

                                                             }
        if(req.errors)  {
            req.reject()
                        }
        
        let temp 
        let HeadID = '0'
        let numEBELN =[]
        let head_val = await SELECT.from("wholefoodService.PO_HEAD").columns('EBELN');
        
        if(head_val.length > 0){
            
           for(let a = 0 ; a < head_val.length ; a++){
            numEBELN[a] = parseInt(head_val[a].EBELN) }
            temp = numEBELN.sort(function(a, b){return a-b})
            
            HeadID = temp[temp.length - 1]
            HeadID = HeadID + 1
            temp = String(HeadID).padStart(10,'0')
            req.data.EBELN = temp

        }
        else {
            HeadID = parseInt(HeadID)
            HeadID = HeadID + 1
            temp = String(HeadID).padStart(10,'0') 
            req.data.EBELN = temp

        }
        req.notify(`Purchase Order ${temp} Created`)
        let lenItem = req.data.EBELP.length
        const arrItem = []
        let mID , plID, mng , IT_ID, PO_ID
        let similarityIndex
        for (let x = 0 ; x <lenItem ; x++){
           
            mID = req.data.EBELP[x].MATNR_MATNR
            plID = req.data.EBELP[x].WERKS_WERKS
            mng = req.data.EBELP[x].MENGE
            IT_ID = req.data.EBELP[x].ID
            PO_ID = req.data.ID

             similarityIndex = arrItem.findIndex(function (material) {return (material.MATNR === mID) && (material.WERKS === plID)})

             if(similarityIndex == -1){
                const obj = {MATNR_MATNR : mID ,WERKS_WERKS :plID , LABST :mng , ITEM : IT_ID, PURCHASE : PO_ID}
                arrItem.push(obj)
             }
                else {
                    arrItem[similarityIndex].LABST = arrItem[similarityIndex].LABST + mng

                }
    
     }
     let arrItemlen = arrItem.length
     let test
     
     for(let y = 0 ; y < arrItemlen ; y++ ){
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        test =  await SELECT.from("wholefoodService.MARD").where({ WERKS_WERKS : arrItem[y].WERKS_WERKS ,MATNR_MATNR : arrItem[y].MATNR_MATNR });
       console.log(arrItem[y].WERKS + " " + arrItem[y].MATNR_MATNR)
        console.log(test.length)
        console.log(JSON.stringify(test))
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
                if(test.length < 1) {
                    console.log("BBBBBBBBBBBFFFFFFFFFFFFFRRRRRRRRRRRRR")
                    await INSERT(arrItem[y]).into(MARD);
                    console.log("AAAAAAAAAAAAAAATTTTTTTTTTRRRRRRRRRr")
                }
                else {
                    console.log("###################################")
                    await UPDATE(MARD).set({ LABST: { '+=': arrItem[y].LABST }}).where({ WERKS_WERKS : arrItem[y].WERKS_WERKS ,MATNR_MATNR : arrItem[y].MATNR_MATNR  });
                    console.log("44444444444444444444444444444444444")
                }
               
    }

        
        console.log(arrItem)
       
       
       
        
        
        
       }) 

   
      

   this.before ('CREATE', 'PO_ITEM.drafts',async (req)=>{
       
    let ITEMID = '0'
        let h_id = req.data.EBELN_ID
        
        let itemdraft_val = await SELECT.from("wholefoodService.PO_ITEM.drafts").columns('EBELP').where({EBELN_ID : h_id});
        if(itemdraft_val.length > 0){
            itemdraft_val.sort(function(a,b){ a.EBELP - b.EBELP})
            ITEMID = itemdraft_val[itemdraft_val.length - 1].EBELP
        ITEMID = parseInt(ITEMID) 
        if(ITEMID > 90){
            return req.error("Purchase order can't have more than 10 Items")
        }
        ITEMID = ITEMID + 10
         req.data.EBELP = String(ITEMID).padStart(4,'0')  } 
       else {
        ITEMID = parseInt(ITEMID) 
        ITEMID = ITEMID + 10
        req.data.EBELP = String(ITEMID).padStart(4,'0') 

       }
      
        
        
       
        
    })

/*
    this.before ('UPDATE','PO_ITEM.drafts',async (req)=>{
        
      
            if(req.data){
                

                if(req.data.MENGE != undefined){
                    console.log("DRAFS UPDATE" + JSON.stringify(req.data))
                    if(req.data.MENGE < 1 ){
                        //let item_error = await SELECT.from("wholefoodService.PO_ITEM.drafts").columns('EBELP').where({ID : req.data.ID});
                     req.error({ code : 409, message : `Quantity entered should be greater than zero`, target : 'MENGE'})}
                
                else if(req.data.MENGE > 1000){
                     req.error({ code : 409, message : `Quantity entered should be less than 1000`, target : 'MENGE'})

                }
            
            }
                    
              // else if (req.data.MATNR_MATNR) {
               // let unit = await SELECT.one.from("wholefoodService.Materials").columns('UOM').where({MATNR : req.data.MATNR_MATNR});
               //  await UPDATE("wholefoodService.PO_ITEM.drafts").set({ UOMM: unit.UOM }).where({ ID: req.data.ID });
                
             //  }
                
                
                
                }
        
                
       
        
    }) 
   */  
    
   
    this.before ('UPDATE','PO_HEAD', async (req)=>{

        for(let x = 0 ; x < req.data.EBELP.length ; x++){

            if(req.data.EBELP[x].MENGE == null){
                
                req.error({ code : 409, message : `Quantity for Item ${req.data.EBELP[x].EBELP} cannot be Null`, target : `EBELP[0].MENGE`})
                                                    }
            else{
                if(req.data.EBELP[x].MENGE < 1){
                    req.error({ code : 409, message : `Quantity for Item ${req.data.EBELP[x].EBELP} should be greater than 0`, target : `EBELP.MENGE`})  
                    }
                else if(req.data.EBELP[x].MENGE > 1000){
                    req.error({ code : 409, message : `Quantity for Item ${req.data.EBELP[x].EBELP} should be less than 1000`, target : `EBELP.MENGE`})

                }

            }     
    }

        if(req.errors)  {
            req.reject()
                        }

        let POitems =  await SELECT.from("wholefoodService.PO_ITEM").where({EBELN_ID: req.data.ID});
        let POitemsLEN = POitems.length
        
       let reqItems = req.data.EBELP
       let reqdelLength = req.data.EBELP.length
       let count 
       
       for(let x = 0 ; x < POitemsLEN ; x++){
        count = 0
            for(let y = 0; y < reqdelLength ; y++){

        if(POitems[x].ID == reqItems[y].ID){
            break
        }
          count = count + 1
          console.log(POitems[x].ID + "    OOOOOOOOOOOOOO   " + reqItems[y].ID  + "     OOOOO     "  + count  + " OOOO  " + reqdelLength)
        if(count == reqdelLength){
            let MardItm = await SELECT.one.from("wholefoodService.MARD").columns('MATNR_MATNR','WERKS_WERKS','LABST').where({WERKS_WERKS: POitems[x].WERKS_WERKS,MATNR_MATNR : POitems[x].MATNR_MATNR});
            if(MardItm.LABST === POitems[x].MENGE){
                await DELETE.from("wholefoodService.MARD").where({ WERKS_WERKS: MardItm.WERKS_WERKS, MATNR_MATNR : MardItm.MATNR_MATNR });

            }
            else{

                await UPDATE(MARD).set({ LABST: { '-=': POitems[x].MENGE}}).where({ WERKS_WERKS :  MardItm.WERKS_WERKS,MATNR_MATNR :  MardItm.MATNR_MATNR  });   

            }
            
        }


            }
}
if(reqdelLength < 1){

    for (let x = 0 ; x< POitems.length ; x++){
        let MardItm = await SELECT.one.from("wholefoodService.MARD").columns('MATNR_MATNR','WERKS_WERKS','LABST').where({WERKS_WERKS: POitems[x].WERKS_WERKS,MATNR_MATNR : POitems[x].MATNR_MATNR});
            if(MardItm.LABST === POitems[x].MENGE){
                await DELETE.from("wholefoodService.MARD").where({ WERKS_WERKS: MardItm.WERKS_WERKS, MATNR_MATNR : MardItm.MATNR_MATNR });

            }
            else{

                await UPDATE(MARD).set({ LABST: { '-=': POitems[x].MENGE}}).where({ WERKS_WERKS :  MardItm.WERKS_WERKS,MATNR_MATNR :  MardItm.MATNR_MATNR  });   

            }
}}

let test
let newItem 
let check
for (let x = 0 ; x < req.data.EBELP.length ; x++ ){
check =await SELECT.one.from("wholefoodService.PO_ITEM").where({ID : reqItems[x].ID});

if(check === null){
    test =  await SELECT.one.from("wholefoodService.MARD").where({ WERKS_WERKS : reqItems[x].WERKS_WERKS ,MATNR_MATNR : reqItems[x].MATNR_MATNR });
    console.log(reqItems[x].MATNR_MATNR + "Does mard contain this ITEM " + test === null)
    if(test === null){
       newItem =  {MATNR_MATNR : reqItems[x].MATNR_MATNR ,WERKS_WERKS : reqItems[x].WERKS_WERKS, LABST : reqItems[x].MENGE , ITEM : reqItems[x].ID, PURCHASE : reqItems[x].EBELN_ID}
       await INSERT(newItem).into(MARD);
    }
    else{
        await UPDATE(MARD).set({ LABST: { '+=': reqItems[x].MENGE }}).where({ WERKS_WERKS : reqItems[x].WERKS_WERKS ,MATNR_MATNR : reqItems[x].MATNR_MATNR  });
 }
}
else{
        if(reqItems[x].WERKS_WERKS != check.WERKS_WERKS || reqItems[x].MATNR_MATNR != check.MATNR_MATNR || reqItems[x].MENGE != check.MENGE){
            test =  await SELECT.one.from("wholefoodService.MARD").where({ WERKS_WERKS : check.WERKS_WERKS ,MATNR_MATNR : check.MATNR_MATNR });
            if(test !== null){
                if(check.MENGE === test.LABST){
                    await DELETE.from("wholefoodService.MARD").where({ WERKS_WERKS: check.WERKS_WERKS, MATNR_MATNR : check.MATNR_MATNR });
                }
                else{
                    await UPDATE(MARD).set({ LABST: { '-=': check.MENGE }}).where({ WERKS_WERKS : check.WERKS_WERKS ,MATNR_MATNR : check.MATNR_MATNR  });
                }  }
            let createNew = await SELECT.one.from("wholefoodService.MARD").where({ WERKS_WERKS : reqItems[x].WERKS_WERKS ,MATNR_MATNR : reqItems[x].MATNR_MATNR });
            if(createNew === null) {
                newItem =  {MATNR_MATNR : reqItems[x].MATNR_MATNR ,WERKS_WERKS : reqItems[x].WERKS_WERKS, LABST : reqItems[x].MENGE , ITEM : reqItems[x].ID, PURCHASE : reqItems[x].EBELN_ID}
                await INSERT(newItem).into(MARD);
            }
            else{
                await UPDATE(MARD).set({ LABST: { '+=': reqItems[x].MENGE }}).where({ WERKS_WERKS : reqItems[x].WERKS_WERKS ,MATNR_MATNR : reqItems[x].MATNR_MATNR  });
         }



        }
}


}





})
    
    this.before ('DELETE','PO_HEAD', async (req)=>{
      let Po_ID = req.data.ID
      let ItemItm = await SELECT.from("wholefoodService.PO_ITEM").columns('MATNR_MATNR','WERKS_WERKS','MENGE').where({EBELN_ID: Po_ID});
      
      for (let x = 0 ; x< ItemItm.length ; x++){
        let MardItm = await SELECT.one.from("wholefoodService.MARD").columns('MATNR_MATNR','WERKS_WERKS','LABST').where({WERKS_WERKS: ItemItm[x].WERKS_WERKS,MATNR_MATNR : ItemItm[x].MATNR_MATNR});
        console.log("mard item is " + (MardItm === null))
        if(MardItm !== null){
            
        
       
            if(MardItm.LABST === ItemItm[x].MENGE){
                await DELETE.from("wholefoodService.MARD").where({ WERKS_WERKS: MardItm.WERKS_WERKS, MATNR_MATNR : MardItm.MATNR_MATNR });

            }
            else{
                await UPDATE(MARD).set({ LABST: { '-=': ItemItm[x].MENGE}}).where({ WERKS_WERKS :  MardItm.WERKS_WERKS,MATNR_MATNR :  MardItm.MATNR_MATNR  });   

            } }


        }
      
       


})


//this.before ('error','wholefoodService.PO_ITEM',async (req)=>{
//
  //  for(let x=0 ; x < req.details.length; x++){
//if(req.details[x].element === "WERKS_WERKS"){
 //   let strr = req.details[x].target.slice(12,48)
//console.log("yyyyeeeessss")
//   let itNUM = await SELECT.from("wholefoodService.PO_ITEM.drafts")
//   console.log(req.details[x].message + "   OOOOOOOOOOOOOOOO   " + strr + itNUM)
//   req.details[x].message = `Enter Plant ID for item No. ${itNUM}`
//}
//
//
//
  //  }
//})
    
 
this.before ('CREATE','RECIPE_HEAD', async (req)=>{

    if(req.data.MATNR_MATNR == null){
        req.error({code :   409,message :   `Material ID for Recipe cannot be Null`, target :  'MATNR_MATNR'})
                                    }                                


    let temp 
    let HeadID = '0'
    let numEBELN =[]
    let head_val = await SELECT.from("wholefoodService.RECIPE_HEAD").columns('RECIPE');
    console.log(JSON.stringify(head_val))
    if(head_val.length > 0){
        
       for(let a = 0 ; a < head_val.length ; a++){
        numEBELN[a] = parseInt(head_val[a].RECIPE) }
        temp = numEBELN.sort(function(a, b){return a-b})
        
        HeadID = temp[temp.length - 1]
        HeadID = HeadID + 1
        temp = String(HeadID).padStart(10,'0')
        req.data.RECIPE = temp

    }
    else {
        HeadID = parseInt(HeadID)
        HeadID = HeadID + 1
        temp = String(HeadID).padStart(10,'0') 
        req.data.RECIPE = temp

    }
    //await DELETE.from("wholefoodService.LISTFINISHED").where({ MATNR : req.data.MATNR_MATNR });
    //await SELECT.from("wholefoodService.LISTFINISHED.drafts");
    
    req.data.MAT = req.data.MATNR_MATNR
    req.data.MATN_MATNR = req.data.MATNR_MATNR

})

this.before ('CREATE', 'RECIPE_ITEM.drafts',async (req)=>{
       
    let ITEMID = '0'
        let h_id = req.data.RECIPE_ID
        
        let itemdraft_val = await SELECT.from("wholefoodService.RECIPE_ITEM.drafts").columns('RECIPE_ITM').where({RECIPE_ID: h_id});
        if(itemdraft_val.length > 0){
            itemdraft_val.sort(function(a,b){ a.RECIPE_ITM - b.RECIPE_ITM})
            ITEMID = itemdraft_val[itemdraft_val.length - 1].RECIPE_ITM
        ITEMID = parseInt(ITEMID) 
        ITEMID = ITEMID + 10
         req.data.RECIPE_ITM = String(ITEMID).padStart(4,'0')  } 

       else {
        ITEMID = parseInt(ITEMID) 
        ITEMID = ITEMID + 10
        req.data.RECIPE_ITM = String(ITEMID).padStart(4,'0') 

       }
      
        
        
       
        
    })
/*
    this.before ('DELETE','RECIPE_HEAD', async (req)=>{
        
        let mtnr = await SELECT.one.from("wholefoodService.RECIPE_HEAD").columns('MATNR_MATNR').where({ID: req.data.ID});
        console.log(JSON.stringify(mtnr))
        let matData = await SELECT.from("wholefoodService.Materials").columns('MATNR','TYPE_MTART','MAKTX')
        console.log(JSON.stringify(matData))
        let obj = {MATNR : matData.MATNR, TYPE_MTART : matData.TYPE_MTART , MAKTX : matData.MAKTX}
        await INSERT(obj).into("wholefoodService.LISTFINISHED");
        
    })
*/

   
}


