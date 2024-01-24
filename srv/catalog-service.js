module.exports = function (){
   
    const { PO_HEAD} = this.entities()
    const { PO_ITEM} = this.entities()
    let HeadID = '0'
    let ITEMID = '0'

    this.before ('CREATE','PO_HEAD.drafts', async (req)=>{
        HeadID = parseInt(HeadID) 
        HeadID = HeadID + 1
       
        req.data.EBELN = String(HeadID).padStart(10,'0') 
        
        
        
       })

    
   

      

   this.before ('CREATE', 'PO_ITEM.drafts',req=>{
        
        
        ITEMID = parseInt(ITEMID) 
        ITEMID = ITEMID + 10
        let temp = String(ITEMID).padStart(4,'0') 
        req.data.EBELP = temp
        
        
    })


    this.before ('UPDATE','PO_ITEM.drafts',req=>{
        
       
            if(req.data){
                if(req.data.MENGE){
                    
                    if(req.data.MENGE < 1){
                    return req.error(409, `Quantity entered should be greater than zero`); }}}
        
        
       
        
    })
    

 
   
}


