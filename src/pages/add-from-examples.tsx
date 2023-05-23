import AddExerciseButton from "components/AddExerciseButton/AddExerciseButton";
import Avatar from "components/Avatar/Avatar";
import BackButton from "components/BackButton/BackButton";
import { Button } from "components/BackButton/style";
import ScreenTitle from "components/ScreenTitle/ScreenTitle";
import { useCallback, useEffect, useState } from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "src/redux/hooks/redux";
import {
  addCategory,
  addExercise,
  setAddedAllExamples,
  setLoading,
} from "src/redux/slices/app";
import type { Category, Exercise } from "src/types";
import {
  Details,
  List,
  ListItem,
  Main,
  Navigation,
  Screen,
} from "styles/pages/add-from-example";
import { Group } from "styles/shared";
import theme from "styles/theme";

import { exampleCategories, exampleExercises } from "util/example-data";
import {
  saveCategoryToFirebase,
  saveExerciseToFirebase,
  updateValueInFirebase,
} from "util/firebase/firebase";

const AddFromExamples = () => {
  const dispatch = useAppDispatch();
  const { app } = useAppSelector((state) => state);
  const { user } = useAppSelector((state) => state.app);
  const { categories } = useAppSelector((state) => state.app.user);
  const { exercises } = useAppSelector((state) => state.app.user);
  const [addedAllExercises, setAddedAllExercises] = useState(
    app.addedAllExamples
  );
  const [addedAllCategories, setAddedAllCategories] = useState(false);

  const addNewCategory = async (category: Category) => {
    // save data

    const email = user.email;
    // save to firebase
    await saveCategoryToFirebase(email, category);
    // save to redux
    dispatch(addCategory(category));
  };
  const addNewExercise = async (exercise: Exercise) => {
    const email = user.email;
    // save to firebase
    await saveExerciseToFirebase(email, exercise);
    // save to redux
    dispatch(addExercise(exercise));
  };

  const isExerciseAdded = useCallback(
    (exercise: Exercise) => {
      if (exercises.length === 0) return false;
      return exercises.find(
        (e: Exercise) =>
          e.id === exercise.id ||
          (e.name === exercise.name && e.type === exercise.type)
      );
    },
    [exercises]
  );

  const isCategoryAdded = useCallback(
    (category: Category) => {
      if (categories.length === 0) return false;
      return categories.find(
        (c: Category) => c.id === category.id || c.name === category.name
      );
    },
    [categories]
  );

  const addAllExercises = async () => {
    dispatch(setLoading(true));
    exampleExercises.forEach(async (exercise: Exercise) => {
      if (!isExerciseAdded(exercise)) {
        await addNewExercise(exercise);
      }
    });
    dispatch(setLoading(false));
    setAddedAllExercises(true);
  };

  const addAllCategories = async () => {
    dispatch(setLoading(true));
    exampleCategories.forEach(async (category: Category) => {
      if (!isCategoryAdded(category)) {
        await addNewCategory(category);
      }
    });
    dispatch(setLoading(false));
    setAddedAllCategories(true);
  };

  useEffect(() => {
    const allExexrcisesAdded = exampleExercises.every((exercise: Exercise) =>
      isExerciseAdded(exercise)
    );
    const allCategoriesAdded = exampleCategories.every((category: Category) =>
      isCategoryAdded(category)
    );

    setAddedAllExercises(allExexrcisesAdded);
    setAddedAllCategories(allCategoriesAdded);

    dispatch(setAddedAllExamples(allExexrcisesAdded && allCategoriesAdded));

    if (allExexrcisesAdded && allCategoriesAdded) {
      dispatch(setAddedAllExamples(true));
      updateValueInFirebase(user.email, "addedAllExamples", true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen>
      <Navigation>
        <Group>
          <BackButton />
          <Avatar />
        </Group>
      </Navigation>
      <Main>
        <Group>
          <ScreenTitle title="Exercises" />
          {!addedAllExercises && (
            <Button onClick={() => addAllExercises()}>Add All</Button>
          )}
        </Group>
        <List>
          {exampleExercises.map((exercise: Exercise) => (
            <ListItem key={exercise.id}>
              <Details>
                <p>{exercise.name}</p>
                <small>({exercise.type})</small>
              </Details>
              {!isExerciseAdded(exercise) ? (
                <AddExerciseButton onClick={() => addNewExercise(exercise)} />
              ) : (
                <IoCheckmarkCircleSharp
                  size="1.5em"
                  color={theme.colors.blue}
                />
              )}
            </ListItem>
          ))}
        </List>
        <Group>
          <ScreenTitle title="Categories" />
          {!addedAllCategories && (
            <Button onClick={() => addAllCategories()}>Add All</Button>
          )}
        </Group>
        <List>
          {exampleCategories.map((category: Category) => (
            <ListItem key={category.id}>
              <p>{category.name}</p>
              {!isCategoryAdded(category) ? (
                <AddExerciseButton onClick={() => addNewCategory(category)} />
              ) : (
                <IoCheckmarkCircleSharp
                  size="1.5em"
                  color={theme.colors.blue}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Main>
    </Screen>
  );
};

export default AddFromExamples;
