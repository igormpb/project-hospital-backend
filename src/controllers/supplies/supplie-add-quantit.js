
const db = require('../../database/index');

module.exports = addQuantity = async (req, res) => {

    const { codProductUpdate, quantityUpdate} = req.body;
    
    if (req.roleAuth == "ADMIN_MASTER" ||req.roleAuth == "ADMIN" ||req.roleAuth == "EMPLOYEE") {
        const sqlSelect = "SELECT * FROM insumos where cod_product = ?";
        await db.query(sqlSelect,[codProductUpdate],(error,results,fields) =>{
           if(results.length === 0){
              return error
           }else{
            const sql = "UPDATE insumos set quantity = quantity + ?  where cod_product = ?;";
            db.query(sql, [quantityUpdate,codProductUpdate], function (err, results, fields) {
               if(results){
               res.status(200).json({ message: "quantidade do Insumo alterada." });
                
            }
           });
           }
           
        })
    }
    
    else {
        return res.status(401).json({ message: "você não tem autorização para criar conta." });
    }

}