const mongoDB = require("mongodb")
class abstractDAO {
  async init(client, dbName, options = {}) {
    this.databaseName = dbName
    this.dbClient = client

    const existingCollections = await this.dbClient.db(dbName).collections()
    if (
      existingCollections
        .map((c) => c.collectionName)
        .some((coll) => coll === this.COLLECTION_NAME)
    )
      return (this.collection = existingCollections.find(
        (c) => c.collectionName === this.COLLECTION_NAME
      ))

    await this.dbClient
      .db(dbName)
      .createCollection(this.COLLECTION_NAME, options)

    this.collection = await client.db(dbName).collection(this.COLLECTION_NAME)
  }

  async destroy(filter) {
    await this.collection.deleteMany({ filter })
  }

  async drop() {
    if (!this.databaseName.match(/test/))
      /* c8 ignore next */
      throw new Error(
        `drop ${this.COLLECTION_NAME} should only be used in test mode`
      )
    await this.collection.drop()
  }
  // this should only be used when the expected result can be contained in memory as one chunk
  async findArray(filter, options = {}) {
    return await this.collection.find(filter, options).toArray()
  }
  async *findSequence(filter, options = {}) {
    const cursor = await this.collection.find(filter, options)

    while (await cursor.hasNext()) {
      yield await cursor.next()
    }
  }

  // this should only be used when the expected result can be contained in memory as one chunk
  async aggregateArray(pipeline, options = {}) {
    return await this.collection.aggregate(pipeline, options).toArray()
  }

  async *aggregateSequence(pipeline, options = {}) {
    const cursor = await this.collection.aggregate(pipeline, options)

    while (await cursor.hasNext()) {
      yield await cursor.next()
    }
  }

  async upsert(filter, newDocument, options = {}) {
    return await this.collection.replaceOne(filter, newDocument, {
      upsert: true,
      ...options
    })
  }

  initializeUnorderedBulkOp() {
    return this.collection.initializeUnorderedBulkOp()
  }

  async findOrCreate(filter) {
    const col = await this.collection.find(filter).toArray()
    if (col.length) return col
    this.collection.insertOne({
      id: mongoDB.ObjectID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...filter
    })
    return await this.collection.find(filter).toArray()
  }
}

module.exports = abstractDAO
