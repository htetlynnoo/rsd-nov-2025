const jwt = require("jsonwebtoken");

const user = { id: 1, name: "Alice", username: "Alice" };

const secret = "some secret";

const token = jwt.sign(user, secret);

//console.log(token);

const output =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFsaWNlIiwidXNlcm5hbWUiOiJBbGljZSIsImlhdCI6MTc0MTkyNDYzNn0.ynvMlz-K-Ec87aEfDrGw9Hk_TCcGSOh3IS2JkzT5VIA";

console.log(jwt.verify(output, secret));
