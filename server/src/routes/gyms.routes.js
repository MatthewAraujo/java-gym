const { Router } = require("express");

const GymController = require("../controllers/GymController");

const gymRoutes = Router();

const gymController = new GymController();


gymRoutes.get("/", gymController.index);
gymRoutes.get("/:id", gymController.show);
gymRoutes.post("/", gymController.create);
gymRoutes.put("/:id", gymController.update);
gymRoutes.delete("/:id", gymController.delete);

module.exports = gymRoutes;