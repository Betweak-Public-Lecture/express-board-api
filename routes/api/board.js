const express = require('express');
const router = express.Router();


// method 4개 (GET, POST, PUT, DELETE)
// 

const db = require('../../models/db');

// '/' (GET)  : 전체 조회 
router.get('/', (req,res)=>{
  const sql = 'SELECT * FROM board;';
  db.query(sql, (err, rows)=>{
    if (err){
      res.json({
        status: "error",
        result: "DB Error"
      })
    } else{
      res.json({
        status: 'success',
        result: rows
      })
    }
  })
})

// '/:boardId (GET)   : 상세조회


module.exports = router;