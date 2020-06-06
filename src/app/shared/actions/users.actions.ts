import { createAction, props } from '@ngrx/store';
import { User } from '../models/export';


// ---------------------------------------------------------------------------------------------------------------------
export const GetUserAction = createAction('[User] - Get Users');

export const BeginGetUserAction = createAction('[User] - Begin Get Users');

export const SuccessGetUserAction = createAction(
  '[User] - Success Get Users',
  props<{ payload: User[] }>()
);

// ---------------------------------------------------------------------------------------------------------------------
export const BeginSaveUserAction = createAction(
  '[User] - Begin Save User',
  props<{ payload: User }>()
);

// Called back by Effects
export const SuccessSaveUserAction = createAction(
  '[User] - Success Save User',
  props<{ payload: User }>()
);


// ---------------------------------------------------------------------------------------------------------------------
export const BeginRemoveUserAction = createAction(
  '[User] - Begin Remove User',
  props<{ payload: User }>()
);

// Called back by Effects
export const SuccessRemoveUserAction = createAction(
  '[User] - Success Remove User',
  props<{ payload: User }>()
);

// ---------------------------------------------------------------------------------------------------------------------
export const ErrorUserAction = createAction('[User] - Error', props<Error>());
