/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "pehom8t5m6dqfzc",
    "created": "2023-09-30 12:55:21.964Z",
    "updated": "2023-09-30 12:55:21.964Z",
    "name": "proposals",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "uxcurkdp",
        "name": "proposalId",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("pehom8t5m6dqfzc");

  return dao.deleteCollection(collection);
})
