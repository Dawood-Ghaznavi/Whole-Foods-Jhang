module.exports = function (){
   
    const { PO_HEAD} = this.entities()
    const { PO_ITEM} = this.entities()
    const {MARD} = this.entities()
   

    this.before ('CREATE','PO_HEAD', async (req)=>{
        console.log("CREATE")
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


    this.before ('UPDATE','PO_ITEM.drafts',async (req)=>{
        
       console.log("update drafts")
            if(req.data){
                

                if(req.data.MENGE != undefined){
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
     
    
   
    this.before ('UPDATE','PO_HEAD', async (req)=>{

       let mardItems =  await SELECT.from("wholefoodService.MARD").columns('ITEM').where({PURCHASE: req.data.ID});
       let mardLength = mardItems.length
       let reqItems = req.data.EBELP
       let reqdelLength = req.data.EBELP.length
       let count 
       console.log(mardItems)
       for(let x = 0 ; x < mardLength ; x++){
        count = 0
            for(let y = 0; y < reqdelLength ; y++){

        if(mardItems[x].ITEM == reqItems[y].ID){
            break
        }
          count = count + 1
          
        if(count == reqdelLength){
            console.log("  OOOO   " + mardItems[x].ITEM) 
            await DELETE.from("wholefoodService.MARD").where({ ITEM: mardItems[x].ITEM });
        }


            }
}
if(reqdelLength < 1){

    await DELETE.from("wholefoodService.MARD").where({ PURCHASE: req.data.ID });
}


})
    
    this.before ('DELETE','PO_HEAD', async (req)=>{
      let Po_ID = req.data.ID
      console.log(JSON.stringify(req.data))
        await DELETE.from("wholefoodService.MARD").where({ PURCHASE: Po_ID });


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
    
 
   
}


