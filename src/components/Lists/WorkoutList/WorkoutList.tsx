import { format } from "date-fns";
import { useRouter } from "next/router";
import { SyntheticEvent, useCallback, useState } from "react";
import { BiCalendar, BiDumbbell, BiRepeat } from "react-icons/bi";
import { useTheme } from "styled-components";
import { useLongPress } from "use-long-press";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/redux";
import { removeWorkout, setLoading } from "../../../redux/slices/app";
import { Set, Workout } from "../../../types";
import { convertLbsToKg, getMaxWeightFromSets, sortByDate } from "util/index";
import { DELETE_WORKOUT_TEXT, LONG_PRESS_THRESHOLD } from "util/constants";
import { deleteWorkoutFromFirebase } from "util/firebase/firebase";
import { List, ListItem, MaxWeight, Sets, WorkoutDate } from "./style";
import Text from "components/Text/Text";

const WorkoutList = () => {
  const router = useRouter();
  const [workoutId, setWorkoutId] = useState("");
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.app);
  const activeExercise = useAppSelector((state) => state.app.activeExercise);
  const workouts = useAppSelector((state) =>
    state.app.user.workouts.filter(
      (workout) => workout.exercise.id === activeExercise.id
    )
  );

  const theme = useTheme();

  const callback = useCallback(() => {
    const confirmed = confirm(DELETE_WORKOUT_TEXT);

    if (confirmed) {
      dispatch(setLoading(true));
      const email = user.email;
      deleteWorkoutFromFirebase(email, workoutId);
      dispatch(removeWorkout(workoutId));
      setWorkoutId("");
      dispatch(setLoading(false));
      router.back();
    }
  }, [dispatch, router, user.email, workoutId]);

  const bind = useLongPress(callback, {
    onStart: (e: SyntheticEvent) => setWorkoutId(e.currentTarget.id),
    threshold: LONG_PRESS_THRESHOLD,
  });

  const hasNoWorkouts = workouts.length === 0;

  return (
    <List>
      {sortByDate(workouts).map(({ id, date, sets }: Workout) => {
        const maxWeight = getMaxWeightFromSets(sets);

        return (
          <ListItem key={id} {...bind(id)} id={id}>
            <WorkoutDate>
              <BiCalendar color={theme.colors.blue} />{" "}
              {format(new Date(date), "EEE do MMM, yyyy")}
            </WorkoutDate>

            <Sets>
              <BiRepeat color={theme.colors.blue} />
              {sets.length} ({sets.map((set: Set) => set.reps).join("x")})
            </Sets>

            <MaxWeight>
              <BiDumbbell color={theme.colors.blue} />
              {maxWeight}lbs ({convertLbsToKg(maxWeight)}
              kg)
            </MaxWeight>
          </ListItem>
        );
      })}

      {hasNoWorkouts && (
        <>
          <ListItem>
            <Text>
              Click the <b>+</b> button below to add a workout.
            </Text>
          </ListItem>
        </>
      )}
    </List>
  );
};

export default WorkoutList;
