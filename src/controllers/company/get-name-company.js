const db = require('../../database');

module.exports = getNameCompany = async (req,res) => {
    

    if(req.roleAuth){
        await db.query("SELECT id,name FROM company",(error,results)=>{
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

