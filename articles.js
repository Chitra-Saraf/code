
const { Router } = require('express')


const route = Router()

const { userAuthViaToken} = require('../../middlewares/auth')

const { createArticle, getArticle, deleteArticle, updateArticle , listArticles, feedArticles} = require('../../controllers/article') 



// Create article
route.post('/', userAuthViaToken , async function(req,res){
    console.log(req.body.article);
     console.log(req.user.username);
    if(req.user)
    {
      try {
        const createdArticle= await createArticle(req.body.article, req.user.username);
        res.send(createdArticle);
      } catch (err) {
        res.status(403).send({
          errors: {
            body: [ err.message ]
          }
        })
      }
    }
       
})


//GET Feed Articles
route.get('/feed',userAuthViaToken ,async (req,res) =>{
 
  const limit = req.query.limit;
  const offset = req.query.offset;

  if(req.user){
    try {
      const articles = await feedArticles(req.user.username,limit,offset);
      res.send(articles);
    } catch (err) {
      res.status(403).send({
        errors: {
          body: [ err.message ]
        }
      })
    }
  }
  
})

//Get Article using slug
route.get('/:slug', async (req, res) => {
    const gotArticle = await getArticle(req.params.slug)
    res.send(gotArticle)
  })
  
//Delete Article 
route.delete('/:slug' , userAuthViaToken , async function(req,res){
  if(req.user)
  {
    try {
      const deletedArticle = await deleteArticle(req.params.slug,req.user.username);
      res.send(deletedArticle);
    } catch (err) {
      res.status(403).send({
        errors: {
          body: [ err.message ]
        }
      })
    } 
  }
})


//Update Article   
route.put('/:slug' , userAuthViaToken , async function(req,res){
  if(req.user)
  {
    try {
      const updatedArticle = await updateArticle(req.params.slug,req.user.username,req.body.article);
      res.send(updatedArticle);
    } catch (err) {
      res.status(403).send({
        errors: {
          body: [ err.message ]
        }
      })
    } 
  }
})

//List Articles or get all articles 
route.get('/' ,  async function(req,res){ 
    
  try {
      const gettArticle = await listArticles(req.query.author,req.query.limit, req.query.offset);
      res.send(gettArticle);
    } catch (err) {
      res.status(403).send({
        errors: {
          body: [ err.message ]
        }
      })
    } 
})





module.exports = route