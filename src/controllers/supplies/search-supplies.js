const db = require('../../database/index');



module.exports = SearchSupplies = async (req,res)=>{
    const {search} = req.body;
    
    const sql = `SELECT * from insumos WHERE LOCATE ("${search}", cod_product)`;
    

   await db.query(sql,(error,results)=>{
        if(error) return console.log(error);
        if(results.length < 1 ) console.log("error")
        res.json(results);
    })
}