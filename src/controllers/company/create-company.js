const db = require('../../database');
module.exports = createCompany = async(req,res) =>{
    const {name,cep,number,street,neighborhood,state,pais,city,contact,contact1} = req.body;
    if(!name || !cep || !number || !street || !neighborhood || !state || !pais || !city ) return res.status(404).send({message: "Os Campos são obrigatórios"})
    const sql = "INSERT INTO company(name,cep,number,street,neighborhood,state,pais,city,contact,contact1) VALUES (?,?,?,?,?,?,?,?,?,?)";
    
    await db.query(sql, [name,cep,number,street,neighborhood,state,pais,city,contact,contact1], function (err, results, fields) {
        if (err) return console.log(err);
        res.status(200).json({ message: "conta criada com sucesso" });
    });
}