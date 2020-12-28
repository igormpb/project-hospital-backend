const db = require('../../database/index');


module.exports = SearchEntryReport = async (req,res)=>{
    const {search} = req.body;
    
    const sql = `SELECT * from entry_report WHERE LOCATE ("${search}", created_at)`;
    

   await db.query(sql,(error,results)=>{
        if(error) return console.log(error);
        if(results.length < 1 ) console.log("error")
        res.json(results);
    })
}