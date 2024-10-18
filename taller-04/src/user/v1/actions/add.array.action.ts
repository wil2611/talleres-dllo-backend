import { UserArrayType, UsersArrayModel } from '../models/array.model';

async function addArrayUsersAction(user: UserArrayType) {
    if (UsersArrayModel.some((u) => u.id === user.id)) throw Error;
    
	UsersArrayModel.push(user);
}

export default addArrayUsersAction;
