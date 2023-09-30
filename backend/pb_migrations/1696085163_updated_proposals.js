/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pehom8t5m6dqfzc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m1zghywc",
    "name": "description",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8z1vo6lv",
    "name": "title",
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
  collection.schema.removeField("m1zghywc")

  // remove
  collection.schema.removeField("8z1vo6lv")

  return dao.saveCollection(collection)
})
