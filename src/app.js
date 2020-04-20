const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  
  var Likes = 0;

  const repositorie = { id: uuid(), title, url, techs, Likes }

  try {
    repositories.push(repositorie);
    console.log('Success');
  }catch(err) {
    return response.json(err);
  }

  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoditorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  if(repoditorieIndex < 0) {
    return response.status(400).json({error: 'This id does not match anyone'});
  } 

  const repositorie = {
    title, 
    url, 
    techs
  } = request.body;

  repositories[repoditorieIndex] = repositorie;
  return response.json(repositorie)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  if(repositorieIndex < 0) {
    return response.status(400).json({error: 'This id does not match with anyone'});
  } 

  repositories.splice(repositorieIndex, 1);
  return response.status(200).json('Success delete');
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const idIndexRepository = repositories.findIndex(repositorie => repositorie.id === id);

  if(idIndexRepository < 0) {
    return response.status(400).json({error: 'This id does not match with anyone'});
  }

  const repositorieLike = repositories.forEach(repositore => repositore.Likes ++);

  return response.json(repositorieLike);

});

module.exports = app;
