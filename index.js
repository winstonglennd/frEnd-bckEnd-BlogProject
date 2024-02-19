import express from 'express';
import bodyParser from 'body-parser';
import send from 'send';
const port = 3000;
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

// Middlewear
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// array to save posts from user
var posts = []; 

// Url Handler
app.get("/", (req, res) => {
    res.render("index.ejs", {posts});
})

app.post("/upload", (req, res) => {
    const {title_content, blog_content} = req.body;
    const newPost = {
        id: Date.now(), // as a unique identifier
        title_content,
        blog_content
    }
    posts.push(newPost);
    res.redirect("/");
})

app.post("/read-more-post", (req, res) => {
    const postIndex = req.body.postIndex;
    const post = posts[postIndex];
    res.render('read-more.ejs', {post});
})

app.get("/edit", (req, res) => {
    res.render("edit.ejs", {posts});
})

app.post("/edit-post", (req, res) => {
    const postIndex = req.body.postIndex;
    const postToEdit = posts[postIndex];
    res.render("edit-post", { postIndex, postToEdit, posts});
})

app.post("/update-post", (req, res) => {
    const postIndex = req.body.postIndex;
    const {title_content, blog_content} = req.body;
    posts[postIndex].title_content = title_content;
    posts[postIndex].blog_content = blog_content;
    res.render("edit.ejs", {posts});
})

app.get("/delete", (req, res) => {
    res.render("delete", {posts});
})

app.post("/delete-post", (req, res) => {
    const postIndex = req.body.postIndex;
    posts.splice(postIndex, 1);
    res.render("delete", {posts});
})

app.listen(3000, () => {
    console.log(`Server running on port ${port}` );
})

