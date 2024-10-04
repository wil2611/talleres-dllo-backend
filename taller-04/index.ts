import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());
const port = 3000;

// Simulando una base de datos de usuarios
interface User {
  id: number;
  name: string;
  carrera?: string;
  hobbies?: string[];
  teamExperience?: number;
  faction?: string;
}

const users: User[] = [
  { id: 1, name: 'Robin Restrepo', carrera: 'Psicologia', hobbies: ['reading'], teamExperience: 5, faction: 'red' },
  { id: 2, name: 'Alice', carrera: 'Ingeniería', hobbies: ['swimming'], teamExperience: 3, faction: 'blue' },
  { id: 3, name: 'Bob', carrera: 'Arquitectura', hobbies: ['cycling'], teamExperience: 4, faction: 'red' },
];

// Punto 1: Endpoint que retorne los usuarios con un hobby específico
app.get('/users/hobby', (req: any, res: any) => {
  const hobby = req.query.hobby as string;

  if (!hobby) {
    return res.status(400).json({ error: 'Hobby parameter is required' });
  }

  const usersWithHobby = users.filter((user) => user.hobbies?.includes(hobby));

  if (usersWithHobby.length === 0) {
    return res.status(404).json({ error: 'No users found with the given hobby' });
  }

  return res.json(usersWithHobby);
});

// Punto 2: Endpoint que verifica si un usuario con un ID específico existe
app.get('/users/exists', (req: any, res: any) => {
  const userId = parseInt(req.query.id as string);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'ID parameter is required and must be a number' });
  }

  const userExists = users.some((user) => user.id === userId);

  return res.json({ exists: userExists });
});

// Punto 3: Endpoint que retorna la experiencia total del equipo de pilotos enviado
app.get('/users/team-experience', (req: any, res: any) => {
  const teamIds = (req.query.ids as string)?.split(',').map((id) => parseInt(id));

  if (!teamIds || teamIds.some(isNaN)) {
    return res.status(400).json({ error: 'Valid team IDs are required' });
  }

  const teamExperience = users
    .filter((user) => teamIds.includes(user.id))
    .reduce((total, user) => total + (user.teamExperience || 0), 0);

  return res.json({ totalExperience: teamExperience });
});

// Punto 4: Endpoint que retorna los pilotos de una facción específica
app.get('/users/by-faction', (req: any, res: any) => {
  const faction = req.query.faction as string;

  if (!faction) {
    return res.status(400).json({ error: 'Faction parameter is required' });
  }

  const pilotsInFaction = users.filter((user) => user.faction === faction);

  if (pilotsInFaction.length === 0) {
    return res.status(404).json({ error: 'No pilots found for the given faction' });
  }

  return res.json(pilotsInFaction);
});

// Punto 5: Endpoint que registra un nuevo usuario
app.post('/users', (req: any, res: any) => {
  const { id, name, carrera, hobbies, teamExperience, faction } = req.body as User;

  if (!id || !name) {
    return res.status(400).json({ error: 'ID and name are required' });
  }

  const userExists = users.some((user) => user.id === id);
  if (userExists) {
    return res.status(400).json({ error: 'User with this ID already exists' });
  }

  const newUser: User = { id, name, carrera, hobbies, teamExperience, faction };
  users.push(newUser);

  return res.status(201).json(newUser);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

