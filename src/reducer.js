export const initialState = {
  user: null,
  tasks: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TASKS":
      return {
        ...state,
        tasks: action.tasks,
      };
    default:
      return {
        ...state,
      };
  }
};
