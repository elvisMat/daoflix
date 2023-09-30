/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pehom8t5m6dqfzc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a9cnqdsm",
    "name": "proposerAddress",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pehom8t5m6dqfzc")

  // remove
  collection.schema.removeField("a9cnqdsm")

  return dao.saveCollection(collection)
})
