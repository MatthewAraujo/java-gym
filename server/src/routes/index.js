const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const exercisesRouter = require("./exercises.routes");
const groupRouter = require("./group.routes");
const historyRouter = require("./history.routes");
const personalRouter = require("./personal.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);

routes.use("/exercises", exercisesRouter);
routes.use("/groups", groupRouter);
routes.use("/history", historyRouter);

routes.use("/personal", personalRouter)

module.exports = routes;