
const db = require('../../database/index');

module.exports = createInsumo = async (req, res) => {
    const firstNameReport = req.firstName
    const lastNameReport = req.lastName

    const { codProduct, name, value, quantity, minimumQuantity} = req.body;
    if(!codProduct || !name || !value || !minimumQuantity) return res.status(404).send({message: "Os campos são obrigatórios"})
    if (req.roleAuth == "ADMIN_MASTER" || req.roleAuth == "ADMIN_MASTER") {
        const sql = "INSERT INTO insumos(name,minimum_quantity,quantity,value,cod_product) VALUES (?,?,?,?,?)";
        await db.query(sql, [name ,minimumQuantity, quantity,value,codProduct], function (err, results, fields) {
            if (err){
                console.log(err)
                return res.status(404).json({ message: "teve algum erro ao criar" });  
            }
            if(results){
                const sqlEntryReport = "INSERT into entry_report (first_name,last_name,cod_product,quantity,name_product) VALUES (?,?,?,?)"

                db.query(sqlEntryReport,[firstNameReport,lastNameReport,quantity,codProduct,name],(error,result,field) =>{
                    if(error) return console.log(error);
                })
                res.status(200).json({ message: "Produto criado com sucesso"});   

            }
            
        });
    }
    
    else {
        return res.status(401).json({ message: "você não tem autorização para criar conta." });
    }

}