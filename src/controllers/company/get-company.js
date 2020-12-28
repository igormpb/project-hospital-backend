const db = require('../../database');

module.exports = getCompany = async (req,res) => {
    

    if(req.roleAuth){
        await db.query("SELECT * FROM company ORDER BY update_at DESC",(error,results)=>{
            if(error){
                console.log(error);
            }
            res.status(200).json(results);
        });
    }
    else{
        res.status(401).json({message: "Você não tem autorização para listar supplies."});
    }
    
}

