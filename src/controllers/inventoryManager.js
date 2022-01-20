const db = require("../db.js");
const Parser = require("json2csv").Parser;

let inventoryController = {};

inventoryController.getItems = function (req, res) {
  const successMessage = "Items found";
  db.collection("inventory")
    .get()
    .then((snapshot) => {
      res.status(200).json({
        message: successMessage,
        success: true,
        data: snapshot.docs.map((doc) => {
          return {
            name: doc.data().name,
            quantity: doc.data().quantity,
            quantity: doc.data().date_added,
            id: doc.id,
          };
        }),
      });
      return;
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    });
};

inventoryController.updateItem = function (req, res) {
  const data = req.body;
  if (
    !req.params.id ||
    !data.hasOwnProperty("name") ||
    !data.hasOwnProperty("quantity") ||
    !data.hasOwnProperty("date_added")
  ) {
    return res.status(400).json({
      success: false,
      message: "Requred fied not found",
    });
  }
  const id = req.params.id ? req.params.id : req.query.id;
  db.collection("inventory")
    .doc(id)
    .update(data)
    .then(function (result) {
      console.log("Item updated:", result);
      res.status(200).json({
        message: "Item updated",
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        err: err.details,
      });
    });
};

inventoryController.addItem = function (req, res) {
  const data = req.body;
  if (
    !(Object.keys(data).length === 3) ||
    !data.hasOwnProperty("name") ||
    !data.hasOwnProperty("quantity") ||
    !data.hasOwnProperty("date_added")
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid properties",
    });
  }
  db.collection("inventory")
    .add(data)
    .then(function (docRef) {
      console.log("Item added with ID: ", docRef.id);
      res.status(200).json({
        message: "Item added",
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        err: err.details,
      });
    });
};

inventoryController.deleteItem = function (req, res) {
  if (req.params.id) {
    const id = req.params.id ? req.params.id : req.query.id;
    db.collection("inventory")
      .doc(id)
      .delete()
      .then(function (result) {
        console.log("Item deleted : ", result);
        res.status(200).json({
          message: "Item delted",
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      });
  } else {
    res.status(400).json({
      message: "Bad request",
      success: false,
    });
  }
};

inventoryController.exportExcel = function (req, res) {
  db.collection("inventory")
    .get()
    .then((snapshot) => {
      let data = snapshot.docs.map((doc) => {
        return {
          name: doc.data().name,
          quantity: doc.data().quantity,
          date_added: doc.data().date_added,
          id: doc.id,
        };
      });
      var fields = ["id", "name", "quantity", "date_added"];
      const json2csv = new Parser({ fields });
      const csv = json2csv.parse(data);
      res.header("Content-Type", "text/csv");
      res.attachment("fileName.csv");
      return res.send(csv);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    });
};

module.exports = inventoryController;
