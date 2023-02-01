const models = require('../db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const crypto = require('crypto')
const e = require('express')

// 连接数据库
const conn = mysql.createConnection(models.mysql)
conn.connect()
const jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1', msg: '操作失败'
    })
  } else {
    res.json(
      ret
    )
  }
}
router.post('/get',(req, res) => {
  const params = req.body 
  const md5 = crypto.createHash('md5')
  const sql= `SELECT * FROM loginname WHERE name='${params.name}'`
  conn.query(sql,[params.name],function(err, result){
    if(err){
      console.log(err)
    }
    if(result){
      if(result.length>0){
        if(result[0].password == params.password){
          md5.update(result[0].password)
          result[0].password = md5.digest('hex')
          jsonWrite(res,result)
        }else{
          result[0].password = ''
          jsonWrite(res,result)
        } 
      }else{
        jsonWrite(res,result)
      }
    }
  })
})

router.post('/getInterviewType',(req,res)=>{
  const params = req.body
  const sql = `SELECT * FROM interviewtype WHERE userId='${params.userId}'`;
  conn.query(sql,[params.userId],function(err, result){
    if(err){
      console.log(err)
    }
    if(result){
      jsonWrite(res,result)
    }

  })
})
router.post('/getInterviewTitle',(req,res)=>{
  const params = req.body
  let results = {}
  let sql = ''
  if(params.type && params.type!=''){
    sql = `SELECT COUNT(*) as total FROM interviewtitle WHERE userId='${params.userId}' AND type='${params.type}';SELECT * FROM interviewtitle WHERE userId='${params.userId}' and type='${params.type}' limit ${10*params.page - 10},10`;
    conn.query(sql,[params.userId],function(err, result){
    if(err){
      console.log(err)
    }
    if(result){
      results.total = result[0][0].total
      results.data = result[1]
      jsonWrite(res,results)
    }
  })
  }else{
    sql = `SELECT COUNT(*) as total FROM interviewtitle WHERE userId='${params.userId}';SELECT * FROM interviewtitle WHERE userId='${params.userId}' limit ${10*params.page - 10},10`;
    conn.query(sql,[params.userId],function(err, result){
      if(err){
        console.log(err)
      }
      if(result){
        results.total = result[0][0].total
        results.data = result[1]
        jsonWrite(res,results)
      }
    })
  }
})
router.post('/getTotals',(req,res)=>{
  const params = req.body
  let results = {}
  const sql = `SELECT COUNT(*) as total FROM interviewtitle WHERE userId='${params.userId}';`;
  conn.query(sql,[params.userId],function(err, result){
    if(err){
      console.log(err)
    }
    if(result){
      results.total = result[0].total
      jsonWrite(res,results)
    }

  })
})
router.post('/getDetails',(req,res)=>{
  const params = req.body
  const sql = `
  SELECT t.type,i.title,i.time,e.content,e.mdContent FROM interviewtitle as i
  INNER JOIN interview as e on e.cid = i.id
  INNER JOIN interviewtype as t on t.typeId = i.type
  WHERE i.id = ${params.detailsId}
  `;
  conn.query(sql,[params.detailsId],function(err, result){
    if(err){
      console.log(err)
    }
    if(result){
      jsonWrite(res,result[0])
    }

  })
})

router.post('/changeDetails',(req,res)=>{
  const params = req.body
  let nowTime = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`

  const sql = `UPDATE interview SET mdContent= '${params.mdContent}',content='${params.content}' WHERE cid = '${params.id}';UPDATE interviewtitle SET title='${params.title}',time = '${nowTime}' WHERE id = '${params.id}'`;
  conn.query(sql,[params.mdContent,params.content,params.id],function(err, result){
    if(err){
      console.log(err)
    }
    if(result){
      jsonWrite(res,result)
    }

  })
})
router.post('/addDetails',(req,res)=>{
  const params = req.body
  let nowTime = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`

  const sql = `INSERT INTO interviewtitle (id,type,title,time,userId) VALUES(null,'${params.type}','${params.title}','${nowTime}','${params.userId}');
  set @id = @@IDENTITY;
  INSERT INTO interview (cId,content,mdContent) VALUES(@id,'${params.content}','${params.mdContent}');
  `;
  conn.query(sql,[params.type,params.title,params.mdContent,params.content,params.userId],function(err, result){
    if(err){
      console.log(err)
    }
    if(result){
      let results = {
        code:200,
        tips:'操作成功'
      }
      jsonWrite(res,results)
    }

  })
})


router.post('/delDetails',(req,res)=>{
  const params = req.body
  const sql = `delete from interview where cid='${params.id}';delete from interviewtitle where id='${params.id}'`;
  conn.query(sql,[params.id],function(err, result){
    if(err){
      console.log(err)
    }
    if(result){
      let results = {
        code:200,
        tips:'操作成功'
      }
      jsonWrite(res,results)
    }

  })
})




module.exports = router
