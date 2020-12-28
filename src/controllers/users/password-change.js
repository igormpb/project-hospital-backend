const db = require('../../database');
const bcrypt = require('bcrypt');
const salt_rounds = 10;
const salt = bcrypt.genSaltSync(salt_rounds);

module.exports = password_change = async (req, res) => {

    const { uuid } = req.params;
    const { password, new_password, new_password2 } = req.body;

    const sql_select = "SELECT * FROM users WHERE uuid = ?";
    const sql_update = "UPDATE users SET password = ? WHERE uuid = ?";

    if (new_password != new_password2) return res.status(403).json({ message: "As senhas não são iguais." });

    await db.query(sql_select, [uuid], (error, results) => {
        if (error) throw error;

        try {
            if (bcrypt.compareSync(password, results[0].password)) {
                const cript_password = bcrypt.hashSync(new_password, salt);

                db.query(sql_update, [cript_password, uuid], (error, results) => {
                    if (error) return console.log(error);

                    res.status(200).json({ message: "Senha alterada com sucesso" });

                })
            } else {
                res.status(403).json({ message: "Sua senha antiga está errada!" });
            }
        } catch (err) {
            console.log(err);
        }

    })
}