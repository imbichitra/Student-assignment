var db = require('../../db.js');
var payloadChecker = require('payload-validator');

exports.student_register = (req, res, next) => {
    var expectedPayload = {
        "name": "",
        "roll_no": "",
        "class": "",
        "address": "",
        "password": ""
    };
    console.log(req.body)
    if (req.body) {
        var result = payloadChecker.validator(req.body, expectedPayload, ["name", "roll_no", "class", "address", "password"], false);
        if (result.success) {
            const sql = `INSERT INTO students (roll_no,name,address,class) VALUES (?,?,?,?)`;
            db.query(sql, [req.body.roll_no, req.body.name, req.body.address, req.body.class], (err, result) => {
                if (err) {
                    if (err.errno == 1062)
                        res.status(409).json({ error: "Roll No already exists" })
                    else
                        res.status(500).json({ error: err })
                } else {
                    const sql = `INSERT INTO login_info (user_id,password,user_type) VALUES (?,?,?)`;
                    db.query(sql, [req.body.roll_no, req.body.password,"student"], (err, result) => {
                        if (err) {
                            res.status(500).json({ error: err })
                        } else {
                            res.status(201).json({ status: "Record created successfully" })
                        }
                    })
                }
            })
        } else {
            //res.status(400).json({error : result.response.errorMessage});
            res.status(400).json({ error: "Content can't be empty" });
        }
    } else {
        res.status(400).json({ error: "paylod not correct" });
    }
}

exports.students = (req, res, next) => {
    const sql = `SELECT * FROM students`;
    db.query(sql, (err, result) => {
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

exports.deleteStudent = (req, res, next) => {
    const sql = `DELETE FROM students WHERE roll_no = ?`;
    db.query(sql, [req.params.studentId], (err, result) => {
        if (err) {
            res.status(500).json({ error: err })
        } else {
            console.log(result)
            if (result.affectedRows == 1)
                res.status(200).json({ status: "Record Deleted successfully" })
            else
                res.status(404).json({ error: 'Record Not found' })
        }
    })
}

exports.getStudent = (req, res, next) => {
    const sql = `SELECT * FROM students WHERE roll_no = ?`;
    db.query(sql, [req.params.studentId], (err, result) => {
        if (err) {
            res.status(500).json({ error: err })
        } else {
            console.log(result)
            if (result.length >= 1)
                res.status(200).json(result)
            else
                res.status(404).json(result)
        }
    })
}

exports.updateStudent = (req, res, next) => {
    const sql = `UPDATE students SET name= ?,address= ?,class = ? WHERE roll_no = ?;`;
    const { roll_no, name, address } = req.body;
    console.log(req.body)
    db.query(sql, [name, req.body.class, address, roll_no], (err, result) => {
        if (err) {
            res.status(500).json({ error: err })
        } else {
            if (result.changedRows == 1)
                res.status(200).json({ status: "Record updated successfully" })
            else if (result.affectedRows == 0)
                res.status(404).json({ error: "Record Not Found" })
            else
                res.status(204).json() //fulfil the request but no row change
        }
    })
}