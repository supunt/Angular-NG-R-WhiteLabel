export default class AdminUserPropertiesState {
  userProperties: {};
  userPropertiesError: Error;
}

export const initializeState = (): AdminUserPropertiesState => {
  return {
    userProperties: {},
    userPropertiesError: null
  };
};