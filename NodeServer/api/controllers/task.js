var db = require('../../db.js');
var payloadChecker = require('payload-validator');

exports.getTask = (req, res, next) => {
    const sql = `SELECT t.id,t.student_id,t.assigned_student_id,t.message,t.created_date,t.finished_date,s.name FROM task as t, students as s where t.assigned_student_id = s.roll_no and t.assigned_student_id = ?`;
    db.query(sql,[req.params.studentId], (err, result) => {
        if (err) {
            res.status(500).json({ error: err })
        } else {
            if (result.length >= 1)
                res.status(200).json(result)
            else
                res.status(404).json(result)
        }
    })
}

exports.assignTask = (req, res, next) => {
    if (req.body) {
        const sql = `INSERT INTO task (student_id,assigned_student_id,message) VALUES (?,?,?)`;
        db.query(sql, [req.body.student_id, req.body.assigned_student_id, req.body.message], (err, result) => {
            if (err) {
                if (err.errno == 1062)
                    res.status(409).json({ error: "Roll No already exists" })
                else
                    res.status(500).json({ error: err })
            } else {
                res.status(201).json({ status: "Record created successfully" })
            }
        })
    } else {
        res.status(400).json({ error: "paylod not correct" });
    }
}

exports.updateTask = (req, res, next) => {
    const sql = `UPDATE task SET finished_date= ? WHERE student_id = ? AND 	id = ?;`;
    const {finished_date,student_id,id} = req.body;
    console.log(req.body)
    db.query(sql,[finished_date,student_id,id],(err,result)=>{
        if(err){
            res.status(500).json({error:err})
        }else{
            if(result.changedRows == 1)
                res.status(200).json({status:"Record updated successfully"})
            else if(result.affectedRows == 0) 
                res.status(404).json({error:"Record Not Found"})
            else
                res.status(204).json() //fulfil the request but no row change
        }
    })
}

