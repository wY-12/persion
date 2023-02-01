require('./db')


// node 后端服务器
const UserApi = require('./api/SysUser')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
//采用设置所有均可访问的方法解决跨域问题
app.all("*", function(req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200); //让options尝试请求快速结束
  else
    next();
})

// 以json格式返回出去
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: false }))

// 后端api路由
app.use('/api/sysuser', UserApi)


// 监听端口
let host = 8080
app.listen(host)
console.log('成功监听' + host)
