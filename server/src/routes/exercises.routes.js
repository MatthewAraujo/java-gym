const { Router } = require("express");

const ExercisesController = require("../controllers/ExercisesController");

const exercisesRoutes = Router();

const exercisesController = new ExercisesController();

exercisesRoutes.get("/bygroup/:group", exercisesController.index);
exercisesRoutes.get("/:id", exercisesController.show);
exercisesRoutes.post("/", exercisesController.create);

module.exports = exercisesRoutes;