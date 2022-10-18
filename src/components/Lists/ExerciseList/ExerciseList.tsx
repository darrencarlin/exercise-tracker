import Link from "next/link";
import { useRouter } from "next/router";
import { SyntheticEvent, useCallback, useState } from "react";
import { useLongPress } from "use-long-press";
import { DELETE_EXERCISE_TEXT, LONG_PRESS_THRESHOLD } from "util/constants";
import { deleteExerciseFromFirebase } from "util/firebase/firebase";
import { capitalize } from "util/index";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/redux";
import {
  removeExercise,
  setActiveExercise,
  setLoading,
} from "../../../redux/slices/app";
import { Exercise } from "../../../types";
import Text from "../../Text/Text";
import { List, ListItem } from "./style";

interface ExerciseListProps {
  searchTerm: string;
}

const ExerciseList = ({ searchTerm }: ExerciseListProps) => {
  const router = useRouter();
  const [exerciseId, setExerciseId] = useState("");
  const { user } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const { exercises } = useAppSelector((state) => state.app.user);

  const navigate = (exercise: Exercise) => {
    dispatch(
      setActiveExercise({
        id: exercise.id,
        name: exercise.name,
        type: exercise.type,
      })
    );

    router.push(
      {
        pathname: "/exercise",
        query: { exercise: exercise.name },
      },
      "/exercise"
    );
  };

  const callback = useCallback(() => {
    const confirmed = confirm(DELETE_EXERCISE_TEXT);

    if (confirmed) {
      dispatch(setLoading(true));
      const email = user.email;
      deleteExerciseFromFirebase(email, exerciseId);
      dispatch(removeExercise(exerciseId));
      setExerciseId("");
      dispatch(setLoading(false));
    }
  }, [dispatch, exerciseId, user.email]);

  const bind = useLongPress(callback, {
    onStart: (e: SyntheticEvent) => setExerciseId(e.currentTarget.id),
    threshold: LONG_PRESS_THRESHOLD,
  });

  const hasNoExercises = exercises.length === 0;

  // if theres a search term filter the exercises
  const filteredExercises = exercises.filter((exercise: Exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exercisesToRender = searchTerm ? filteredExercises : exercises;

  return (
    <List>
      {exercisesToRender.map((exercise) => (
        <ListItem
          key={exercise.id}
          onClick={() => navigate(exercise)}
          {...bind(exercise.id)}
          id={exercise.id}
        >
          <p>{exercise.name}</p> <small>({capitalize(exercise.type)})</small>
        </ListItem>
      ))}

      {hasNoExercises && (
        <>
          <ListItem>
            <Text>
              Click the <b>+</b> button below to add an exercise.
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              Add from{" "}
              <Link href="/add-from-examples" passHref>
                <a>example</a>
              </Link>{" "}
              exercises and categories.
            </Text>
          </ListItem>
        </>
      )}
    </List>
  );
};
export default ExerciseList;
