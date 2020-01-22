import express from 'express';

const server = express();
server.use(express.json());

let projetos = []
//Middleware
function ExistsIdProject(req, res, next) {
  const index = projetos.findIndex(item => item.id === Number(req.params.id))
  if (index !== -1) {
    req.index = index
    return next()
  }
  return res.status(401).json({ error: 'Não foi possível continuar!' })
}
//Cadastra
server.post('/projects', (req, res) => {
  projetos.push(req.body);
  return res.json(req.body);
});

//Atualiza
server.put('/projects/:id', ExistsIdProject, (req, res) => {
  projetos[req.index].title = req.body.title;
  return res.json(projetos)
})

//Deleta
server.delete('/projects/:id', ExistsIdProject, (req, res) => {
  projetos.splice(req.index, 1)
  return res.json(projetos)
})

//Lista
server.get('/projects', (req, res) => {
  return res.json(projetos);
});

//Adiciona novas tasks
server.post('/projects/:id/tasks', ExistsIdProject, (req, res) => {
  projetos[req.index].tasks.push(req.body.title)
  return res.json(projetos)
})

server.listen(5001);