import type {
  FavouriteDay,
  MostPerformedExercise,
  HeaviestLift,
  Set,
  Workout,
} from "../types";

// sort array of objects by key descending

export const sortByDate = (array: Workout[]) => {
  return array.sort((a, b) => {
    const x = new Date(a.date);
    const y = new Date(b.date);
    return x < y ? 1 : x > y ? -1 : 0;
  });
};

export const isBrowser = typeof window !== "undefined";

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeWords = (str: string) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
};

export const trimAndLower = (str: string) => {
  return str.trim().toLowerCase();
};

export const convertLbsToKg = (lbs: number) => {
  return (lbs / 2.2046).toFixed(0);
};

export const convertLbsToTonnes = (lbs: number) => {
  return (lbs / 2204.6).toFixed(2);
};

// function to create 20 character random string of numbers, letters (both lower and upper case)
export const generateRandomFirebaseStyleId = () => {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 20; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return id;
};

export const getMaxWeightFromWorkouts = (workouts: Workout[]) =>
  Math.max(
    ...workouts.map((workout: Workout) =>
      Math.max(...workout.sets.map((set) => Number(set.weight) ?? 0))
    )
  );

export const getTotalSets = (workouts: Workout[]) => {
  let totalSets = 0;

  workouts.forEach((workout: Workout) => {
    totalSets += workout.sets.length;
  });

  return totalSets;
};

export const getTotalReps = (workouts: Workout[]) => {
  let totalReps = 0;
  workouts.forEach((workout: Workout) => {
    workout.sets.map(({ reps }: Set) => {
      totalReps += Number(reps) ?? 0;
    });
  });
  return totalReps;
};

export const getTotalWeight = (workouts: Workout[]) => {
  let totalWeight = 0;
  workouts.forEach((workout: Workout) => {
    workout.sets.map(({ weight }: Set) => {
      totalWeight += Number(weight) ?? 0;
    });
  });
  return totalWeight;
};

export const getHeaviestLift = (workouts: Workout[]): HeaviestLift => {
  let heaviestLift = {
    name: "",
    weight: 0,
  };

  workouts.forEach((workout: Workout) => {
    workout.sets.map(({ weight }: Set) => {
      if (weight > heaviestLift.weight) {
        heaviestLift.name = workout.exercise.name;
        heaviestLift.weight = weight;
      }
    });
  });

  return heaviestLift;
};

export const getMaxWeightFromSets = (sets: Set[]) =>
  Math.max(...sets.map((set: Set) => set.weight));

export const getWeightEquivalent = (weight: number) => {
  if (weight >= 3750 && weight < 4000) {
    return "a Hippopotamus";
  }
  if (weight >= 8000 && weight < 8500) {
    return "a Blue whale’s Tongue";
  }
  if (weight >= 11000 && weight < 15500) {
    return "a Tyrannosaurus Rex";
  }
  if (weight >= 16000 && weight < 20000) {
    return "40-50 Megabytes of data in 1965";
  }

  return "";
};

export const getMostPerformedExercise = (
  workouts: Workout[]
): MostPerformedExercise => {
  let mostPerformed: { [key: string]: number } = {};

  workouts.forEach((workout: Workout) => {
    const name = workout.exercise.name;
    const category = workout.exercise.type;

    const exercise = `${name} (${capitalize(category)})`;

    if (mostPerformed[exercise]) {
      mostPerformed[exercise] += 1;
    } else {
      mostPerformed[exercise] = 1;
    }
  });

  // get the exercise with the highest count

  let mostPerformedExercise = {
    name: "",
    count: 0,
  };

  for (const exercise in mostPerformed) {
    if (mostPerformed[exercise] > mostPerformedExercise.count) {
      mostPerformedExercise.name = exercise;
      mostPerformedExercise.count = mostPerformed[exercise];
    }
  }

  return mostPerformedExercise;
};

export const getFavouriteDay = (workouts: Workout[]): FavouriteDay => {
  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let days = [0, 0, 0, 0, 0, 0, 0];

  workouts.forEach((workout) => (days[new Date(workout.date).getDay()] += 1));

  const max = days.indexOf(Math.max(...days));
  const min = days.indexOf(Math.min(...days));

  if (min == 0 && max === 0) {
    return {
      most: "None",
      least: "None",
    };
  }

  return {
    most: day[max],
    least: day[min],
  };
};
