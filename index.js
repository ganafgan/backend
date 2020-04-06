const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

//setting express and json
const app = express()
app.use(express.json())
app.use(cors())

const port = 4002

//setting database connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'ganafgan1994',
    port : 3306,
    database : 'movie'
})

app.get('/', (req, res)=>{
    res.send('Welcome to the API Movie')
})

//CRUD

//READ DATA MOVIES
app.get('/getmovies', (req, res)=>{
    let sql = `select * from movies`

    db.query(sql, (err, result)=>{
        try{
            if(err) throw err
            res.json({
                error : false,
                data : result
            })
        }catch(err){
            res,json({
                error : true,
                data : err.message
            })
        }
    })
})

//READ DATA MOVIES BY ID
app.get('/getmovies/:id', (req, res)=>{
    let id = req.params.id
    let sql = `select * from movies where id = ?;`

    db.query(sql, id, (err, result)=>{
        try{
            if(err) throw err
            res.json({
                error : false,
                data : result
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
})

//READ DATA CATEGORIES
app.get('/getcategories', (req, res)=>{
    let sql = `select * from categories`

    db.query(sql, (err, result)=>{
        try{
            if(err) throw err
            res.json({
                error : false,
                data : result
            })
        }catch(err){
            res,json({
                error : true,
                data : err.message
            })
        }
    })
})

//READ DATA CATEGORIES BY ID
app.get('/getcategories/:id', (req, res)=>{
    let id = req.params.id
    let sql = `select * from categories where id = ?;`

    db.query(sql, id, (err, result)=>{
        try{
            if(err) throw err
            res.json({
                error : false,
                data : result
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
})

//READ DATA CONNECTION LIST
app.get('/getmovcat', (req, res)=>{
    let sql = `select movies.nama as film, categories.nama as genre from movcat
    join movies on movies.id = movcat.idmovie
    join categories on categories.id = movcat.idcategory`

    db.query(sql, (err, result)=>{
        try{
            if(err) throw err
            res.json({
                error : false,
                data : result
            })
        }catch(err){
            res,json({
                error : true,
                data : err.message
            })
        }
    })
})

//POST DATA MOVIES
app.post('/addmovies', (req, res)=>{
    let data = req.body
    let sql = `insert into movies set ?;`

    db.query(sql, data, (err, result)=>{
        try{
            if(err) throw err
            res.json({
                error : false,
                message : `Add Data Success`,
                data : {
                    nama : data.nama,
                    tahun : data.tahun,
                    description : data.description
                }
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
})

//POST DATA CATEGORIES
app.post('/addcategories', (req, res)=>{
    let data = req.body
    let sql = `insert into categories set ?;`

    db.query(sql, data, (err, result)=>{
        try{
            if(err) throw err
            res.json({
                error : false,
                message : `Add Data Success`,
                data : {
                    nama : data.nama
                }
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
})

//POST DATA CONNECTION LIST
app.post('/addmovcat', (req, res)=>{
    let data = req.body
    let sql = `insert into movcat set ?;`

    db.query(sql, data, (err, result)=>{
        try{
            if(err) throw err
            res.json({
                error : false,
                message : `Add Data Success`,
                data : {
                    nama : data.nama
                }
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
})

//EDIT DATA MOVIES
app.patch('/editmovies/:id', (req, res)=>{
    let data = req.body
    let id = req.params.id
    let sql = `update movies set ? where id = ?;`

    db.query(sql, [data, id], (err, result)=>{
        try{
            if(err) throw err
            res.json({
                error :false,
                message : `Edit Data Success`,
                data : data
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
})

//EDIT DATA CATEGORIES
app.patch('/editcategories/:id', (req, res)=>{
    let data = req.body
    let id = req.params.id
    let sql = `update categories set ? where id = ?;`

    db.query(sql, [data, id], (err, result)=>{
        try{
            if(err) throw err
            res.json({
                error :false,
                message : `Edit Data Success`,
                data : data
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
})

//DELETE MOVIES BY ID
app.delete('/deletemovies/:id', (req, res)=>{
    let id = req.params.id
    let sql = `delete from movies where id = ?;`

    db.query(sql, id, (err, result)=>{
        try{
            if(err) throw err
            let sql = `select * from movies ;`
            db.query(sql, (err, hasil)=>{
                try{
                    if(err) throw err
                    res.json({
                        error : false,
                        message : `Delete Data Success`,
                        data : hasil
                    })
                }catch(err){
                    res.json({
                        error : true,
                        message : err.message
                    })
                }
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
})

//DELETE CATEGORIES BY ID
app.delete('/deletecategories/:id', (req, res)=>{
    let id = req.params.id
    let sql = `delete from categories where id = ?;`

    db.query(sql, id, (err, result)=>{
        try{
            if(err) throw err
            let sql = `select * from categories ;`
            db.query(sql, (err, hasil)=>{
                try{
                    if(err) throw err
                    res.json({
                        error : false,
                        message : `Delete Data Success`,
                        data : hasil
                    })
                }catch(err){
                    res.json({
                        error : true,
                        message : err.message
                    })
                }
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
})


app.listen(port, () => console.log('Server Run On Port ' + port))