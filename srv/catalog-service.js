module.exports = function (){
   
    const { PO_HEAD} = this.entities
    let HeadID = '0'
    this.before ('CREATE',`PO_HEAD`, req=>{
     HeadID = parseInt(HeadID) 
     HeadID = HeadID + 1
     req.data.EBELN = String(HeadID).padStart(10,'0') 
     
 })
   
}