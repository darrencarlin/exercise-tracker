import Avatar from "components/Avatar/Avatar";
import BackButton from "components/BackButton/BackButton";
import Button from "components/FormElements/Button/Button";
import TextArea from "components/FormElements/TextArea/TextArea";
import { MaxWeight, WorkoutDate } from "components/Lists/WorkoutList/style";
import ProgressIcon from "components/ProgressIcon/ProgressIcon";
import ScreenTitle from "components/ScreenTitle/ScreenTitle";
import Text from "components/Text/Text";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiCalendar, BiDumbbell, BiRepeat } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "src/redux/hooks/redux";
import {
  removeWorkout,
  saveWorkoutNotes,
  setLoading,
} from "src/redux/slices/app";
import { Set } from "src/types";
import {
  Controls,
  DeleteButton,
  Main,
  Navigation,
  Screen,
  Sets,
  TitleGroup,
} from "styles/pages/workout-details";
import { Group } from "styles/shared";
import theme from "styles/theme";
import { DELETE_WORKOUT_TEXT } from "util/constants";
import {
  deleteWorkoutFromFirebase,
  saveWorkoutNotesToFirebase,
} from "util/firebase/firebase";
import { convertLbsToKg, getMaxWeightFromSets } from "util/index";

const WorkoutDetails = () => {
  const [notes, setNotes] = useState("");
  const { user } = useAppSelector((state) => state.app);
  const activeWorkout = useAppSelector((state) => state.app.activeWorkout);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const saveNotes = async () => {
    dispatch(setLoading(true));
    await saveWorkoutNotesToFirebase(user.email, activeWorkout.id, notes);
    dispatch(saveWorkoutNotes({ id: activeWorkout.id, notes }));
    setNotes("");
    dispatch(setLoading(false));
    router.back();
  };
  const { date, sets } = activeWorkout;

  const maxWeight = getMaxWeightFromSets(sets);

  const deleteWorkout = () => {
    const confirmed = confirm(DELETE_WORKOUT_TEXT);

    if (confirmed) {
      dispatch(setLoading(true));
      const email = user.email;
      deleteWorkoutFromFirebase(email, activeWorkout.id);
      dispatch(removeWorkout(activeWorkout.id));
      dispatch(setLoading(false));
      router.back();
    }
  };

  useEffect(() => {
    setNotes(activeWorkout.notes);
  }, [activeWorkout.notes]);

  return (
    <Screen>
      <Navigation>
        <Group>
          <BackButton />
          <Avatar />
        </Group>
        <TitleGroup>
          <ScreenTitle title={activeWorkout.exercise.name} />
          <ProgressIcon href="/progress/detail" />
        </TitleGroup>
      </Navigation>
      <Main>
        <WorkoutDate>
          <BiCalendar color={theme.colors.blue} />{" "}
          {date && format(new Date(date), "EEE do MMM, yyyy")}
        </WorkoutDate>
        <MaxWeight>
          <BiDumbbell color={theme.colors.blue} />
          {maxWeight}lbs ({convertLbsToKg(maxWeight)}
          kg)
        </MaxWeight>
        <Sets>
          <BiRepeat color={theme.colors.blue} />
          {sets.length}{" "}
          {sets.map((set: Set) => ` ${set.reps}x${set.weight}lbs`)}
        </Sets>

        <Text m="0 0 10px 0">Notes</Text>
        <TextArea onChange={(e) => setNotes(e.target.value)} value={notes} />
        <Button onClick={saveNotes} type="button">
          Save Notes
        </Button>
      </Main>
      <Controls>
        <DeleteButton type="button" onClick={() => deleteWorkout()}>
          Delete Workout
        </DeleteButton>
      </Controls>
    </Screen>
  );
};

export default WorkoutDetails;
