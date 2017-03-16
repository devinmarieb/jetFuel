exports.seed = function(knex, Promise) {
  return knex('urls').del()
  .then(() => {
    return Promise.all([
      knex('urls').insert({
        // id: 1,
        longURL: "http://www.google.com",
        shortenedURL: "qztx",
        folderID: 1,
        clicks: 0,
        created_at: new Date
      }),
      knex('urls').insert({
        // id: 2,
        longURL: "http://www.google.com",
        shortenedURL: "uopf",
        folderID: 1,
        clicks: 0,
        created_at: new Date
      }),
      knex('urls').insert({
        // id: 3,
        longURL: "http://www.google.com",
        shortenedURL: "qvip",
        folderID: 2,
        clicks: 0,
        created_at: new Date
      })
    ]);
  });
};
