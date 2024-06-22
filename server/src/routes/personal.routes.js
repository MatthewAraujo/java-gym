const { Router } = require("express");

const PersonalController = require("../controllers/PersonalController");


const personalRoutes = Router();

const personalController = new PersonalController();

personalRoutes.post("/", personalController.create);
personalRoutes.get("/", personalController.index);
personalRoutes.put("/:id", personalController.update);
personalRoutes.delete("/:id", personalController.delete);

module.exports = personalRoutes;    