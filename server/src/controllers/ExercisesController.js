const knex = require("../database");

class ExercisesController {
  async index(request, response) {
    const { group } = request.params;

    const exercises = await knex("exercises").where({ group }).orderBy("name");

    return response.json(exercises);
  }

  async show(request, response) {
    const { id } = request.params;

    const exercise = await knex("exercises").where({ id }).first();

    return response.json(exercise);
  }


  async create(request, response) {
    const { name, series, repetitions, group } = request.body;


    await knex("exercises").insert({
        name,
        series,
        repetitions,
        group,
    });

    return response.status(201).json();
}

  
}

module.exports = ExercisesController;