import addArrayUsersAction from '../actions/add.array.action';
import readArrayUsersAction from '../actions/read.array.action';
import readUserAction from '../actions/read.user.action';
import { UserArrayType } from '../models/array.model';
import { UserType } from '../models/user.model';

// DECLARE CONTROLLER FUNCTIONS
async function readUsers(): Promise<UserType[]> {
	const users = await readUserAction();

	return users;
}

async function readUsersWithHobby(type: string): Promise<UserType[]> {
	const users = await readUserAction();

	return users.filter((user) => user.hobbies.includes(type));
}

async function existUser(id: number): Promise<boolean> {
	const users = await readUserAction();

	return users.some((user) => user.id === id);
}

async function teamExperience(team: string): Promise<number> {
	const users = await readUserAction();

	return users
		.filter((u) => u.team === team)
		.reduce((prev, current) => prev + current.years, 0);
}

async function readUsersByFaction(faction: string): Promise<UserType[]> {
	const users = await readUserAction();

	return users.filter((user) => user.faction === faction);
}

async function addUser(
	id: number,
	name: string,
	carrera: string
): Promise<UserArrayType[] | undefined> {
	try {
		await addArrayUsersAction({ id, name, carrera });

		const users = await readArrayUsersAction();
		return users;
	} catch {
		return;
	}
}

// EXPORT CONTROLLER FUNCTIONS
export {
	readUsers,
	readUsersWithHobby,
	existUser,
	teamExperience,
	readUsersByFaction,
	addUser,
};
