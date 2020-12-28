const db = require('../../database/index');


module.exports = SearchEntryReport = async (req,res)=>{
    const {searchDestiny} = req.body;
    
    const sql = `SELECT * from exit_report WHERE LOCATE ("${searchDestiny}", destiny)`;
    

   await db.query(sql,(error,results)=>{
        if(error) return console.log(error);
        if(results.length < 1 ) console.log("error")
        res.json(results);
    })
}