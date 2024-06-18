const knex = require("../database");

class PersonalController {
    async index(request, response) {
        const { user_id } = request.params;
    
        const personal = await knex("personal")
        .where({ user_id })
        .select("id", "name", "email", "phone", "avatar");
    
        return response.json(personal);
    }
    
    async show(request, response) {
        const { id } = request.params;
    
        const personal = await knex("personal")
        .where({ id })
        .select("id", "name", "email", "phone", "avatar")
        .first();
    
        if (!personal) {
        return response.status(404).json({ error: "Personal not found" });
        }
    
        return response.json(personal);
    }
    
    async create(request, response) {
        const { name, email, phone } = request.body;
        const user_id = request.user.id;
    
        await knex("personal").insert({
        name,
        email,
        phone,
        user_id,
        });
    
        return response.status(201).json();
    }
    
    async update(request, response) {
        const { name, email, phone } = request.body;
        const { id } = request.params;
    
        await knex("personal")
        .where({ id })
        .update({
            name,
            email,
            phone,
        });
    
        return response.json();
    }
    
    async delete(request, response) {
        const { id } = request.params;
    
        await knex("personal")
        .where({ id })
        .del();
    
        return response.json();
    }
}

module.exports = PersonalController;