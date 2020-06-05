import { Action, createReducer, on } from '@ngrx/store';
import UserPropertiesState, { initializeState } from './../state/user-properties.state';
import * as UserPropertyAction from './../actions/user-properties.action';
import { Property } from '../models/export';

export const intialState = initializeState();

// ---------------------------------------------------------------------------------------------------------------------
function removePropertry(properties: Property[], uuid: string): Property[] {
    let index = -1;
    let idx = 0;
    for (const item of properties) {
      if (item.uuid === uuid) {
        index = idx;
        break;
      }
      idx += 1;
    }

    if (index !== -1) {
        const newState = properties.slice();
        newState.splice(index, 1);
        return newState;
    }

    return properties;
}

// ---------------------------------------------------------------------------------------------------------------------
function saveLocation(properties: Property[], prop: Property) {
  let index = -1;
  let idx = 0;
  for (const item of properties) {
    if (item.uuid === prop.uuid) {
      index = idx;
      break;
    }
    idx += 1;
  }

  if (index !== -1) {
    const newState = properties.slice();
    newState.splice(index, 1, prop);
    return newState;
  } else {
    return [...properties, prop];
  }
}

// ---------------------------------------------------------------------------------------------------------------------
const reducer = createReducer(
  intialState,
  on(UserPropertyAction.GetPropertiesAction, state => state),
  on(UserPropertyAction.SuccessGetPropertiesAction, (state: UserPropertiesState, { payload }) => {
    return {
        ...state,
        userProperties: payload,
        userPropertiesError: null
    };
  }),
  on(UserPropertyAction.SuccessSavePropertyAction, (state: UserPropertiesState, { payload }) => {
    return {
        ...state,
        userProperties: saveLocation(state.userProperties, payload),
        userPropertiesError: null
    };
  }),
  on(UserPropertyAction.SuccessRemovePropertyAction, (state: UserPropertiesState, { payload }) => {
    const newMarkers = removePropertry(state.userProperties, payload.uuid);
    return {
        ...state,
        userProperties: newMarkers,
        userPropertiesError: null
    };
  }),
  on(UserPropertyAction.ErrorPropertyAction, (state: UserPropertiesState, error: Error) => {
    console.error(error);
    return {
        ...state,
        userPropertiesError: error
    };
  })
);

// ---------------------------------------------------------------------------------------------------------------------
export function UserPropertyReducer(state: UserPropertiesState | undefined, action: Action) {
  return reducer(state, action);
}
