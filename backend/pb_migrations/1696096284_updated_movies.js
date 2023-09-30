/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ieujeptn82k8qu4")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_X3fJow4` ON `movies` (`contractId`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q0azf3xp",
    "name": "contractId",
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
    "id": "xsppvfed",
    "name": "budget",
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
  const collection = dao.findCollectionByNameOrId("ieujeptn82k8qu4")

  collection.indexes = []

  // remove
  collection.schema.removeField("q0azf3xp")

  // remove
  collection.schema.removeField("xsppvfed")

  return dao.saveCollection(collection)
})
