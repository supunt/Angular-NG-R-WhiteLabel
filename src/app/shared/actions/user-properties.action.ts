import { createAction, props } from '@ngrx/store';
import { Property } from '../models/export';


// ---------------------------------------------------------------------------------------------------------------------
export const GetPropertiesAction = createAction('[Property] - Get Property');

// Subscribed by effects
export const BeginGetPropertiesAction = createAction('[Property] - Begin Get Property');

// Called back by Effects
export const SuccessGetPropertiesAction = createAction(
  '[Property] - Success Get Property',
  props<{ payload: Property[] }>()
);

// ---------------------------------------------------------------------------------------------------------------------
// Subscribed by effects
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
// Subscribed by effects
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
