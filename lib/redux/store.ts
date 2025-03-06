import { configureStore } from "@reduxjs/toolkit"
import tasksReducer, { type TasksState } from "./features/taskSlice"

const loadState = (): TasksState | undefined => {
  try {
    const serializedState = localStorage.getItem("tasksState")
    return serializedState ? JSON.parse(serializedState) : undefined
  } catch (err) {
    return undefined
  }
}

const saveState = (state: TasksState) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("tasksState", serializedState)
  } catch (err) {
    console.error("Could not save state", err)
  }
}

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
  preloadedState: preloadedState ? { tasks: preloadedState } : undefined,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
})

if (typeof window !== "undefined") {
  store.subscribe(() => {
    saveState(store.getState().tasks) 
  })
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

