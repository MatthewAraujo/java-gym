exports.seed = async function (knex) {
    await knex('personal').del()
    await knex('personal').insert([
        {
            name: 'João',
            email: 'joao@gmail.com',
            phone: '11999999999',
        },
        {
            name: 'Maria',
            email: 'maria@gmail.com',
            phone: '11999999999',
        },
        {
            name: 'Carlos',
            email: 'carlos@gmail.com',
            phone: '11999999999',
        },
        {
            name: 'renan',
            email: 'renan@gmail.com',
            phone: '11999999999',
        },
        {
            name: 'Luigi',
            email: 'luigi@gmail.com',
            phone: '11999999999',
        },
        {
            name: 'Jonas',
            email: 'jonas@gmail.com',
            phone: '11999999999',
        },
    ])
}