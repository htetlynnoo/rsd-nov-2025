const express = require("express");
const app = express();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { usersRouter } = require("./routers/users");
app.use(usersRouter);

const { auth, isOwner } = require("./middlewares/auth");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

app.get("/posts", async (req, res) => {
    const posts = await prisma.post.findMany({
        include: { user: true },
        take: 20,
        orderBy: { id: "desc" },
    });

    setTimeout(() => {
        res.json(posts);
    }, 2000);
});

app.get("/posts/:id", async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
        include: { user: true },
        where: { id: Number(id) },
    });
    res.json(post);
});

app.post("/posts", auth, async (req, res) => {
    const { content } = req.body;
    const user = res.locals.user;
    if (!content) {
        return res.status(400).json({ msg: "content is required" });
    }

    const post = await prisma.post.create({
        data: {
            content,
            userId: Number(user.id), // Ensure userId exists in the database
        },
        include: { user: true },
    });

    res.status(201).json(post);
});

app.delete("/posts/:id", auth, isOwner("post"), async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.delete({
        where: { id: Number(id) },
    });
    res.json(post);
});

app.listen(8080, () => {
    console.log("Express is running at 8080");
});
