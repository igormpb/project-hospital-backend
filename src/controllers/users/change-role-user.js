const db = require('../../database');

module.exports = change_role = async(req,res) =>{
    const sql_select = "SELECT * FROM users WHERE uuid = ?"
    const sql_update = "UPDATE users SET role = ? WHERE uuid = ?"
  
    const {uuid} = req.params;
    
    const {role} = req.body;

    if(!role) return res.json({message: "selecione um role"});
    console.log(role)
    if(role !== "ADMIN" && role !== "EMPLOYEE") return res.json({message: "não existe esta opção."});
  
    if(roleAuth === "ADMIN_MASTER"){
        await db.query(sql_select,[uuid],(error,results)=>{
            if(error) return console.log(error);
            
            db.query(sql_update,[role,uuid],(error,results)=>{
                if(error) return console.log(error);
                res.status(200).json({message: "Role alterado com sucesso"});

            })
        })
    }
    else{
        res.status(403).json({message: "você não tem autorização para isso!"});
    }
}