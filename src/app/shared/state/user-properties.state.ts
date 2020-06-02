import { User } from '../models/user';
import { Property } from '../models/export';

export default class UserPropertiesState {
  userProperties: Array<Property>;
  userPropertiesError: Error;
}

export const initializeState = (): UserPropertiesState => {
  return {
    userProperties: Array<Property>(),
    userPropertiesError: null
  };
};