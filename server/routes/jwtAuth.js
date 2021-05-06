const router = require('express').Router();
const pool = require('../database');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utilities/jwtGenerator');
const authorization = require('../middleware/authorization');
//register

router.post('/register', async(req,res)=>{
    try {
        const {username,email,password} = req.body;
        const user = await pool.query('select * from users where email=$1',[email]);
        if(user.rows.length!==0){
            return res.status(401).send('user already exists...');
        }
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query('INSERT INTO users(username, email, password) values($1,$2,$3) RETURNING *',[username,email,bcryptPassword]);

        const token = jwtGenerator(newUser.rows[0].user_id);
        console.log({token});
        res.json({token});
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error!');
    }
});

router.post('/login', async(req,res)=>{
    try {
        const {email, password} = req.body;
        console.log(req.body);
        const user = await pool.query('SELECT * FROM users WHERE email = $1',[email]);
        if(user.rows.length === 0){
            return res.status(401).send('Password or Email is Incorrect');
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if(!validPassword){
            return res.status(401).send('Password or Email is Incorrect');
        }
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({token});

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error!');
    }
});
router.get('/is-verify', authorization, (req,res)=>{
    try {
        res.json(true);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error!');       
    }
});
module.exports = router;