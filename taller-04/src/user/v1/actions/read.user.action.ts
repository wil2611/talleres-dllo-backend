import { UserModel, UserType } from '../models/user.model';

// DECLARE ACTION FUNCTION
async function readUsersAction(): Promise<UserType[]> {
	const results = await UserModel;
	const data: UserType[] = JSON.parse(results.toString());

	return data;
}

// EXPORT ACTION FUNCTION
export default readUsersAction;
