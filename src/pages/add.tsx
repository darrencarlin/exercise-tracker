import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Avatar from "components/Avatar/Avatar";
import BackButton from "components/BackButton/BackButton";
import Divider from "components/Divider/Divider";
import Button from "components/FormElements/Button/Button";
import ScreenTitle from "components/ScreenTitle/ScreenTitle";
import Text from "components/Text/Text";
import { useAppDispatch, useAppSelector } from "../redux/hooks/redux";
import { addCategory, addExercise, setLoading } from "../redux/slices/app";
import {
  Form,
  Input,
  Main,
  Navigation,
  Screen,
  StyledSelect,
} from "styles/pages/add";
import { Category, Exercise } from "../types";

import { CATEGORY_SELECT_TEXT } from "util/constants";
import {
  saveCategoryToFirebase,
  saveExerciseToFirebase,
} from "util/firebase/firebase";
import { generateRandomFirebaseStyleId, trimAndLower } from "util/index";
import { Group } from "styles/shared";

const Add = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { addedAllExamples } = useAppSelector((state) => state.app);
  const { user } = useAppSelector((state) => state.app);
  const { exercises } = useAppSelector((state) => state.app.user);
  const { categories } = useAppSelector((state) => state.app.user);

  const [exercise, setExercise] = useState("");
  const [category, setCategory] = useState(CATEGORY_SELECT_TEXT);

  const [newCategory, setNewCategory] = useState("");

  const addNewExercise = async () => {
    // check if it exists already
    if (exercises) {
      const exerciseExists = exercises.find(
        ({ name, type }) =>
          trimAndLower(name) === trimAndLower(exercise) &&
          trimAndLower(type) === trimAndLower(category)
      );

      if (exerciseExists) {
        alert("Exercise already exists with that name and category");
        return;
      }
    }

    // save data
    dispatch(setLoading(true));
    const data: Exercise = {
      id: generateRandomFirebaseStyleId(),
      name: exercise.trim(),
      type: category.trim(),
    };
    const email = user.email;
    // save to firebase
    await saveExerciseToFirebase(email, data);
    // save to redux
    dispatch(addExercise(data));
    dispatch(setLoading(false));
    router.push("/exercises");
  };

  const addNewCategory = async () => {
    // check if it exists already
    if (categories) {
      const categoryExists = categories.find(
        ({ name }) => trimAndLower(name) === trimAndLower(newCategory)
      );

      if (categoryExists) {
        alert("Category already exists");
        return;
      }
    }

    // save data
    dispatch(setLoading(true));
    const data: Category = {
      id: generateRandomFirebaseStyleId(),
      name: newCategory.trim(),
    };
    const email = user.email;
    // save to firebase
    await saveCategoryToFirebase(email, data);
    // save to redux
    dispatch(addCategory(data));
    dispatch(setLoading(false));
  };

  const isValidExercise = exercise !== "" && category !== CATEGORY_SELECT_TEXT;
  const isValidCategory = newCategory !== "";

  return (
    <Screen>
      <Navigation>
        <Group>
          <BackButton />
          <Avatar />
        </Group>

        <ScreenTitle title="Add" />

        <Text>
          Use the forms below to add a new exercise or category. Click here to{" "}
          <Link href="/delete">
            <a>delete</a>
          </Link>{" "}
          either.
        </Text>
      </Navigation>
      <Main>
        <Form>
          <Input
            placeholder="Name"
            value={exercise}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setExercise(e.target.value)
            }
          />
          {categories?.length ? (
            <StyledSelect onChange={(e) => setCategory(e.target.value)}>
              <option value={CATEGORY_SELECT_TEXT}>
                {CATEGORY_SELECT_TEXT}
              </option>
              {categories.map(({ id, name }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
            </StyledSelect>
          ) : (
            <Text m="0 0 10px 0">
              You have no categories saved! Add one below.
            </Text>
          )}
          <Button
            type="button"
            onClick={addNewExercise}
            disabled={!isValidExercise}
          >
            Add Exercise
          </Button>
        </Form>
        <Divider />
        <Form>
          <Input
            placeholder="Category"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewCategory(e.target.value)
            }
          />

          <Button
            type="button"
            onClick={addNewCategory}
            disabled={!isValidCategory}
          >
            Add Category
          </Button>
        </Form>

        <Divider />

        {!addedAllExamples && (
          <Text m="16px 0 0 0">
            Add from{" "}
            <Link href="/add-from-examples" passHref>
              <a>example</a>
            </Link>{" "}
            exercises and categories.
          </Text>
        )}
      </Main>
    </Screen>
  );
};

export default Add;
