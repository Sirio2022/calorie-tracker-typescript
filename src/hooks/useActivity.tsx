import { useState, useContext, useEffect, FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Activity } from '../types';
import { categories } from '../data/categories';
import { useMemo } from 'react';

import { ActivitiesContext } from '../context/ActivitiesContext';

export function useActivity() {
  const initialForm: Activity = {
    id: uuidv4(),
    category: 1,
    activity: '',
    calories: 0,
  };

  const [activity, setActivity] = useState<Activity>(initialForm);

  const { state, dispatch } = useContext(ActivitiesContext);

  useEffect(() => {
    window.localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities]);

  const isValidActivity = () => {
    return activity.activity.trim() !== '' && activity.calories > 0;
  };

  const clearForm = () => {
    setActivity(initialForm);
  };

  const categoryName = useMemo(
    () => (category: Activity['category']) => {
      return categories.find((c) => c.id === category)?.name;
    },
    []
  );

  const clearApp = () => {
    dispatch({ type: 'RESET_APP' });
  };

  useEffect(() => {
    if (state.activeId) {
      const activeActivity = state.activities.find(
        (activity) => activity.id === state.activeId
      );

      if (activeActivity) {
        setActivity(activeActivity);
      }
    }
  }, [state.activeId, state.activities]);

  const caloriesConsumed = useMemo(() => {
    return state.activities.reduce(
      (acc, activity) =>
        activity.category === 1 ? acc + activity.calories : acc,
      0
    );
  }, [state.activities]);

  const caloriesBurned = useMemo(() => {
    return state.activities.reduce(
      (acc, activity) =>
        activity.category === 2 ? acc + activity.calories : acc,
      0
    );
  }, [state.activities]);

  const caloriesDifference = useMemo(() => {
    return caloriesConsumed - caloriesBurned;
  }, [caloriesConsumed, caloriesBurned]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: 'ADD_ACTIVITY', payload: activity });
    clearForm();
  };

  return {
    activity,
    setActivity,
    isValidActivity,
    state,
    dispatch,
    clearForm,
    categoryName,
    clearApp,
    caloriesConsumed,
    caloriesBurned,
    caloriesDifference,
    handleSubmit,
  };
}
