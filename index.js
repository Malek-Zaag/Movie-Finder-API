const express = require('express')
const app = express()
const PORT=process.env.PORT || 4000;
const axios = require('axios')
const cheerio=require('cheerio')
const movies=[]


app.get('/', (req,res)=>{
    res.send("Welcome to my new Movies API!!!!")
})
app.get('/movies', (req,res) => {
    axios.get('https://123moviesgo.ga/all-movies')
    .then((result)=>{
        const html=result.data;
        const $=cheerio.load(html);


        $("a[class='ml-mask jt'] ",html).each(function () {
            const url= "https://123moviesgo.ga"+$(this).attr('href')
            const image=$(this).children('img').first().prop('data-original');
            movies.push({
                title,
                url,
                image,
            })
        })
        res.send(movies)

    })
    .catch((err)=>{console.error(err)})
})
app.get("/movies/:id",(req, res)=>{
    const title=req.params.id
    const url ="https://123moviesgo.ga/high-speed-hd-streaming.html?title=" + title
    axios.get(url)
    .then(response =>{
        res.redirect(url)
    })
    .catch((err)=>{console.error(err)})
})

app.listen(PORT, ()=> console.log(`listening on port ${PORT}`))