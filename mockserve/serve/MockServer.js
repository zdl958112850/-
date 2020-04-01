let express = require('express');   //引入express
let Mock = require('mockjs');       //引入mock
let cors = require('cors')

let app = express();        //实例化express

app.use(cors())
app.use('/getInfo',function(req, res){
    // res.header("Access-Control-Allow-Origin", "*");
    res.json(Mock.mock({
        'status': 200,
        'dataSource|1-9':[{
            'id': '@id'
        }]
    }))
})

app.listen('8090', () => {
    console.log('监听端口 8090')
})