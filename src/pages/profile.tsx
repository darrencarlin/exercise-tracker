import BackButton from "components/BackButton/BackButton";
import Divider from "components/Divider/Divider";
import ScreenTitle from "components/ScreenTitle/ScreenTitle";
import Text from "components/Text/Text";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { DeleteButton } from "styles/pages/add";
import Button from "components/FormElements/Button/Button";
import { Controls, Main, Navigation, Screen } from "styles/pages/profile";
import { DELETE_USER_TEXT } from "util/constants";
import {
  checkIfUserIsSubscribedToAnotherUser,
  deleteAccoutFromFirebase,
} from "util/firebase/firebase";
import { isBrowser } from "util/index";
import { useAppDispatch, useAppSelector } from "../redux/hooks/redux";
import { getData, logout, setLoading } from "../redux/slices/app";
import Avatar from "components/Avatar/Avatar";
import { Group } from "styles/shared";
import { useEffect, useState } from "react";

const Profile = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.app);

  const deleteAccount = async () => {
    const confirmed = confirm(DELETE_USER_TEXT);
    if (confirmed) {
      dispatch(setLoading(true));
      await deleteAccoutFromFirebase(user.email);
      signOut();
      dispatch(logout());
      dispatch(setLoading(false));
      isBrowser && router.push("/login");
    }
  };

  const handleLogout = () => {
    signOut();
    dispatch(logout());
    isBrowser && router.push("/login");
  };

  const refreshSubscribedData = () => {
    if (
      !session?.user?.email ||
      !session?.user?.name ||
      !session?.user?.image
    ) {
      return;
    }

    dispatch(
      getData({
        email: session?.user?.email,
        name: session?.user?.name,
        image: session?.user?.image,
      })
    );
  };

  useEffect(() => {
    const checkIfSubscribed = async () => {
      if (!session?.user?.email) return;
      const isSubscribed = await checkIfUserIsSubscribedToAnotherUser(
        session?.user?.email
      );

      setIsSubscribed(isSubscribed);
    };
    checkIfSubscribed();
  }, [session?.user?.email]);

  return (
    <Screen>
      <Navigation>
        <Group>
          <BackButton />
          <Avatar />
        </Group>

        <ScreenTitle title={`Hi, ${user.name}`} />
      </Navigation>
      <Main>
        <Text size="1.2em">
          <b>How to use the app</b>
        </Text>
        <Text>
          The &#x2B; on each screen will add item which corresponds to the title
          of the screen. For example, if you are on the exercises screen, the
          &#x2B; will add an exercise. If you are on the workouts screen, the
          &#x2B; will add a workout.
        </Text>
        <Text>
          To delete an exercise or workout, you can tap and hold until you get a
          prompt to do so.
        </Text>
        <Text>
          To view a summary of your workouts, click the progress icon in the top
          right corner of this screen.
        </Text>
        <Divider />
        {isSubscribed && (
          <>
            <Text>
              You are subscribed to another user. You can refresh your data
              below. This will update your exercises to match the other user.
            </Text>
            <Button type="button" onClick={() => refreshSubscribedData()}>
              Refresh Subscribed Data
            </Button>
          </>
        )}
      </Main>

      <Controls>
        <Button type="button" onClick={() => handleLogout()}>
          Logout
        </Button>
        <DeleteButton type="button" onClick={() => deleteAccount()}>
          Delete Account
        </DeleteButton>
      </Controls>
    </Screen>
  );
};

export default Profile;
