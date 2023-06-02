export interface AppData {
  user: User | null;
  activeExercise: string;
  exercises: Exercise[];
}

export interface Data {
  data: AppData;
  loading?: boolean;
}

export interface Exercise {
  firestoreId?: string;
  id: string;
  name: string;
  type: string;
}

export interface Category {
  firestoreId?: string;
  id: string;
  name: string;
}

export interface User {
  email: string;
  subscribedTo: boolean;
  name: string;
  image: string;
  workouts: Workout[];
  exercises: Exercise[];
  categories: Category[];
}

export interface Workout {
  id: string;
  exercise: Exercise;
  sets: Set[];
  date: string;
  notes: string;
}

// string is to empty the input field after a workout is added
export interface Set {
  id: string;
  reps: number;
  weight: number;
}

// Next Auth

export interface Providers {
  providers: ProvidersClass;
}

export interface ProvidersClass {
  google: Google;
}

export interface Google {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

// Util function types

export interface HeaviestLift {
  name: string;
  weight: number;
}

export interface MostPerformedExercise {
  name: string;
  count: number;
}

export interface FavouriteDay {
  most: string;
  least: string;
}
