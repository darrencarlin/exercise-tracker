import AppNavigation from "components/AppNavigation/AppNavigation";
import Avatar from "components/Avatar/Avatar";
import BackButton from "components/BackButton/BackButton";
import ScreenTitle from "components/ScreenTitle/ScreenTitle";
import { format } from "date-fns";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAppSelector } from "src/redux/hooks/redux";
import { useTheme } from "styled-components";
import { Controls, Main, Navigation, Screen } from "styles/pages/exercise";
import { Group } from "styles/shared";
import { getMaxWeightFromSets } from "util/index";

const ExerciseDetailed = () => {
  const activeExercise = useAppSelector((state) => state.app.activeExercise);
  const workouts = useAppSelector((state) =>
    state.app.user.workouts.filter(
      (workout) => workout.exercise.id === activeExercise.id
    )
  );

  const theme = useTheme();

  const data = workouts
    .map((workout) => ({
      date: workout.date,
      dateDisplay: format(new Date(workout.date), "M/dd"),
      weight: getMaxWeightFromSets(workout.sets || []),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <Screen>
      <Navigation>
        <Group>
          <BackButton />
          <Avatar />
        </Group>
        <ScreenTitle title={activeExercise.name} />
      </Navigation>
      <Main>
        <ResponsiveContainer width="100%" height="50%">
          <LineChart width={500} height={300} data={data}>
            <XAxis dataKey="dateDisplay" />
            <YAxis dataKey="weight" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="weight"
              stroke={theme.colors.blue}
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Main>
      <Controls>
        <AppNavigation />
      </Controls>
    </Screen>
  );
};

export default ExerciseDetailed;
