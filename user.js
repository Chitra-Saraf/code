const { Router } = require('express')
const { userAuthViaToken} = require('../../middlewares/auth')

const { updateUser } = require('../../controllers/users') ;


const route = Router()


route.get('/', userAuthViaToken, (req, res) => {
  if (req.user) {
    res.send(req.user)
  }
})

route.put('/', userAuthViaToken, async ( req , res) => {
  console.log(req.body.user)
  if (req.user){

      try {
          const updatedUser = await updateUser(req.body.user);
          res.send(updatedUser);
        } catch (err) {
          res.status(403).send({
            errors: {
              body: [ err.message ]
            }
          })
        }
        
  }
  
})

module.exports = route

