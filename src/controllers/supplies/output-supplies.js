
const db = require('../../database/index');

module.exports = outPutSupplies = async (req, res) => {

    const { codProductOutput,
        quantityOutput,
        destinyReport,
        } = req.body;

        const firstNameReport = req.firstName
        const lastNameReport = req.lastName

    if (!codProductOutput ||
        !quantityOutput ||
        !destinyReport ||
        !firstNameReport ||
        !lastNameReport) return res.status(404).json({message: "Os campos são obrigatórios"})

        if (req.roleAuth === "ADMIN_MASTER" || req.roleAuth === "ADMIN" || req.roleAuth === "EMPLOYEE") {
            const sqlSelect = "SELECT name,quantity,minimum_quantity,value, if(quantity < minimum_quantity, ? , ?) AS valid from insumos "
            await db.query(sqlSelect, [true, false], (error, result) => {
                if (error) return console.log(error);
                if (result[0].quantity - quantityOutput < 0) {
                    return res.status(404).json({ message: "Retirada falhada, pois o produto irá ficar com quantidde negativa." });
                }
                if (result[0].valid === 0) {
                    const valueProduct = result[0].value
                    const nameProduct = result[0].name
                    const sql = "UPDATE insumos set quantity = quantity - ?  where cod_product = ?;";
                    db.query(sql, [quantityOutput, codProductOutput], function (err, results, fields) {

                        if (err) return console.log(err);
                        const sqlReport = "INSERT into exit_report (destiny,quantity,value,first_name,last_name,cod_product,name_product) VALUES (?,?,?,?,?,?,?)"
                        db.query(sqlReport,[destinyReport,quantityOutput,valueProduct,firstNameReport,lastNameReport,codProductOutput,nameProduct],(error,result)=>{
                            if(error) console.log(error);
                        })
                        return res.status(200).json({ message: "Retirada com sucesso." });
                    });
                }
                if (result[0].valid === 1) {
                    return res.status(404).json({ message: "Adicione mais produto ao estoque." });

                }
            })

        }

        else {
            return res.status(401).json({ message: "você não tem autorização para criar conta." });
        }

}