/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pehom8t5m6dqfzc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "reuazc0p",
    "name": "url",
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
  collection.schema.removeField("reuazc0p")

  return dao.saveCollection(collection)
})
