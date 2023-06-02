import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import Slide from "react-reveal/Slide";
import TransitionGroup from "react-transition-group/TransitionGroup";
import BackButton from "components/BackButton/BackButton";
import Button from "components/FormElements/Button/Button";
import Input from "components/FormElements/Input/Input";
import ScreenTitle from "components/ScreenTitle/ScreenTitle";
import Text from "components/Text/Text";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../redux/hooks/redux";
import { addWorkout, setLoading } from "../redux/slices/app";
import {
  Controls,
  DeleteButton,
  Form,
  Main,
  Navigation,
  Screen,
  SetDetails,
  SetItem,
  SetNumber,
  Sets,
} from "styles/pages/workout";
import { generateRandomFirebaseStyleId } from "util/index";
import { saveWorkoutToFirebase } from "util/firebase/firebase";
import { getLocalItem, setLocalItem } from "util/localStorage";
import { Set } from "../types";
import { DELETE_SET_TEXT } from "util/constants";
import Avatar from "components/Avatar/Avatar";
import { Group } from "styles/shared";

const groupProps = {
  appear: false,
  enter: true,
  exit: true,
};

const Workout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.app);
  const { activeExercise } = useAppSelector((state) => state.app);
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState<Set[]>([]);

  const addSet = () => {
    const newSet = {
      id: generateRandomFirebaseStyleId(),
      weight: Number(weight),
      reps: Number(reps),
    };

    setSets([...sets, newSet]);
    setLocalItem("sets", [...sets, newSet]);
    // scroll back to top
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const addNewWorkout = async () => {
    dispatch(setLoading(true));

    const workout = {
      id: generateRandomFirebaseStyleId(),
      exercise: activeExercise,
      date: new Date().toISOString(),
      sets: sets,
      notes: "",
    };

    const email = user.email;
    // save to firebase
    await saveWorkoutToFirebase(email, workout);
    // save to redux
    dispatch(addWorkout(workout));
    // reset state
    setWeight("");
    setReps("");
    setSets([]);
    setLocalItem("sets", []);
    dispatch(setLoading(false));
    router.back();
  };

  const handleDelete = (setId: string) => {
    const canDelete = confirm(DELETE_SET_TEXT);

    if (canDelete) {
      const newSets = sets.filter(({ id }) => id !== setId);
      setSets(newSets);
      setLocalItem("sets", newSets);
    }
  };

  useEffect(() => {
    const sets = getLocalItem("sets");
    if (sets) {
      setSets(sets);
    }
  }, []);

  return (
    <Screen>
      <Navigation>
        <Group>
          <BackButton />
          <Avatar />
        </Group>
        <ScreenTitle title="Workout" />
        <Text>
          Add your <b>{activeExercise.name}</b> sets and then tap{" "}
          <b>&apos;save workout&apos;</b> to save.
        </Text>
      </Navigation>
      <Main>
        <Form>
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Weight (lbs)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
          <Button type="button" onClick={() => addSet()}>
            Add Set
          </Button>
        </Form>

        <Sets>
          <TransitionGroup {...groupProps}>
            {sets.map((set, index) => (
              <Slide key={set.id} right collapse opposite>
                <SetItem>
                  <SetDetails>
                    <SetNumber>
                      <b>{index + 1}</b>
                    </SetNumber>
                    <span>
                      <b>Reps</b>: {set.reps}
                    </span>
                    <span>
                      <b>Weight</b>: {set.weight}lbs
                    </span>
                  </SetDetails>

                  <DeleteButton onClick={() => handleDelete(set.id)}>
                    <BsTrash size="1.5em" color="white" />
                  </DeleteButton>
                </SetItem>
              </Slide>
            ))}
          </TransitionGroup>
        </Sets>
      </Main>
      <Controls>
        {sets.length > 0 && (
          <Button type="button" onClick={addNewWorkout}>
            Save Workout
          </Button>
        )}
      </Controls>
    </Screen>
  );
};

export default Workout;
