import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { Category, Exercise, Workout } from "../../types/index";
import { db } from "./firebaseClient";

export const getInitialData = async (email: string) => {
  const initialRef = doc(db, "users", email);

  const docSnap = await getDoc(initialRef);

  if (docSnap.exists()) {
    const email = docSnap.id;
    const name = docSnap.data().name;
    // check if the user is subscribed to another users exercises and categories
    const subscribedTo = docSnap.data().subscribedTo;
    const addedAllExamples = docSnap.data().addedAllExamples;
    const image = docSnap.data().image;

    // use the subscribedTo email if it exists, otherwise use the users email
    const ref = doc(db, "users", subscribedTo ?? email);

    const workouts = collection(initialRef, "workouts");
    const workoutsQuerySnapshot = await getDocs(workouts);
    const workoutsData = workoutsQuerySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
      } as Workout;
    });

    const exercises = collection(ref, "exercises");
    const exercisesQuerySnapshot = await getDocs(exercises);
    const exercisesData = exercisesQuerySnapshot.docs.map((doc) => {
      return {
        firestoreId: doc.id,
        ...doc.data(),
      } as Exercise;
    });

    const categories = collection(ref, "categories");
    const categoriesQuerySnapshot = await getDocs(categories);
    const categoriesData = categoriesQuerySnapshot.docs.map((doc) => {
      return {
        firestoreId: doc.id,
        ...doc.data(),
      } as Category;
    });

    // if the user is subscribed to another users exercises and categories
    // then add the exercises and catagories to the users exercises and categories
    // collections
    if (subscribedTo) {
      exercisesData.forEach(async (exercise: Exercise) => {
        const exerciseRef = doc(initialRef, "exercises", exercise.firestoreId!);
        await setDoc(exerciseRef, {
          id: exercise.id,
          name: exercise.name,
          type: exercise.type,
        });
      });
      categoriesData.forEach(async (category: Category) => {
        const categoryRef = doc(
          initialRef,
          "categories",
          category.firestoreId!
        );
        await setDoc(categoryRef, {
          id: category.id,
          name: category.name,
        });
      });
    }

    const user = {
      email,
      name,
      image,
      isSubscribed: Boolean(subscribedTo),
      workouts: workoutsData,
      categories: categoriesData,
      exercises: exercisesData.sort((a: Exercise, b: Exercise) => {
        return a.name.localeCompare(b.name);
      }),
    };

    const data = {
      user,
      addedAllExamples,
      activeExercise: user.exercises[0],
    };

    return data;
  }

  return false;
};

export const updateValueInFirebase = async (
  email: string,
  key: any,
  value: any
) => {
  if (email === "") return;
  await updateDoc(doc(db, "users", email), {
    [key]: value,
  });
};

export const createAccountInFirebase = async (
  email: string,
  name: string,
  image: string
) => {
  await setDoc(doc(db, "users", email), {
    name: name,
    image: image,
  });
};

export const deleteAccoutFromFirebase = async (email: string) => {
  const ref = doc(db, "users", email);

  // delete the workouts collection belonging to the user
  const workouts = collection(ref, "workouts");
  const workoutsQuerySnapshot = await getDocs(workouts);
  workoutsQuerySnapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
  // delete the exercises collection belonging to the user
  const exercises = collection(ref, "exercises");
  const exercisesQuerySnapshot = await getDocs(exercises);
  exercisesQuerySnapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
  // delete the categories collection belonging to the user
  const categories = collection(ref, "categories");
  const categoriesQuerySnapshot = await getDocs(categories);
  categoriesQuerySnapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });

  // delete the user document
  await deleteDoc(ref);
};

export const saveWorkoutToFirebase = async (
  email: string,
  workout: Workout
) => {
  const ref = doc(db, "users", email);
  await addDoc(collection(ref, "workouts"), workout);
};

export const saveExerciseToFirebase = async (
  email: string,
  exercise: Exercise
) => {
  // get a reference to user document
  const ref = doc(db, "users", email);
  // add exercise to exercises collection
  await addDoc(collection(ref, "exercises"), exercise);
};

export const saveCategoryToFirebase = async (
  email: string,
  category: Category
) => {
  // get a reference to user document
  const ref = doc(db, "users", email);
  // add category to categories collection
  await addDoc(collection(ref, "categories"), category);
};

export const deleteWorkoutFromFirebase = async (
  email: string,
  workoutId: string
) => {
  // get a reference to user document
  const ref = doc(db, "users", email);
  // get the workouts collection
  const workoutsRef = collection(ref, "workouts");
  // query for the workout document
  const q = query(workoutsRef, where("id", "==", workoutId), limit(1));
  // get the workout document data
  const querySnapshot = await getDocs(q);
  // get the workout document id from that data
  const workoutID = querySnapshot.docs[0].id;
  // delete the workout document
  await deleteDoc(doc(workoutsRef, workoutID));
};

export const deleteExerciseFromFirebase = async (
  email: string,
  exerciseId: string
) => {
  // get a reference to user document
  const ref = doc(db, "users", email);
  // get the exercises collection
  const exercisesRef = collection(ref, "exercises");

  // query for the exercise document
  const q = query(exercisesRef, where("id", "==", exerciseId), limit(1));

  // get the exercise document data
  const querySnapshot = await getDocs(q);
  // get the exercise document id from that data
  const exerciseID = querySnapshot.docs[0].id;
  // delete the exercise document
  await deleteDoc(doc(exercisesRef, exerciseID));

  // get workouts
  const workoutsRef = collection(ref, "workouts");
  const workoutsQuerySnapshot = await getDocs(workoutsRef);
  // delete the workouts that contain the exercise id
  workoutsQuerySnapshot.docs.forEach(async (docu) => {
    const workout = docu.data() as Workout;
    if (workout.exercise.id === exerciseId) {
      const workoutID = docu.id;
      await deleteDoc(doc(workoutsRef, workoutID));
    }
  });
};

