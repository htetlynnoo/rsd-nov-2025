let value = 123;

type User = {
    name: String;
    age: Number;
    gender?: "male" | "female";
};

let bob: User = {
    name: "Bob",
    age: 23,
    gender: "male",
};

interface Student {
    name: String;
    age: Number;
}

interface Student {
    grade: "A" | "B" | "C" | "F";
}

let Alice: Student = {
    name: "Alice",
    age: 33,
    grade: "B",
};

function hello(user: User & { email: string }) {
    return `Hello ${user}`;
}

function byebye(user: { username: String; email: string }) {
    return `Hello ${user}`;
}

type Res<T> = {
    data: T;
};

type Post = {
    title: String;
};

type Category = {
    name: String;
};   

let post: Res<Post> = {
    data: { title: "Post Title" },
};

let category: Res<Category> = {
    data: { name: "Cat" },
};
