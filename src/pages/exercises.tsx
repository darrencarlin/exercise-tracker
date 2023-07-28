import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useState } from "react";
import AppNavigation from "components/AppNavigation/AppNavigation";
import Avatar from "components/Avatar/Avatar";
import ExerciseList from "components/Lists/ExerciseList/ExerciseList";
import Input from "components/FormElements/Input/Input";
import ScreenTitle from "components/ScreenTitle/ScreenTitle";
import { Controls, Main, Navigation, Screen } from "styles/pages/exercises";
import { authOptions } from "./api/auth/[...nextauth]";
import { Group } from "styles/shared";

const Exercises = () => {
  const [search, setSearch] = useState("");

  return (
    <Screen>
      <Navigation>
        <Group>
          <ScreenTitle title="Exercises" />
          <Avatar />
        </Group>
        <Input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </Navigation>
      <Main>
        <ExerciseList searchTerm={search} />
      </Main>
      <Controls>
        <AppNavigation addButtonRoute="/add" />
      </Controls>
    </Screen>
  );
};

export default Exercises;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
