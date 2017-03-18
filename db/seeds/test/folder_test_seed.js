exports.seed = function(knex, Promise) {
  return knex('folders').del()
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        name: 'Animals',
        created_at: new Date
      }),
      knex('folders').insert({
        name: 'Food',
        created_at: new Date
      })
    ]);
  });
};
