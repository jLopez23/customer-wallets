export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  hashRounds: parseInt(process.env.HASH_ROUNDS) || 10,
  pesoDollarValue: 0.00023,
  database: {
    address: process.env.DATABASE_ADDRESS,
  },
  jwt: {
    secretKey: process.env.SECRET_KEY,
    expiration: process.env.JWT_EXPIRATION,
  },
});
