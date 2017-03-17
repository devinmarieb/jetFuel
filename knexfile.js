module.exports = {
  development: {
    client: 'pg',
    connection:postgres://jnrxchlbhgxtcu:3a2daac4dc7ae0bf85177ce1e5236c0c823e218b887a82bc61255f150a939587@ec2-50-19-83-146.compute-1.amazonaws.com:5432/d87q1a6m4vj4gp + `?ssl=true`,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection:'postgres://localhost/jetfuel_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production'
    },
    useNullAsDefault: true
  }
};
