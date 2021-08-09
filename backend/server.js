const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;



const express = require("express");
const articles = require("./dummydata/articles");
const path = require("path");
const server = express();

mongoose.connect(process.env.MONGO_URL || 'mongodb+srv://SwappyK:SwappyK123@mern-pagination.dwzjs.mongodb.net/mern-pagination?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.config('connected', () =>{
    console.log('Mongoose is connected!!!!')
});

const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
    id: String,
    title: String,
    //authors: String,
    //source: String,
    //pubyear: String,
    //doi: String,
    //claim_evidence: String,
});

const Article = mongoose.model('Article', ArticleSchema);

const data = {
    id = '2',
    title = 'gdfgdf'
};

const newArticle = new Article(data);

newArticle.save((error) => {
    if (error) {
        console.log('something went wrong');
    } else {
        console.log('saved');
    }
});


server.get('/', (req,res) =>{
    res.send("API is running")
})

server.get('/api/articles', (req,res) => {
    res.json(articles);
});

server.get('/api/articles/:id', (req,res) => {
    const article = articles.find((n) => n._id === req.params.id);
    res.send(article);
    console.log(req.params);
});

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('frontend/build'));
}

server.listen(PORT, console.log(`server is working and listening on PORT ${PORT}`));
