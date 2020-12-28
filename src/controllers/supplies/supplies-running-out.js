const db = require('../../database/index');

module.exports = suppliesRunningOut = async (req, res) => {
const sql =  `select cod_product,name,quantity,minimum_quantity 
from project.insumos 
where quantity < minimum_quantity;`
 
await db.query(sql,(error,results)=>{
    if(error) return console.log(error);
    res.status(200).json(results);
})
}