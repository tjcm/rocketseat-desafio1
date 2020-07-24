const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4')


const app = express();

app.use(express.json());
app.use(cors());

function validateProjectId(request, response, next){
  const { id } = request.params;
  if (isUuid(id)){
    return next();
  }
  return response.status(400).json({ error: 'Invalid code'})
}

app.use('/repositories/:id', validateProjectId)

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const repository = { id:uuid(), title, url, techs, likes: 0}
  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body
  const { id } = request.params

  let repIndex = repositories.findIndex( rep => rep.id == id)
  
  if(repIndex<0){
    return response.status(400).json( { error: "Repository not found." })
  }

  const { likes } = repositories[repIndex]
  const novoRep = {
    id,
    title,
    url,
    techs,
    likes
  }
  repositories[repIndex] = novoRep

  return response.json( novoRep )
});


app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params

  let repIndex = repositories.findIndex( rep => rep.id == id)
  
  if(repIndex<0){
    return response.status(400).json( { error: "Repository not found." })
  }

  repositories.splice(repIndex,1);

  return response.status(204).json()

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params
  let repIndex = repositories.findIndex( rep => rep.id == id)
  
  if(repIndex<0){
    return response.status(400).json( { error: "Repository not found." })
  }

  repositories[repIndex].likes++

  return response.json(repositories[repIndex])
});

module.exports = app;

// app.listen(3333, ()=>{
//  console.log('Mexeu no beque 🍁')
//});