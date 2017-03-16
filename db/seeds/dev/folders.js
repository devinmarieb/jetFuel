exports.seed = function(knex, Promise) {
  return knex('folders').del()
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        // id: 1,
        name: 'Animals',
        created_at: new Date
      }),
      knex('folders').insert({
        // id: 2,
        name: 'Food',
        created_at: new Date
      })
    ]);
  });
};
