// DECLARE MODEL TYPE
type UserArrayType = {
	id: number;
	name: string;
	carrera: string;
};

// Load data
const UsersArrayModel = [
	{ id: 1, name: 'Robin Restrepo', carrera: 'Psicologia' },
];

// EXPORT ALL
export { UsersArrayModel, UserArrayType };
