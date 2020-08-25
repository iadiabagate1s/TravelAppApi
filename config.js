const SECRET_KEY = process.env.SECRET_KEY || "test";

const PORT = +process.env.PORT || 5000;

const BCRYPT_WORK = 12

const TICKET_MASTER_KEY = 'OR7t52i81Lw1AsKFuoEiF86z9ASI6hVT'



module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK,
  TICKET_MASTER_KEY
};