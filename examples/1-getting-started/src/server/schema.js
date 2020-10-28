// const fetch = require("isomorphic-fetch")

const store = {
  todos: [
    {
      id: 0,
      text: "Go to the shops",
      complete: false
    },
    {
      id: 1,
      text: "Pick up the kids",
      complete: true
    },
    {
      id: 2,
      text: "Install mst-gql",
      complete: false
    }
  ]
}

const typeDefs = `
  type Query {
    todos: [Todo]
    stringFromServer(string: String): String
  }
  type Mutation {
    toggleTodo(id: ID!): Todo
    createTodo(todo: CreateTodoInput!): Todo
    returnBoolean(toReturn: Boolean!): Boolean
  }
  type Todo {
    id: ID,
    text: String,
    complete: Boolean,
  }

  input CreateTodoInput {
    id: ID!,
    text: String!,
    complete: Boolean,
  }
`

const resolvers = {
  Query: {
    todos: (root, args, context) => {
      return store.todos
    },
    stringFromServer: (root, { string }, context) => {
      return string || "No String Sent."
    }
  },
  Mutation: {
    toggleTodo: (root, args, context) => {
      const { id } = args
      store.todos[args.id].complete = !store.todos[args.id].complete
      return store.todos[args.id]
    },
    createTodo: (root, args, context) => {
      const todo = {
        ...args.todo,
        complete: !!args.todo.complete
      }
      console.log("added todo is ", JSON.stringify(todo, null, 2))
      store.todos.push(todo)
      return todo
    },
    returnBoolean: (root, args, context) => {
      return args.toReturn
    }
  }
}

module.exports = {
  typeDefs,
  resolvers,
  context: (headers, secrets) => {
    return {
      headers,
      secrets
    }
  }
}
