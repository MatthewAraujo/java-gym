const knex = require("../database");

class GymController {
    async index(request, response) {
        
        const gyms = await knex("gym")
            .select("gym_id", "gym_name", "address", "city", "operating_hours");
        return response.json(gyms);
    }
    
    async show(request, response) {
        const { id } = request.params;
    
        const gym = await knex("gym").where({ id }).first();
    
        return response.json(gym);
      }
    
    async create(request, response) {
        const { gym_name, address, city, operating_hours } = request.body;
    
        await knex("gym").insert({
            gym_name, 
            address, 
            city, 
            operating_hours
        });
    
        return response.status(201).json({ gym_id });
    }

    async update(request, response) {
        const { gym_name, address, city, operating_hours } = request.body;
        const { id } = request.params;
    
        await knex("gym")
        .where({ id })
        .update({
            gym_name, 
            address, 
            city, 
            operating_hours
        });
    
        return response.json();
    }
    
    async delete(request, response) {
        const { id } = request.params;
    
        await knex("gym")
        .where({ id })
        .del();
    
        return response.json();
    }
}

module.exports = GymController;