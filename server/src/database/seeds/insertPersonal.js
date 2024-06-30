exports.seed = async function (knex) {
    await knex('personal').del()
    await knex('personal').insert([
        {
            name: 'Matthew Araujo',
            email: 'matthew@gmail.com',
            phone: '11999999999',
            avatar: "https://avatars.githubusercontent.com/u/90223014?v=4"
        },
        {
            name: 'Renan Figueiredo',
            email: 'renan@gmail.com',
            phone: '11999999999',
            avatar: "https://avatars.githubusercontent.com/u/96787652?v=4"
        },
        {
            name: 'Joao Pedro Dorea',
            email: 'joao@gmail.com',
            phone: '11999999999',
            avatar: "https://avatars.githubusercontent.com/u/84815558?v=4"
        },
        {
            name: 'Luigi Porto',
            email: 'luigi@gmail.com',
            phone: '11999999999',
            avatar: "https://avatars.githubusercontent.com/u/103684635?v=4"
        },
    ])
}