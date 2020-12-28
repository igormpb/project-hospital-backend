const db = require('../../database');

module.exports = list_all = async (req,res) => {
    

    if(req.roleAuth == "ADMIN_MASTER"){
        await db.query("SELECT first_name,last_name,email,created_at,role,uuid FROM users Where role = ? or role = ? ",["ADMIN","EMPLOYEE"],(error,results)=>{
            if(error){
                console.log(error);
            }
            res.status(200).json(results);
        });
    }else if(req.roleAuth == "ADMIN"){
        await db.query("SELECT first_name,last_name,email,created_at, role,uuid FROM users WHERE role = ?",["EMPLOYEE"],(error,results)=>{
            if(error){
                console.log(error);
            }
            res.status(200).json(results);
        });
    }
    else{
        res.status(401).json({message: "Você não tem autorização para listar contas."});
    }
    
}

