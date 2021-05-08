const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

//register and login routes
app.use('/auth', require('./routes/jwtAuth'));

//dashboard
app.use('/dashboard', require('./routes/dashboard'));

//rating
app.use('/ratings', require('./routes/ratings'));
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}...`);
});


