const abstractDAO = require("./abstractDAO.js")

class tripsDAO extends abstractDAO {
  COLLECTION_NAME = "trips"

  async init(client, dbName) {
    const options = {
      validator: {
        $and: [
          { id: { $type: "objectId", $exists: 1 } },
          { createdAt: { $type: "date" } },
          { updatedAt: { $type: "date" } },
          // { launchId: { $type: "int" } },
          { userId: { $type: "objectId" } }
        ]
      }
    }
    await super.init(client, dbName, options)
  }
}

module.exports = new tripsDAO()
