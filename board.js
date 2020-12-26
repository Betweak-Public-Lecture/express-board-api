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

// /api/board/:boardId
// '/:boardId (GET)   : 상세조회
router.get('/:boardId', (req, res)=>{
  const boardId = req.params.boardId;
  const sql = 'SELECT * FROM board WHERE id=?'
  db.query(sql, [boardId] ,(err, rows)=>{
    if(err){
      res.json({
        status: 'error',
        result: "DB Error"
      })
    } else if(rows.length<1) {
      res.status(404).json({
        status: 'error',
        result: "Data가 없습니다."
      })
    } else {
      res.json({
        status: "success",
        result: rows[0]
      })
    }
  });
})

// Method4개 (GET, POST, PUT, DELETE)

// /api/board/ (POST) : 게시글 생성
router.post('/', (req, res)=>{
  console.log(req.body);
  const {title, content} = req.body;
  const sql = 'INSERT INTO board(title, content) VALUES(?, ?)';

  db.query(sql, [title, content], (err, result)=>{
    if (err){
      res.status(500).json({
        status: "error",
        result: "DB Error"
      })
    } else{
      // json: javascript object notation
      res.status(201).json({
        status: "success",
        result: result
      })
    }
  })
})

// (DELETE): 게시글 삭제  /api/board/:boardId
router.delete('/:boardId', (req, res)=>{
  const boardId = req.params.boardId
  const sql = 'DELETE FROM board WHERE id=?';
  db.query(sql, [req.params.boardId], (err, result)=>{
    if (err){
      res.json({
        status: "error",
        result: "DB Error"
      })
    } else{
      res.json({
        status: "success",
        result: result
      })
    }
  })
})


// (PUT): 게시글 수정   /api/board/:boardId

/**
 * 
 * UPDATE table_name
 * SET column1 = value1, column2 = value2, ...
 * WHERE condition;
 */
router.put('/:boardId', (req, res)=>{
  const {title, content} = req.body;
  const sql = "UPDATE board SET title=?, content=? WHERE id=?";
  db.query(sql, [title, content, req.params.boardId], (err, result)=>{
    if (err){
      res.json({
        status: "error",
        result: "DB Error"
      })
    } else{
      res.json({
        status: 'success',
        result:result
      })
    }
  })
})



module.exports = router;