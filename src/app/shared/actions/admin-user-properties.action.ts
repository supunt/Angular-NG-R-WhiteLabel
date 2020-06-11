import { createAction, props } from '@ngrx/store';
import { Property } from '../models/export';


// ---------------------------------------------------------------------------------------------------------------------
// Admin actions
export const GetPropertiesOfUserAction = createAction(
  '[Property] - Get Properties Of User',
  props<{ userId: string}>()
);

// Subscribed by effects
export const BeginGetPropertiesOfUserAction = createAction(
  '[Property] - Begin Get Properties Of User',
  props<{ userId: string }>()
);

// Called back by Effects
export const SuccessGetPropertiesOfUserAction = createAction(
  '[Property] - Success Get Properties Of User',
  props<{ userId: string, payload: Property[] }>()
);

// ---------------------------------------------------------------------------------------------------------------------
// Subscribed by effects
export const BeginSavePropertyOfUserAction = createAction(
  '[Property] - Begin Save Property Of User',
  props<{ userId: string, payload: Property }>()
);

// Called back by Effects
export const SuccessAddPropertyToUserAction = createAction(
  '[Property] - Success Save Property Of User',
  props<{ userId: string, payload: Property }>()
);

// ---------------------------------------------------------------------------------------------------------------------
// Subscribed by effects
export const BeginRemovePropertyOfUserAction = createAction(
  '[Property] - Begin Remove Property Of User',
  props<{ userId: string, payload: Property }>()
);

// Called back by Effects
export const SuccessRemovePropertyOfUserAction = createAction(
  '[Property] - Success Remove Property',
  props<{ userId: string, payload: Property }>()
);


// ---------------------------------------------------------------------------------------------------------------------
export const ErrorPropertyOfUserAction = createAction('[Property] - Error', props<Error>());
