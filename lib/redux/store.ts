import { configureStore } from "@reduxjs/toolkit"
import tasksReducer, { type TasksState } from "./features/taskSlice"

// Function to load state from localStorage
const loadState = (): TasksState | undefined => {
  try {
    const serializedState = localStorage.getItem("tasksState")
    return serializedState ? JSON.parse(serializedState) : undefined
  } catch (err) {
    return undefined
  }
}

// Function to save state to localStorage
const saveState = (state: TasksState) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("tasksState", serializedState)
  } catch (err) {
    console.error("Could not save state", err)
  }
}

// Load persisted state
const loadPersistedState = () => {
  if (typeof window === "undefined") {
    return undefined
  }
  return loadState()
}

const preloadedState = loadPersistedState()

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: preloadedState ? { tasks: preloadedState } : undefined, // Initialize with localStorage state
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable for development if needed
    }),
})

// Only save state on client side
if (typeof window !== "undefined") {
  store.subscribe(() => {
    saveState(store.getState().tasks) // Save only the tasks slice
  })
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

