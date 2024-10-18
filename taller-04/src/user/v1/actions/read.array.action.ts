import { UserArrayType, UsersArrayModel } from '../models/array.model';

async function readArrayUsersAction(): Promise<UserArrayType[]> {
	return UsersArrayModel;
}

export default readArrayUsersAction;