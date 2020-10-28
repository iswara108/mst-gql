const abstractDAO = require("./abstractDAO.js")

class usersDAO extends abstractDAO {
  constructor() {
    super()
  }
  COLLECTION_NAME = "users"

  async init(client, dbName) {
    const options = {
      validator: {
        $and: [
          { id: { $type: "objectId" } },
          { createdAt: { $type: "date" } },
          { updatedAt: { $type: "date" } },
          { email: { $regex: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i } }
          // { token: { $type: "string" } },
        ]
      }
    }
    await super.init(client, dbName, options)
  }
}

module.exports = new usersDAO()
