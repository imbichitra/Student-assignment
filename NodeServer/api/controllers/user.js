var db = require('../../db.js');

exports.user_login = (req,res,next)=>{
    const sql = `SELECT * FROM login_info where user_id = ?`;
    db.query(sql,[req.body.user_id],(err, result)=>{
        if (err) {res.status(500).json({error:err})}
        if(result.length>0){
            if(result[0].password == req.body.password)
                res.status(200).json(result);
            else
                res.status(401).json({error:"Invalid Password"})
        }else
            res.status(401).json({error:"Invalid User ID"});
    })
}

exports.user_signup = (req,res,next)=>{
    const sql = `INSERT INTO login_info (user_id,password) VALUES (?,?)`;
    db.query(sql,[req.body.user_id,req.body.password],(err,result)=>{
        if(err){
            if(err.errno == 1062)
                res.status(409).json({error:"User id already exists"})
            else 
                res.status(500).json({error:err})
        }else{
            res.status(201).json({status:"Record created successfully"})
        }
    })
}