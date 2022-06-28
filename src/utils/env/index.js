if ( !process.env.TOKEN_KEY) throw new Error (`TOKEN_KEY must be configured.`);
const tokenKey = process.env.TOKEN_KEY

const port = process.env.PORT || 3000;

if ( !process.env.DATABASE_URL || !(  process.env.DATABASE_USER &&  process.env.DATABASE_PASS &&  process.env.DATABASE_SCHEMA )) throw new Error (`DATABASE_URL or DATABASE_USER and DATABASE_PASS and DATABASE_SCHEMA must be configured.`);
const databaseUrl = process.env.DATABASE_URL 
? process.env.DATABASE_URL 
: `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@cluster0.s0im9.mongodb.net/${process.env.DATABASE_SCHEMA}?retryWrites=true&w=majority`;

module.exports = {tokenKey, port, databaseUrl};