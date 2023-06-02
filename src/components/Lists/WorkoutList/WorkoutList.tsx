import Text from "components/Text/Text";
import { format } from "date-fns";
import { BiCalendar, BiDumbbell, BiRepeat } from "react-icons/bi";
import { useTheme } from "styled-components";
import { convertLbsToKg, getMaxWeightFromSets, sortByDate } from "util/index";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/redux";
import { Set, Workout } from "../../../types";
import { List, ListItem, MaxWeight, Sets, WorkoutDate } from "./style";
import { setActiveWorkout } from "src/redux/slices/app";
import { useRouter } from "next/router";

const WorkoutList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const activeExercise = useAppSelector((state) => state.app.activeExercise);
  const workouts = useAppSelector((state) =>
    state.app.user.workouts.filter(
      (workout) => workout.exercise.id === activeExercise.id
    )
  );

  const theme = useTheme();

  const hasNoWorkouts = workouts.length === 0;

  return (
    <List>
      {sortByDate(workouts).map(({ id, date, sets }: Workout, index) => {
        const maxWeight = getMaxWeightFromSets(sets);

        return (
          <ListItem
            key={id}
            onClick={() => {
              dispatch(setActiveWorkout(workouts[index]));
              router.push("/workout-details");
            }}
          >
            <WorkoutDate>
              <BiCalendar color={theme.colors.blue} />{" "}
              {format(new Date(date), "EEE do MMM, yyyy")}
            </WorkoutDate>
            <MaxWeight>
              <BiDumbbell color={theme.colors.blue} />
              {maxWeight}lbs ({convertLbsToKg(maxWeight)}
              kg)
            </MaxWeight>
            <Sets>
              <BiRepeat color={theme.colors.blue} />
              {sets.length}{" "}
              {sets.map((set: Set) => `(${set.reps}x${set.weight}lbs) `)}
            </Sets>
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
