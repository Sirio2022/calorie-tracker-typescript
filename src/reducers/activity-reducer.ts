import { Activity } from '../types';

export type ActivityActions =
  | {
      type: 'ADD_ACTIVITY';
      payload: Activity;
    }
  | {
      type: 'DELETE_ACTIVITY';
      payload: Activity['id'];
    }
  | {
      type: 'EDIT_ACTIVITY';
      payload: Activity['id'];
    }
  | {
      type: 'RESET_APP';
    };

export type ActivityState = {
  activities: Activity[];
  activeId: Activity['id'];
};

export const initialState: ActivityState = {
  activities: [],
  activeId: '',
};

export const activityReducer = (
  state: ActivityState = initialState,
  actions: ActivityActions
) => {
  if (actions.type === 'ADD_ACTIVITY') {
    if (state.activeId) {
      return {
        ...state,
        activities: state.activities.map((activity) =>
          activity.id === state.activeId ? actions.payload : activity
        ),
        activeId: '',
      };
    }

    return {
      ...state,
      activities: [...state.activities, actions.payload],
    };
  }

  if (actions.type === 'DELETE_ACTIVITY') {
    return {
      ...state,
      activities: state.activities.filter(
        (activity) => activity.id !== actions.payload
      ),
    };
  }

  if (actions.type === 'EDIT_ACTIVITY') {
    return {
      ...state,
      activeId: actions.payload,
    };
  }

  if (actions.type === 'RESET_APP') {
    return initialState;
  }
};
