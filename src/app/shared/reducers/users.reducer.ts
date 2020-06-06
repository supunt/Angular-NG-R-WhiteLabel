import { Action, createReducer, on } from '@ngrx/store';
import UsersState, { initializeState } from './../state/users.state';
import * as UsersAction from './../actions/users.actions';
import { User } from '../models/export';

export const intialState = initializeState();

// ---------------------------------------------------------------------------------------------------------------------
function removeUser(users: User[], userId: string): User[] {
    let index = -1;
    let idx = 0;
    for (const item of users) {
      if (item.userId === userId) {
        index = idx;
        break;
      }
      idx += 1;
    }

    if (index !== -1) {
        const newState = users.slice();
        newState.splice(index, 1);
        return newState;
    }

    return users;
}

// ---------------------------------------------------------------------------------------------------------------------
function saveUser(users: User[], usr: User) {
  let index = -1;
  let idx = 0;
  for (const item of users) {
    if (item.userId === usr.userId) {
      index = idx;
      break;
    }
    idx += 1;
  }

  if (index !== -1) {
    const newState = users.slice();
    newState.splice(index, 1, usr);
    return newState;
  } else {
    return [...users, usr];
  }
}

// ---------------------------------------------------------------------------------------------------------------------
const reducer = createReducer(
  intialState,
  on(UsersAction.GetUserAction, state => state),
  on(UsersAction.SuccessGetUserAction, (state: UsersState, { payload }) => {
    return {
        ...state,
        users: payload,
        UserError: null
    };
  }),
  on(UsersAction.SuccessSaveUserAction, (state: UsersState, { payload }) => {
    return {
        ...state,
        users: saveUser(state.users, payload),
        UserError: null
    };
  }),
  on(UsersAction.SuccessRemoveUserAction, (state: UsersState, { payload }) => {
    const newMarkers = removeUser(state.users, payload.userId);
    return {
        ...state,
        users: newMarkers,
        UserError: null
    };
  }),
  on(UsersAction.ErrorUserAction, (state: UsersState, error: Error) => {
    console.error(error);
    return {
        ...state,
        UserError: error
    };
  })
);

// ---------------------------------------------------------------------------------------------------------------------
export function UserReducer(state: UsersState | undefined, action: Action) {
  return reducer(state, action);
}
