const jwt = require('jsonwebtoken')

const JWT_SECRET = 'HXrWrUcbm6QrrN5AnQb52mrT8yszYyzhP2lYYOXEERg'

async function createJwt(user) {
  const token = await jwt.sign(user, JWT_SECRET)
  return token
}

async function verifyJwt(token) {
  const user = jwt.verify(token, JWT_SECRET)
  return user
}



module.exports = {
  createJwt,
  verifyJwt
}