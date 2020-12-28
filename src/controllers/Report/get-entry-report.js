const db = require('../../database/index');

module.exports = getEntryReport = async (req,res) =>{
    const sql = "SELECT * FROM entry_report ORDER BY created_at DESC"
    await db.query(sql, (error, result) => {
        if (error) console.log(error);
        return res.status(200).json(result);
    })
    
}

                   