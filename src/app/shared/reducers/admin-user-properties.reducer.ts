import { Action, createReducer, on } from '@ngrx/store';
import AdminUserPropertiesState, { initializeState } from './../state/admin-user-properties.state';
import * as AdminUserPropertyAction from './../actions/admin-user-properties.action';
import { Property } from '../models/export';

export const intialState = initializeState();

function getUpdatedUserProperties(userProperties: {}, userId: string, newPropList: Property[]) {
  const newuserProperties = {};
  for (const item of (Object.keys(userProperties))) {
    newuserProperties[item] = userProperties[item];
  }

  newuserProperties[userId] = newPropList;
  return newuserProperties;
}
// ---------------------------------------------------------------------------------------------------------------------
function savePropertryOfUser(userProperties: {}, userId: string, prop: Property) {
  let newuserProperties = {};
  for (const item of (Object.keys(userProperties))) {
    newuserProperties[item] = userProperties[item];
  }

  if (newuserProperties[userId] == null) {
    newuserProperties[userId] = [prop];
    return newuserProperties;
  }


  let index = -1;
  let idx = 0;
  for (const item of userProperties[userId]) {
    if (item.uuid === prop.uuid) {
      index = idx;
      break;
    }
    idx += 1;
  }

  if (index !== -1) {
    const newPropArray = userProperties[userId].slice();
    newPropArray.splice(index, 1, prop);
    userProperties[userId] = newPropArray;
    return userProperties;
  } else {
    newuserProperties[userId].push(prop);
    return newuserProperties;
  }
}

// ---------------------------------------------------------------------------------------------------------------------
function removePropertryFromUser(userProperties: {}, userId: string, uuid: string): {} {
  if (userProperties[userId] == null) {
    return userProperties;
  }

  const usersProps = userProperties[userId];

  if (userProperties[userId] == null) {
    return userProperties;
  }

  const properties = userProperties[userId];
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

    let newuserProperties = {};
    for (const item of (Object.keys(userProperties))) {
      if (userId !== item) {
        newuserProperties[item] = userProperties[item];
      } else {
        newuserProperties[item] = newState;
      }
    }

    return newuserProperties;
  }

  return userProperties;
}

// ---------------------------------------------------------------------------------------------------------------------
const reducer = createReducer(
  intialState,
  on(AdminUserPropertyAction.GetPropertiesOfUserAction, state => state),
  on(AdminUserPropertyAction.SuccessGetPropertiesOfUserAction, (state: AdminUserPropertiesState, { userId, payload }) => {
    return {
      ...state,
      userProperties: getUpdatedUserProperties(state.userProperties, userId, payload),
      userPropertiesError: null
    };
  }),
  on(AdminUserPropertyAction.SuccessAddPropertyToUserAction, (state: AdminUserPropertiesState, { userId, payload }) => {
    return {
      ...state,
      userProperties: savePropertryOfUser(state.userProperties, userId, payload),
      userPropertiesError: null
    };
  }),
  on(AdminUserPropertyAction.SuccessRemovePropertyOfUserAction, (state: AdminUserPropertiesState, { userId, payload }) => {
    const newMarkers = removePropertryFromUser(state.userProperties, userId, payload.uuid);
    return {
      ...state,
      userProperties: newMarkers,
      userPropertiesError: null
    };
  }),
  on(AdminUserPropertyAction.ErrorPropertyOfUserAction, (state: AdminUserPropertiesState, error: Error) => {
    console.error(error);
    return {
      ...state,
      userPropertiesError: error
    };
  })
);

// ---------------------------------------------------------------------------------------------------------------------
export function AdminUserPropertyReducer(state: AdminUserPropertiesState | undefined, action: Action) {
  return reducer(state, action);
}
