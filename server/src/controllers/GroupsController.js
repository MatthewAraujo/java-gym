const knex = require("../database");

class GroupsController {
  async index(request, response) {
    try {
      const groups = await knex("exercises").distinct("group").orderBy("group");
      
      const formattedGroups = groups.map(item => item.group);

      return response.json(formattedGroups);
    } catch (error) {
      console.error('Error fetching groups:', error);
      return response.status(500).json({ message: 'Erro ao buscar os grupos musculares' });
    }
  }
}

module.exports = GroupsController;
