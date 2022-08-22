const { response } = require('express');
const express = require('express');
const urlMetadata = require('url-metadata')
const  cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine','ejs')
app.use(express.json());
const corsOptions = {
    origin: 'http://127.0.0.1:5500/',
    method:"POST",
    optionsSuccessStatus: 200 
}
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
    res.render('index.ejs')
})


app.post("/", cors(corsOptions),(req, res) => {

    const url = req.body.url;

    urlMetadata(url).then(
        function (response) { // success handler
            const metaData = {
                title: response.title,
                description: response.description,
                image: response.image,
                tags: response.keywords
            }
            res.render('response',{metaData})
        },
        function (error) { // failure handler
            console.log(error)
        }
    )
})


app.listen(8080, () => {
    console.log("server is listening on port number 8080  ");
});