import fs from 'fs/promises';

// DECLARE MODEL TYPE
type UserType = {
	id: number;
	name: string;
	hobbies: Array<string>;
	years: number;
	team: string;
	faction: string;
};

// Read file
const UserModel = fs.readFile('./data/23-taller-04-datos.json');

// EXPORT ALL
export { UserModel, UserType };
