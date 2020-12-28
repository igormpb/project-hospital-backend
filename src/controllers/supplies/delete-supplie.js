const db = require('../../database');

module.exports = deleteSupplie = async(req,res)=>{
    const {id} = req.params;
    const sql = "DELETE FROM insumos WHERE id = ?";
    
    if(req.roleAuth === "ADMIN_MASTER" || req.roleAuth === "ADMIN" ){
        await db.query(sql,[id],(error,resullts)=>{
            if(error){
                console.log(error);
            }
            res.status(200).json({message: "Usuário deletado com sucesso!"});
        });
    }else{
        res.status(401).json({message: "você não tem autorização para deletar!"});

    }
    
}