import { User } from '../models/user';

export default class UsersState {
  users: User[];
  UserError: Error;
}

export const initializeState = (): UsersState => {
  return { users: [], UserError: null };
};
