

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { v4: uuidv4 } = require('uuid');
app.use(bodyParser.json());
app.use(cors());
const users= [
    {
        mail:"gbg@ggg.ru",
        password: "12345",
        name: "greg"
    },
    {
        mail:"gag@ggg.ru",
        password: "12345",
        name: "henri"
    },
    {
        mail:"ggg@ggg.ru",
        password: "12345",
        name: "grog"
    },
    
    
    
];



const authorizationHandler = (req,res,next)=> {
    const [type,token] = req.headers.authorization.split(" ");
    if (type.toLowerCase() !== 'bearer'){
        res.json({
            message: "Bad token type.",
            
        });

        return;
    }

    const user = users.find(
        item => item.token === token
    )

    if (!user){
        res.json({
            message: "Bad token."
        })
    } else {
        req.locals = {
            user,
        };

        next();
    }

};

app.get('/a', (req,res) => {
    var token1 = uuidv4();
    res.json({
        token:token1
    })
})

app.get('/me/',authorizationHandler,(req,res)=>{
    const user = req.locals.user;
    res.json({
        mail: user.mail,
        name: user.name
    })
})


app.post('/auth/',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const user = users.find(item => item.mail === email && item.password === password);
    
    let token = uuidv4();
    user.token = token

    if(user){
        res.json({
            status: true,
            token: token,
        });
    } else {
        res.json({
            status:false,
        })
    };
})



app.listen(6060, () => console.log("Started!"))