export const deleteCategoryFromFirebase = async (
  email: string,
  categoryId: string
) => {
  // get a reference to user document
  const ref = doc(db, "users", email);
  // get the categories collection
  const categoryRef = collection(ref, "categories");
  // query for the category document
  const q = query(categoryRef, where("id", "==", categoryId), limit(1));
  // get the category document data
  const querySnapshot = await getDocs(q);
  // get the category document id from that data
  const categroryID = querySnapshot.docs[0].id;
  // delete the category document
  await deleteDoc(doc(categoryRef, categroryID));
};

// export const updateStringsInFirebase = async () => {
//   const users = collection(db, "users");
//   const usersQuerySnapshot = await getDocs(users);
//   usersQuerySnapshot.docs.map((doc) => {
//     const workouts = collection(doc.ref, "workouts");
//     const workoutsQuerySnapshot = getDocs(workouts);
//     workoutsQuerySnapshot.then((workoutsQuerySnapshot) => {
//       workoutsQuerySnapshot.docs.map((doc) => {
//         const data = doc.data();
//         const sets = data.sets;

//         const newSets = sets.map((set: Set) => {
//           const newSet = {
//             id: set.id ?? generateRandomFirebaseStyleId(),
//             reps: Number(set.reps),
//             weight: Number(set.weight),
//           };

//           return newSet;
//         });

//         updateDoc(doc.ref, {
//           sets: newSets,
//         });
//       });
//     });
//   });
// };

// functions to update firestore data (not app related)
// export const updateExercises = async () => {
//   const exercises = collection(db, "exercises");

//   const querySnapshot = await getDocs(exercises);

//   const exercisesData = querySnapshot.docs.map((doc) => {
//     return {
//       id: doc.id,
//       name: doc.data().name,
//       type: doc.data().type,
//     } as Exercise;
//   });

//   const ref = doc(db, `users/8Y5Rxxkeo2tORmCfTFZe`);
//   await setDoc(
//     ref,
//     {
//       exercises: exercisesData,
//     },
//     { merge: true }
//   );
// };

// export const updateWorkouts = async () => {
//   // get user worksouts
//   const users = collection(db, "users");
//   const q = query(users, where("email", "==", "calla91591@gmail.com"));
//   const querySnapshot = await getDocs(q);

//   let newData = querySnapshot.docs.map((doc) => {
//     return doc.data();
//   })[0];

//   newData.workouts = newData.workouts.map((workout: Workout) => {
//     return {
//       ...workout,
//       exercise: {
//         id: workout.exercise.firestoreId,
//         name: workout.exercise.name,
//         type: workout.exercise.type,
//       },
//     };
//   });

//   console.log(newData);

//   const ref = doc(db, `users/8Y5Rxxkeo2tORmCfTFZe`);
//   await setDoc(
//     ref,
//     {
//       workouts: newData.workouts,
//     },
//     { merge: true }
//   );
// }

// export const subcollectionTest = async () => {
//   const ref = doc(db, "users", "dazftw@gmail.com");
//   const docSnap = await getDoc(ref);

//   if (docSnap.exists()) {
//     // get darrens data
//     const data = docSnap.data();
//     const workouts = data.workouts;
//     const exercises = data.exercises;
//     const categories = data.categories;

//     // add to new subcollection
//     const ref = doc(db, "users", "g7o0KqHBP8CvRbDAxlp6");
//     const workoutsColRef = collection(ref, "workouts");
//     const exercisesColRef = collection(ref, "exercises");
//     const categoriesColRef = collection(ref, "categories");

//     workouts.forEach((workout: Workout) => {
//       addDoc(workoutsColRef, workout);
//     });

//     exercises.forEach((exercise: Exercise) => {
//       addDoc(exercisesColRef, exercise);
//     });

//     categories.forEach((category: Category) => {
//       addDoc(categoriesColRef, category);
//     });
//   }
// };

// export const subcollectionTest = async () => {
//   const ref = doc(db, "users", "g7o0KqHBP8CvRbDAxlp6");

//   // get collection workouts
//   const workoutsColRef = collection(ref, "workouts");

//   const workoutsQuerySnapshot = await getDocs(workoutsColRef);

//   const workoutsData = workoutsQuerySnapshot.docs.map((doc) => {
//     return {
//       ...doc.data(),
//     } as Workout;
//   });

//   // get collection exercises
//   const exercisesColRef = collection(ref, "exercises");

//   const exercisesQuerySnapshot = await getDocs(exercisesColRef);

//   const exercisesData = exercisesQuerySnapshot.docs.map((doc) => {
//     return {
//       ...doc.data(),
//     } as Exercise;
//   });

//   // get collection categories
//   const categoriesColRef = collection(ref, "categories");

//   const categoriesQuerySnapshot = await getDocs(categoriesColRef);

//   const categoriesData = categoriesQuerySnapshot.docs.map((doc) => {
//     return {
//       ...doc.data(),
//     } as Category;
//   });

//   const newRef = doc(db, "users", "calla91591@gmail.com");
//   const newWorkoutsColRef = collection(newRef, "workouts");
//   const newExercisesColRef = collection(newRef, "exercises");
//   const newCategoriesColRef = collection(newRef, "categories");

//   workoutsData.forEach((workout: Workout) => {
//     addDoc(newWorkoutsColRef, workout);
//   });

//   exercisesData.forEach((exercise: Exercise) => {
//     addDoc(newExercisesColRef, exercise);
//   });

//   categoriesData.forEach((category: Category) => {
//     addDoc(newCategoriesColRef, category);
//   });
// };
