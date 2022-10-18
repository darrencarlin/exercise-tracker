import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Exercise, User } from "../../types/index";
import {
  createAccountInFirebase,
  getInitialData,
} from "util/firebase/firebase";
import { removeLocalItem, setLocalItem } from "util/localStorage";
import { exampleExercises } from "util/example-data";

interface AppState {
  activeExercise: Exercise;
  user: User;
  addedAllExamples: boolean;
  navOpen: boolean;
  loading: boolean;
}

export const initialState: AppState = {
  user: {
    email: "",
    isSubscribed: false,
    image: "",
    name: "",
    workouts: [],
    exercises: [],
    categories: [],
  },
  activeExercise: {
    id: "",
    name: "",
    type: "",
  },
  addedAllExamples: false,
  navOpen: false,
  loading: false,
};

interface UserCredentials {
  email: string;
  name: string;
  image: string;
}

export const getData = createAsyncThunk(
  "app/getData",
  async ({ email, name, image }: UserCredentials) => {
    const data = await getInitialData(email);

    // If user doesn't exist, create a new account
    if (!data) {
      // this creates a simple collection with the user's email as the document name
      // and a name field with the user's name
      await createAccountInFirebase(email, name, image);

      const data = {
        user: {
          email: email,
          image: image,
          isSubscribed: false,
          name: name,
          workouts: [],
          exercises: [],
          categories: [],
        },
        activeExercise: {
          id: "",
          name: "",
          type: "",
        },
        addedAllExamples: false,
        navOpen: false,
        loading: false,
      };
      setLocalItem("app", data);
      return data;
    }
    // If user exists, return data
    setLocalItem("app", data);
    return data;
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAddedAllExamples: (state, { payload }) => {
      state.addedAllExamples = payload;
      setLocalItem("app", state);
    },
    toggleNav: (state) => {
      state.navOpen = !state.navOpen;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setData: (state, { payload }) => {
      state.loading = true;
      state.user = payload.user;
      state.activeExercise = payload.activeExercise;
      state.addedAllExamples = payload.addedAllExamples;
      // save to local storage
      setLocalItem("app", state);
      state.loading = false;
    },
    setActiveExercise: (state, { payload }) => {
      state.activeExercise = payload;
      setLocalItem("app", state);
    },
    addExercise: (state, { payload }) => {
      state.user.exercises.push(payload);
      // save to local storage
      setLocalItem("app", state);
    },

    addCategory: (state, { payload }) => {
      state.user.categories.push(payload);
      // save to local storage
      setLocalItem("app", state);
    },
    removeExercise: (state, { payload }) => {
      state.user.exercises = state.user.exercises.filter(
        (exercise) => exercise.id !== payload
      );
      // remove workouts that contain the exercise id
      state.user.workouts = state.user.workouts.filter(
        (workout) => workout.exercise.id !== payload
      );

      // check if the removed exercise was apart of the example data
      // if it was, set addedAllExamples to false

      if (exampleExercises.find((exercise) => exercise.id === payload)) {
        console.log("found example exercise");
        state.addedAllExamples = false;
      }

      setLocalItem("app", state);
    },
    removeCategory: (state, { payload }) => {
      state.user.categories = state.user.categories.filter(
        (category) => category.id !== payload
      );
      setLocalItem("app", state);
    },
    addWorkout: (state, { payload }) => {
      state.user.workouts.push(payload);
      setLocalItem("app", state);
    },
    removeWorkout: (state, { payload }) => {
      state.user.workouts = state.user.workouts.filter(
        (workout) => workout.id !== payload
      );
      setLocalItem("app", state);
    },
    logout: (state) => {
      state.user = initialState.user;
      state.activeExercise = initialState.activeExercise;
      removeLocalItem("app");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getData.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload.user;
        state.addedAllExamples = payload.addedAllExamples;
        state.activeExercise = payload.user.exercises?.[0];
      }
      state.loading = false;
    });
    builder.addCase(getData.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  setAddedAllExamples,
  toggleNav,
  setLoading,
  setData,
  setActiveExercise,
  addExercise,
  addCategory,
  removeExercise,
  removeCategory,
  addWorkout,
  removeWorkout,
  logout,
} = appSlice.actions;

export const appReducer = appSlice.reducer;
