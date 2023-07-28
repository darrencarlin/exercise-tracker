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
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 20; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return id;
};

export const getTopFiveExercises = (workouts: Workout[]) => {
  const exercises: MostPerformedExercise[] = [];

  workouts.forEach((workout) => {
    const exercise = exercises.find(
      (exercise) => exercise.name === workout.exercise.name
    );
    if (exercise) {
      exercise.count++;
    } else {
      exercises.push({
        id: workout.exercise.id,
        type: workout.exercise.type,
        name: workout.exercise.name,
        count: 1,
      });
    }
  });

  return exercises
    .sort((a, b) => (a.count < b.count ? 1 : a.count > b.count ? -1 : 0))
    .slice(0, 5);
};

export const getMaxLift = (workouts: Workout[]) => {
  let maxWeight = 0;
  let maxSet: Set = {
    id: "",
    reps: 0,
    weight: 0,
  };

  workouts.forEach((workout) => {
    workout.sets.forEach((set) => {
      const weight = Number(set.weight);
      if (weight > maxWeight) {
        maxWeight = weight;
        maxSet = set;
      }
    });
  });

  return maxSet;
};

export const getAverageFromWorkouts = (workouts: Workout[]) => {
  let totalWeight = 0;
  let totalCount = 0;

  workouts.forEach((workout) => {
    workout.sets.forEach((s) => {
      totalWeight += s.weight;
      totalCount++;
    });
  });

  const average = totalCount ? totalWeight / totalCount : 0;
  return average.toFixed(0);
};

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
    workout.sets.forEach(({ reps }: Set) => {
      totalReps += Number(reps) ?? 0;
    });
  });
  return totalReps;
};

export const getTotalWeight = (workouts: Workout[]) => {
  let totalWeight = 0;
  workouts.forEach((workout: Workout) => {
    workout.sets.forEach(({ weight }: Set) => {
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
    workout.sets.forEach(({ weight }: Set) => {
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

const weightEquivalents = [
  { min: 20, max: 25, equivalent: "a car tire" },
  { min: 70, max: 80, equivalent: "a golden retriever" },
  { min: 100, max: 150, equivalent: "a newborn elephant" },
  { min: 150, max: 200, equivalent: "an adult human" },
  { min: 800, max: 1000, equivalent: "a grand piano" },
  { min: 1200, max: 1300, equivalent: "a horse" },
  { min: 2500, max: 3000, equivalent: "a small car" },
  { min: 3750, max: 4000, equivalent: "a Hippopotamus" },
  { min: 5000, max: 6000, equivalent: "a large SUV" },
  { min: 8000, max: 8500, equivalent: "a Blue whale’s Tongue" },
  { min: 11000, max: 15500, equivalent: "a Tyrannosaurus Rex 🦖" },
  { min: 16000, max: 20000, equivalent: "40-50 Megabytes of data in 1965 💾" },
  { min: 30000, max: 35000, equivalent: "an adult blue whale 🐋" },
  { min: 40000, max: 45000, equivalent: "a city bus 🚌" },
  { min: 60000, max: 65000, equivalent: "a tank 🪖" },
  { min: 70000, max: 75000, equivalent: "a space shuttle 🚀" },
  { min: 7000000, max: 8000000, equivalent: "the Eiffel Tower 🗼" },
  { min: 580000000, max: 600000000, equivalent: "the Great Pyramid of Giza" },
];

export const getWeightEquivalent = (weight: number) => {
  const equivalent = weightEquivalents.find(
    ({ min, max }) => weight >= min && weight < max
  );
  return equivalent ? equivalent.equivalent : "";
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
    id: "",
    type: "",
    name: "",
    count: 0,
  };

  for (const exercise in mostPerformed) {
    if (mostPerformed[exercise] > mostPerformedExercise.count) {
      mostPerformedExercise.name = exercise;
      mostPerformedExercise.count = mostPerformed[exercise];
      mostPerformedExercise.type = exercise.split("(")[1].split(")")[0];
      mostPerformedExercise.id = exercise.split("(")[0].trim();
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
