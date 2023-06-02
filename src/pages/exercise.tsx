import AppNavigation from "components/AppNavigation/AppNavigation";
import Avatar from "components/Avatar/Avatar";
import BackButton from "components/BackButton/BackButton";
import WorkoutList from "components/Lists/WorkoutList/WorkoutList";
import ProgressIcon from "components/ProgressIcon/ProgressIcon";
import ScreenTitle from "components/ScreenTitle/ScreenTitle";
import Text from "components/Text/Text";
import { useAppSelector } from "src/redux/hooks/redux";
import {
  Controls,
  Navigation,
  Main,
  Screen,
  TitleGroup,
} from "styles/pages/exercise";
import { Group } from "styles/shared";
import { getAverageFromWorkouts, getMaxWeightFromWorkouts } from "util/index";

const Exercise = () => {
  const activeExercise = useAppSelector((state) => state.app.activeExercise);
  const workouts = useAppSelector((state) =>
    state.app.user.workouts.filter(
      (workout) => workout.exercise.id === activeExercise.id
    )
  );

  const totalWorkouts = workouts.length;
  const average = getAverageFromWorkouts(workouts);
  const maxWeight = getMaxWeightFromWorkouts(workouts);

  return (
    <Screen>
      <Navigation>
        <Group>
          <BackButton />
          <Avatar />
        </Group>
        <TitleGroup>
          <ScreenTitle title={activeExercise.name} />
          <ProgressIcon href="/progress/detail" />
        </TitleGroup>
        <Text m="0 0 10px 0">
          You have completed this exercise <b>{totalWorkouts}</b> times and your
          current max is <b>{maxWeight == -Infinity ? 0 : maxWeight}lbs</b> and
          your average is <b>{average}lbs</b>.
        </Text>
      </Navigation>
      <Main>
        <WorkoutList />
      </Main>
      <Controls>
        <AppNavigation addButtonRoute="/workout" />
      </Controls>
    </Screen>
  );
};

export default Exercise;
