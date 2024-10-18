import { Router, Request, Response } from 'express';
import {
	addUser,
	existUser,
	readUsers,
	readUsersByFaction,
	readUsersWithHobby,
	teamExperience,
} from '../controllers/user.controller';

// INIT ROUTES
const userRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS
async function GetUsers(request: Request, response: Response) {
	const users = await readUsers();

	return response.status(200).json({
		message: 'Success.',
		data: users,
	});
}

async function GetUsersWithHobby(request: Request, response: Response) {
	const { type } = request.query;

	if (!type || typeof type !== 'string') {
		return response.status(400).json({
			error: 'Error.',
			data: {},
		});
	}

	const users = await readUsersWithHobby(type);

	return response.status(200).json({
		message: 'Success.',
		data: users,
	});
}

async function GetUserExistence(request: Request, response: Response) {
	const params = request.query;
	let id;

	try {
		if (params.id && typeof params.id === 'string') {
			id = parseInt(params.id);
		} else {
			return response.status(400).json({
				error: 'Add a valid ID.',
				data: '',
			});
		}
	} catch (error) {
		console.log(`Error. ${error}`);
		return response.status(500).json({
			error: 'Error.',
			data: '',
		});
	}

	const users = await existUser(id);

	return response.status(200).json({
		message: 'Success.',
		data: users,
	});
}

async function GetTeamExperience(request: Request, response: Response) {
	const { team } = request.query;

	if (!team || typeof team !== 'string') {
		return response.status(400).json({
			error: 'Error.',
			data: {},
		});
	}

	const time = await teamExperience(team);

	return response.status(200).json({
		message: 'Success.',
		data: time,
	});
}

async function GetUsersByFaction(request: Request, response: Response) {
	const { faction } = request.query;

	if (!faction || typeof faction !== 'string') {
		return response.status(400).json({
			error: 'Error.',
			data: {},
		});
	}

	const users = await readUsersByFaction(faction);

	return response.status(200).json({
		message: 'Success.',
		data: users,
	});
}

async function PostUser(request: Request, response: Response) {
	const { id, name, carrera } = request.body;

	if (!id || !name || !carrera) {
		return response.status(400).json({
			error: 'Error. Missing data to register the user.',
			data: {},
		});
	}

	if (
		typeof id !== 'number' ||
		typeof name !== 'string' ||
		typeof carrera !== 'string'
	) {
		return response.status(400).json({
			error: 'Error. Invalid data.',
			data: {},
		});
	}

	const users = await addUser(id, name, carrera);
	if (!users)
		return response.status(400).json({
			error: 'Error. ID not valid or already exists.',
			data: {},
		});

	return response.status(200).json({
		message: 'Success.',
		data: users,
	});
}

// DECLARE ENDPOINTS
userRoutes.get('/', GetUsers);
userRoutes.get('/hobby', GetUsersWithHobby);
userRoutes.get('/exists', GetUserExistence);
userRoutes.get('/team-experience', GetTeamExperience);
userRoutes.get('/by-faction', GetUsersByFaction);
userRoutes.post('/', PostUser);

// EXPORT ROUTES
export default userRoutes;
