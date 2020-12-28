const { v4: uuidv4 } = require('uuid');
const db = require('../../database/index');
const bcrypt = require('bcrypt');

module.exports = create_user = async (req, res) => {

    const { email, username, password, password2, firstName, lastName, role } = req.body;

    const salt_rounds = 10;
    const salt = bcrypt.genSaltSync(salt_rounds);
    const uuid = uuidv4();
   
    if (password != password2) return res.status(403).json({ message: "As senhas não são iguais." });
    if(!email || !username || !password || !password2 || !firstName || !lastName) return res.status(404).send({message: "os campos são obrigatórios "})
    if (req.roleAuth == "ADMIN_MASTER") {
        const sql = "INSERT INTO users(uuid,email,username,password,first_name,last_name,role) VALUES (?,?,?,?,?,?,?)";
        const cript_password = bcrypt.hashSync(password, salt);
        await db.query(sql, [uuid, email, username, cript_password, firstName, lastName, role], function (err, results, fields) {
            if (err) return console.log(err);
            res.status(200).json({ message: "conta criada com sucesso" });
        });
    }
    else if (req.roleAuth == "ADMIN") {
        const sql = "INSERT INTO users(uuid,email,username,password,first_name,last_name,role) VALUES (?,?,?,?,?,?,?)";
        const cript_password = bcrypt.hashSync(password, salt);
        const role_default = "EMPLOYEE";
        await db.query(sql, [uuid, email, username, cript_password, firstName, lastName, role_default], function (err, results, fields) {
            if (err) return console.log(err);
            res.status(200).json({ message: "conta criada com sucesso" });
        })
    }
    else {
        return res.status(401).json({ message: "você não tem autorização para criar conta." });
    }

}