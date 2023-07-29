import Text from "components/Text/Text";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { BiCalendar, BiDumbbell, BiRepeat } from "react-icons/bi";
import { setActiveWorkout } from "src/redux/slices/app";
import { useTheme } from "styled-components";
import { convertLbsToKg, getMaxWeightFromSets, sortByDate } from "util/index";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/redux";
import { Set, Workout } from "../../../types";
import { Emoji, List, ListItem, MaxWeight, Sets, WorkoutDate } from "./style";

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

  const sortedWorkouts = useMemo(() => sortByDate(workouts), [workouts]);

  return (
    <List>
      {sortedWorkouts.map(({ id, date, sets, emoji }: Workout, index) => {
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
              <div>
                <BiCalendar color={theme.colors.blue} />{" "}
                {format(new Date(date), "EEE do MMM, yyyy")}
              </div>
              <Emoji>{emoji}</Emoji>
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
