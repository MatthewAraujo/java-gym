exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('gym').del();
  
    // Inserts seed entries
    await knex('gym').insert([
      {
        gym_name: 'Fitness World',
        address: '123 Main St',
        city: 'New York',
        operating_hours: 'Mon-Fri 6am-10pm'
      },
      {
        gym_name: 'Healthy Life Gym',
        address: '456 Elm St',
        city: 'Los Angeles',
        operating_hours: 'Mon-Sun 5am-11pm'
      },
      {
        gym_name: 'Muscle Factory',
        address: '789 Oak St',
        city: 'Chicago',
        operating_hours: 'Mon-Fri 6am-10pm'
      },
      {
        gym_name: 'Strength Center',
        address: '101 Pine St',
        city: 'Houston',
        operating_hours: 'Mon-Sun 24 hours'
      },
      {
        gym_name: 'Flex Gym',
        address: '202 Maple St',
        city: 'Phoenix',
        operating_hours: 'Mon-Sun 6am-12am'
      },
      {
        gym_name: 'Powerhouse Gym',
        address: '303 Cedar St',
        city: 'Philadelphia',
        operating_hours: 'Mon-Fri 5am-11pm'
      },
      {
        gym_name: 'Body Building Hub',
        address: '404 Birch St',
        city: 'San Antonio',
        operating_hours: 'Mon-Sun 6am-10pm'
      },
      {
        gym_name: 'Peak Performance',
        address: '505 Willow St',
        city: 'San Diego',
        operating_hours: 'Mon-Fri 5am-11pm'
      },
      {
        gym_name: 'The Gymnasium',
        address: '606 Aspen St',
        city: 'Dallas',
        operating_hours: 'Mon-Sun 6am-10pm'
      },
      {
        gym_name: 'Fitness Pro',
        address: '707 Hickory St',
        city: 'San Jose',
        operating_hours: 'Mon-Fri 5am-11pm'
      }
    ]);
  };