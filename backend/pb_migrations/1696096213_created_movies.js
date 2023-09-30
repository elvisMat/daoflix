/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ieujeptn82k8qu4",
    "created": "2023-09-30 17:50:13.039Z",
    "updated": "2023-09-30 17:50:13.039Z",
    "name": "movies",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rtsaxrv0",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "tjz9z8nj",
        "name": "stage",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "proposed",
            "pre-production",
            "production",
            "post-production"
          ]
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ieujeptn82k8qu4");

  return dao.deleteCollection(collection);
})
