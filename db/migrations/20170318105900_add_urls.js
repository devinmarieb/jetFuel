
exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.createTable('urls', function(table){
      table.increments('id').primary();
      table.string('longURL');
      table.string('shortenedURL');
      table.integer('clicks')
      table.integer('folderID')
           .references('id')
           .inTable('folders');

      table.timestamps();
  })
])
};

exports.down = function(knex, Promise) {
      return Promise.all([
          knex.schema.dropTable('urls'),
      ])
};
