import AppNavigation from "components/AppNavigation/AppNavigation";
import BackButton from "components/BackButton/BackButton";
import ScreenTitle from "components/ScreenTitle/ScreenTitle";
import { Controls } from "styles/pages/profile";
import { List, Main, Navigation, Screen } from "styles/pages/progress";

import Avatar from "components/Avatar/Avatar";
import Text from "components/Text/Text";
import { useEffect, useState } from "react";
import { FavouriteDay, HeaviestLift, MostPerformedExercise } from "src/types";
import {
  convertLbsToKg,
  getFavouriteDay,
  getMostPerformedExercise,
  getHeaviestLift,
  getTotalReps,
  getTotalSets,
  getTotalWeight,
  getWeightEquivalent,
  convertLbsToTonnes,
} from "util/index";
import { useAppDispatch, useAppSelector } from "../redux/hooks/redux";
import { setLoading } from "../redux/slices/app";
import { Group } from "styles/shared";

const Progress = () => {
  const state = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const [exerciseCount, setExerciseCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [workoutCount, setWorkoutCount] = useState(0);
  const [totalSets, setTotalSets] = useState(0);
  const [totalReps, setTotalReps] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [heaviestLift, setHeaviestLift] = useState<HeaviestLift>({
    name: "",
    weight: 0,
  });
  const [mostPerformedExercise, setMostPerformedExercise] =
    useState<MostPerformedExercise>({
      id: "",
      type: "",
      name: "",
      count: 0,
    });
  const [favouriteDay, setFavouriteDay] = useState<FavouriteDay>({
    most: "",
    least: "",
  });

  useEffect(() => {
    dispatch(setLoading(true));
    setExerciseCount(state.user.exercises.length);
    setCategoryCount(state.user.categories.length);
    setWorkoutCount(state.user.workouts.length);
    setTotalSets(getTotalSets(state.user.workouts));
    setTotalReps(getTotalReps(state.user.workouts));
    setTotalWeight(getTotalWeight(state.user.workouts));
    setHeaviestLift(getHeaviestLift(state.user.workouts));
    setMostPerformedExercise(getMostPerformedExercise(state.user.workouts));
    setFavouriteDay(getFavouriteDay(state.user.workouts));
    dispatch(setLoading(false));
  }, [
    dispatch,
    state.user.categories.length,
    state.user.exercises.length,
    state.user.workouts,
  ]);

  const weightComparisonText = getWeightEquivalent(totalWeight);

  return (
    <Screen>
      <Navigation>
        <Group>
          <BackButton />
          <Avatar />
        </Group>
        <ScreenTitle title="Progress" />
      </Navigation>
      <Main>
        <Text size="1.2em">Below is a summary of your workouts</Text>
        <List>
          <li>
            <b>Exercises:</b> {exerciseCount}
          </li>
          <li>
            <b>Categories:</b> {categoryCount}
          </li>
          <li>
            <b>Workouts:</b> {workoutCount}
          </li>
          <li>
            <b>Total sets:</b> {totalSets}
          </li>
          <li>
            <b>Total reps:</b> {totalReps}
          </li>

          <li>
            <b>Total weight lifted:</b> {totalWeight}lbs (
            {convertLbsToTonnes(totalWeight)}tonnes)
          </li>

          {totalWeight > 0 && weightComparisonText && (
            <li>Thats the same weight as {weightComparisonText}</li>
          )}

          <li>
            <b>Most performed exercise: </b>{" "}
            {mostPerformedExercise.name ? (
              <>
                {mostPerformedExercise.name} ({mostPerformedExercise.count}{" "}
                times)
              </>
            ) : (
              "None"
            )}
          </li>

          <li>
            <b>Favorite day to workout:</b> {favouriteDay.most}
          </li>
          <li>
            <b>Least favorite day to workout:</b> {favouriteDay.least}
          </li>
          <li>
            <b>Heaviest lift:</b>{" "}
            {heaviestLift.weight > 0 ? (
              <>
                {heaviestLift.weight}lbs (
                {convertLbsToKg(Number(heaviestLift.weight))}kg) (
                {heaviestLift.name})
              </>
            ) : (
              "None"
            )}
          </li>
        </List>
      </Main>
      <Controls>
        <AppNavigation />
      </Controls>
    </Screen>
  );
};

export default Progress;
