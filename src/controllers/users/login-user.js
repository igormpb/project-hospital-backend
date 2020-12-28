const db = require('../../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = login_user = async (req, res) => {

    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ?";

    if (username, password) {
        await db.query(sql, [username], (error, results) => {
            if (error) return res.json({ message: "Usuário ou/e senha errada, tente novamente!" });
            try {
                if (bcrypt.compareSync(password, results[0].password)) {
                    const uuid = results[0].uuid;
                    const id = results[0].id;
                    const _firstName = results[0].first_name;
                    const _lastName = results[0].last_name;
                    const username = results[0].username;
                    const email = results[0].email;
                    const created_at = results[0].created_at;
                    const roleAuth = results[0].role;
                    
                    let token = jwt.sign({uuid, id, username, email, created_at, roleAuth, _firstName, _lastName  }, process.env.SECRET, {
                        expiresIn: 7200
                    });
                    return res.status(200).json({ auth: true, token});
                } else {
                    res.status(401).json({ message: "Usuário ou/e senha errada, tente novamente!" });
                }
            } catch{
                res.status(401).json({ message: "Usuário ou/e senha errada, tente novamente!" });
            }
        });
    } else {
        res.status(401).json({ message: "Usuário ou/e senha são obrigatórios, tente novamente!" });

    }


}