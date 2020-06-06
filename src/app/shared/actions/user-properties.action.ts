import { createAction, props } from '@ngrx/store';
import { Property } from '../models/export';


// ---------------------------------------------------------------------------------------------------------------------
export const GetPropertiesAction = createAction('[Property] - Get Property');

export const BeginGetPropertiesAction = createAction('[Property] - Begin Get Property');

export const SuccessGetPropertiesAction = createAction(
  '[Property] - Success Get Property',
  props<{ payload: Property[] }>()
);

// ---------------------------------------------------------------------------------------------------------------------
// Admin actions
export const GetPropertiesOfUserAction = createAction('[Property] - Get Properties Of User');

export const BeginGetPropertiesOfUserAction = createAction(
  '[Property] - Begin Get Properties Of User',
  props<{ userName: string }>()
);

export const SuccessGetPropertiesOfUserAction = createAction(
  '[Property] - Success Get Property',
  props<{ userName: string, payload: Property[] }>()
);

// ---------------------------------------------------------------------------------------------------------------------
export const BeginSavePropertyAction = createAction(
  '[Property] - Begin Save Property',
  props<{ payload: Property }>()
);

// Called back by Effects
export const SuccessSavePropertyAction = createAction(
  '[Property] - Success Save Property',
  props<{ payload: Property }>()
);

// ---------------------------------------------------------------------------------------------------------------------
export const BeginRemovePropertyAction = createAction(
  '[Property] - Begin Remove Property',
  props<{ payload: Property }>()
);

// Called back by Effects
export const SuccessRemovePropertyAction = createAction(
  '[Property] - Success Remove Property',
  props<{ payload: Property }>()
);


// ---------------------------------------------------------------------------------------------------------------------
export const ErrorPropertyAction = createAction('[Property] - Error', props<Error>());
