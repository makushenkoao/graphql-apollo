const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const users = [
  {
    id: 1,
    username: "USERNAME",
    age: 23,
  },
];

const app = express();
app.use(cors());

const rootValue = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    return users.find((user) => user.id == id);
  },
  createUser: ({ input }) => {
    const id = Date.now();
    const user = {
      id,
      ...input,
    };
    users.push(user);
    return user;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue,
  }),
);

app.listen(5000, () => console.log("server started on port 5000"));
