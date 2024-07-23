import { Dispatch, createContext, useReducer, FC, ReactNode } from 'react';
import {
  ActivityState,
  ActivityActions,
  activityReducer,
  initialState,
} from '../reducers/activity-reducer';

type ActivityContextProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityActions>;
};

export const ActivitiesContext = createContext<ActivityContextProps>({
  state: initialState,
  dispatch: () => undefined,
});

const defaultState: ActivityState = { activities: [], activeId: '' };

export const ActivitiesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(activityReducer, initialState, () => {
    const localData = window.localStorage.getItem('activities');
    if (localData) {
      return { activities: JSON.parse(localData), activeId: '' };
    }
  });

  return (
    <ActivitiesContext.Provider
      value={{
        state: state || defaultState,
        dispatch,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
};
