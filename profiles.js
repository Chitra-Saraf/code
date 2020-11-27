//FAKE RESPONSE TO TRY GET OPERATION
const { Router } = require('express')
const { userAuthViaToken} = require('../../middlewares/auth')
const route = Router()


const {getProfile, FollowUser, Unfollow } = require("../../controllers/profiles")

//Get my profile 
route.get('/myprofile', userAuthViaToken, async ( req , res) => {
  console.log(req.body.user)
  if (req.user){

      try {
          const profile = await getProfile(req.user.username);
          res.send(profile);
        } catch (err) {
          res.status(403).send({
            errors: {
              body: [ err.message ]
            }
          })
        }
      }
  })
  

  //Get any user's profile 
route.get('/:username', async (req, res) => {
  try {
      const profile = await getProfile(req.params.username);
      res.send(profile);
    } catch (err) {
      res.status(403).send({
        errors: {
          body: [ err.message ]
        }
      })
    }
})

//Follow user
route.post('/:username/follow',userAuthViaToken, async (req, res) => {
  try {
      const flw = await FollowUser(req.params.username, req.user.username);
       res.send({
        flw,
        message: "User followed successfully"
      })
   } catch (err) {
      res.status(403).send({
        errors: {
          body: [ err.message ]
        }
      })
    }
})

//Unfollow User
route.delete('/:username/unfollow',userAuthViaToken, async (req, res) => {
  try {
      const unflw = await Unfollow(req.params.username, req.user.username);
      res.send({ unflw
      })
   } catch (err) {
      res.status(403).send({
        errors: {
          body: [ err.message ]
        }
      })
    }
})



 module.exports = route
