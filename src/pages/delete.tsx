import { useState } from "react";
import Avatar from "components/Avatar/Avatar";
import BackButton from "components/BackButton/BackButton";
import Divider from "components/Divider/Divider";
import ScreenTitle from "components/ScreenTitle/ScreenTitle";
import Text from "components/Text/Text";
import { useAppDispatch, useAppSelector } from "../redux/hooks/redux";
import {
  removeCategory,
  removeExercise,
  setLoading,
} from "../redux/slices/app";
import {
  DeleteButton,
  Form,
  Main,
  Navigation,
  Screen,
  StyledSelect,
} from "styles/pages/delete";
import { capitalizeWords } from "util/index";
import {
  CATEGORY_SELECT_TEXT,
  DELETE_CATEGORY_TEXT,
  DELETE_EXERCISE_TEXT,
  EXERCISE_SELECT_TEXT,
} from "util/constants";
import {
  deleteCategoryFromFirebase,
  deleteExerciseFromFirebase,
} from "util/firebase/firebase";
import { Group } from "styles/shared";

const Delete = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.app);
  const { exercises } = useAppSelector((state) => state.app.user);
  const { categories } = useAppSelector((state) => state.app.user);

  const [categoryToDelete, setCategoryToDelete] =
    useState(CATEGORY_SELECT_TEXT);
  const [exerciseToDelete, setExerciseToDelete] =
    useState(EXERCISE_SELECT_TEXT);

  const deleteExercise = async (exerciseId: string) => {
    const confirmed = confirm(DELETE_EXERCISE_TEXT);

    if (confirmed) {
      dispatch(setLoading(true));
      const email = user.email;
      deleteExerciseFromFirebase(email, exerciseId);
      dispatch(removeExercise(exerciseId));
      setExerciseToDelete(EXERCISE_SELECT_TEXT);
      dispatch(setLoading(false));
    }
  };

  const deleteCategory = async (categoryId: string) => {
    const confirmed = confirm(DELETE_CATEGORY_TEXT);

    if (confirmed) {
      dispatch(setLoading(true));
      const email = user.email;
      // delete category & reset state
      dispatch(removeCategory(categoryId));
      deleteCategoryFromFirebase(email, categoryId);
      setCategoryToDelete(CATEGORY_SELECT_TEXT);
      dispatch(setLoading(false));
    }
  };

  const canDeleteExercise = exerciseToDelete !== EXERCISE_SELECT_TEXT;
  const canDeleteCategory = categoryToDelete !== CATEGORY_SELECT_TEXT;

  return (
    <Screen>
      <Navigation>
        <Group>
          <BackButton href="/" />
          <Avatar />
        </Group>

        <ScreenTitle title="Delete" />

        <Text>
          Use the forms below delete an exercise or category. This action cannot
          be undone.
        </Text>
      </Navigation>
      <Main>
        <Form>
          <StyledSelect onChange={(e) => setExerciseToDelete(e.target.value)}>
            <option value="Select an exercise">{EXERCISE_SELECT_TEXT}</option>
            {exercises.map(({ id, name, type }) => (
              <option key={id} value={id}>
                {name} - ({capitalizeWords(type)})
              </option>
            ))}
          </StyledSelect>

          <DeleteButton
            type="button"
            onClick={() => deleteExercise(exerciseToDelete)}
            disabled={!canDeleteExercise}
          >
            Delete Exercise
          </DeleteButton>
        </Form>

        <Form>
          <StyledSelect onChange={(e) => setCategoryToDelete(e.target.value)}>
            <option value="Select a category">{CATEGORY_SELECT_TEXT}</option>
            {categories.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </StyledSelect>
          <DeleteButton
            type="button"
            onClick={() => deleteCategory(categoryToDelete)}
            disabled={!canDeleteCategory}
          >
            Delete Category
          </DeleteButton>
        </Form>
        <Divider />
      </Main>
    </Screen>
  );
};

export default Delete;
