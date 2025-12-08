import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let blogList = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/create", (req, res) => {
    res.render("create.ejs");
})

// create.ejs and edit.ejs data passed down here to be handled
app.post("/", (req, res) => {
    let id = 0;
    //if route handles edit.ejs call then there exists an edited post to be stored in og post's index in the list
    if (req.body.id) {
        id = Number(req.body.id);
        var blog = {
            id: id,
            title: req.body["title"],
            content: req.body["content"]
        }
        blogList[id - 1] = blog;
    } else {
        id = blogList.length + 1;
        var blog = {
            id: id,
            title: req.body["title"],
            content: req.body["content"],
        }
        blogList.push(blog);
    }


    res.render("index.ejs");
})

app.post("/edit", (req, res) => {
    res.render("editList.ejs", 
        { blogs: blogList }
    );
})

app.get("/edit/:id", (req, res) => {
    let index = Number(req.params["id"]) - 1;
    res.render("edit.ejs", 
        { blog: blogList[index] }
    );
})

app.post("/delete", (req, res) => {
    res.render("deleteList.ejs",
        { blogs:blogList}
    );
})

// i swear to all thats holy, the delete functionality took WAY TOO LONG
app.get("/delete/:id", (req, res) => {
    let index = Number(req.params["id"]) - 1;
    blogList.splice(index, 1);
    for(let i = index; i < blogList.length; i++) {
        let j = i;
        let blog = blogList[i];
        blog["id"] = ++j;
        //console.log(blog['id']);
    }
    //console.log(blogList);

    res.render("index.ejs");    
})

app.post("/view", (req, res) => {
    res.render("viewList.ejs", 
        { blogs: blogList }
    );
})

app.get("/view/:id", (req, res) => {
    let index = Number(req.params.id) - 1;
    res.render("view.ejs", 
        { blog: blogList[index] }
    );
})

app.listen(port, (req, res) => {
    console.log(`Server listening on port ${port}`);
})
