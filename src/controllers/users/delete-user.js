const db = require('../../database');


module.exports = delete_user = async(req,res)=>{
    const {uuid} = req.params;
    const sql = "DELETE FROM users WHERE uuid = ?";
    if(req.roleAuth === "ADMIN_MASTER" || req.roleAuth === "ADMIN" ){
        await db.query(sql,[uuid],(error,results)=>{
            if(error){
                console.log(error);
            }
            res.status(200).json({message: "Usuário deletado com sucesso!"});
        });
    }
    
}