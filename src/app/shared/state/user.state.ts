import { User } from '../models/user';

export default class LoggedInUserState {
  loggedinUser: User;
  loggedinUserError: Error;
}

export const initializeState = (): LoggedInUserState => {
  return { loggedinUser: null, loggedinUserError: null };
};