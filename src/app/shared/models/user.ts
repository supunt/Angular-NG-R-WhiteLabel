import { Property } from './address';

export class User {
  userName = '';
  userId = '';
  managedLocations: Property[] = [];
  admin = false;
  token = null;
  iconColor = 'red';
}
