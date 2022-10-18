/* eslint-disable react-hooks/exhaustive-deps */
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { getData, initialState, setData } from "../../redux/slices/app";
import { getLocalItem, setLocalItem } from "util/localStorage";
import { Loader, Wrapper } from "./style";
import Navigation from "components/Navigation/Navigation";

interface UserDataProps {
  children: React.ReactNode;
}

const UserDataWrapper = ({ children }: UserDataProps) => {
  const router = useRouter();
  const { loading } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    const localData = getLocalItem("app");

    if (localData) {
      // check if localdata has a value for name
      if (localData.user.name) {
        dispatch(setData(localData));
      }

      // if localdata has no value for name, check if session has a value for name
      else if (
        session?.user?.email &&
        session?.user?.name &&
        session?.user?.image
      ) {
        dispatch(
          getData({
            email: session?.user?.email,
            name: session?.user?.name,
            image: session?.user?.image,
          })
        );
      }
    }

    // if localdata is null, check if session has a value for name
    else if (
      session?.user?.email &&
      session?.user?.name &&
      session?.user?.image
    ) {
      dispatch(
        getData({
          email: session?.user?.email,
          name: session?.user?.name,
          image: session?.user?.image,
        })
      );
    }

    // if localdata is null and session has no value for name, redirect to login
    else {
      setLocalItem("app", initialState);
      router.push("/login");
    }
  }, [session]);

  if (loading)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );

  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default UserDataWrapper;
