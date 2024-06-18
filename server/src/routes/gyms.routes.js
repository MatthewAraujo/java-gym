const { Router } = require("express");

const GymController = require("../controllers/GymController");

const gymRoutes = Router();

const gymController = new GymController();


gymRoutes.get("/", GymController.index);
gymRoutes.post("/", GymController.create);
gymRoutes.put("/:id", GymController.update);
gymRoutes.delete("/:id", GymController.delete);

module.exports = gymRoutes;