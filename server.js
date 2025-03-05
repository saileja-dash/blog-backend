const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const POSTS_FILE = "posts.json";

// Get all posts
app.get("/api/posts", (req, res) => {
    fs.readFile(POSTS_FILE, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Failed to read posts" });
        res.json(JSON.parse(data));
    });
});

// Add a new post
app.post("/api/posts", (req, res) => {
    const newPost = req.body;
    fs.readFile(POSTS_FILE, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Failed to read posts" });

        const posts = JSON.parse(data);
        posts.push(newPost);
        fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Failed to save post" });
            res.status(201).json(newPost);
        });
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));