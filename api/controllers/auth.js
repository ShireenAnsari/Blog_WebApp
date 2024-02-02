import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import pkg from 'jsonwebtoken';
export const register = (req, res) => {
    // check existing user
    const q = "SELECT * FROM users WHERE email=? OR username=?";
    db.query(q, [req.body.email, req.body.username], async (err, data) => {
        if (err) return res.json(err);
        
        if (data.length) {
            return res.status(409).json('User already exists');
        }

        try {
            // hash the password and create user
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);

            const insertQuery = "INSERT INTO users(`username`,`email`,`password`) VALUES (?, ?, ?)";
            const values = [req.body.username, req.body.email, hash];

            db.query(insertQuery, values, (err, data) => {
                if (err) return res.json(err);
                return res.status(200).json('User has been created');
            });
        } catch (error) {
            return res.json(error);
        }
    });
};
export const login = async (req, res) => {
    // check if user exists
    const q = 'SELECT * FROM users where username=?';
    db.query(q, [req.body.username], async (err, data) => {
        if (err) return res.json(err);

        if (data.length === 0) return res.status(404).json('User not found!');

        // password check
        try {
            const isPassword = await bcrypt.compare(req.body.password, data[0].password);

            if (!isPassword) return res.status(404).json('Wrong username or password');
            const token = pkg.sign({ id: data[0].id }, "shiritoken");
            const { password, ...other } = data[0];
            res.status(200).json({token:token,other});
        } catch (error) {
            return res.json(error);
        }
    });
};
