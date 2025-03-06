import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

export type TaskPriority = "high" | "medium" | "low" | null

export interface Task {
  id: number
  text: string
  completed: boolean
  important: boolean
  priority: TaskPriority
  dueDate: string | null
  location?: string | null
  notes?: string | null
  steps?: { id: number; text: string; completed: boolean }[]
  reminder?: string | null
  repeat?: string | null
  weather?: {
    temp?: number
    condition?: string
    icon?: string
    error?: string
  } | null
}

export interface TasksState {
  items: Task[]
  loading: "idle" | "pending" | "succeeded" | "failed"
  error: string | null
  activeTaskId: number | null
  view: "list" | "block"
  filter: "all" | "today" | "important" | "planned" | "assigned"
}

const initialState: TasksState = {
  items: [
    {
      id: 1,
      text: "Buy groceries",
      completed: false,
      important: false,
      priority: null,
      dueDate: null,
      location: null,
      notes: null,
      steps: [],
    },
    {
      id: 2,
      text: "Finish project report",
      completed: false,
      important: true,
      priority: "high",
      dueDate: null,
      location: null,
      notes: null,
      steps: [],
    },
    {
      id: 3,
      text: "Call the bank",
      completed: false,
      important: false,
      priority: "medium",
      dueDate: null,
      location: null,
      notes: null,
      steps: [],
    },
    {
      id: 4,
      text: "Schedule dentist appointment",
      completed: false,
      important: false,
      priority: null,
      dueDate: null,
      location: null,
      notes: null,
      steps: [],
    },
    {
      id: 5,
      text: "Plan weekend trip",
      completed: false,
      important: false,
      priority: "low",
      dueDate: null,
      location: "Beach",
      notes: null,
      steps: [],
      weather: null,
    },
    {
      id: 6,
      text: "Read a book",
      completed: true,
      important: false,
      priority: null,
      dueDate: null,
      location: null,
      notes: null,
      steps: [],
    },
    {
      id: 7,
      text: "Clean the house",
      completed: true,
      important: false,
      priority: null,
      dueDate: null,
      location: null,
      notes: null,
      steps: [],
    },
    {
      id: 8,
      text: "Prepare presentation",
      completed: true,
      important: false,
      priority: "high",
      dueDate: null,
      location: null,
      notes: null,
      steps: [],
    },
    {
      id: 9,
      text: "Update blog",
      completed: true,
      important: false,
      priority: null,
      dueDate: null,
      location: null,
      notes: null,
      steps: [],
    },
  ],
  loading: "idle",
  error: null,
  activeTaskId: null,
  view: "list",
  filter: "all",
}

// Async thunk for fetching weather data using WeatherAPI
export const fetchWeatherForTask = createAsyncThunk(
  "tasks/fetchWeather",
  async ({ id, location }: { id: number; location: string }, { rejectWithValue }) => {
    try {
      // Using WeatherAPI (you would need to add your API key as an env variable)
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=454d22e47f5c46cb80c191131250503&q=${location}`,
      )

      if (!response.ok) {
        throw new Error("Weather data not available")
      }

      const data = await response.json()

      return {
        id,
        weather: {
          temp: data.current.temp_c,
          condition: data.current.condition.text,
          icon: data.current.condition.icon,
        },
      }
    } catch (error) {
      return rejectWithValue({
        id,
        error: error instanceof Error ? error.message : "Failed to fetch weather data",
      })
    }
  },
)

interface UserState {
  user: User | null;
  error: string | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const loadUserFromLocalStorage = (): User | null => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

const initialUserState: UserState = {
  user: loadUserFromLocalStorage(),
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ text: string; priority?: TaskPriority; location?: string }>) => {
      const newTask: Task = {
        id: Date.now(),
        text: action.payload.text,
        completed: false,
        important: false,
        priority: action.payload.priority || null,
        dueDate: null,
        location: action.payload.location || null,
        notes: null,
        steps: [],
      }
      state.items.push(newTask)
    },
    toggleComplete: (state, action: PayloadAction<{ id: number }>) => {
      const task = state.items.find((task) => task.id === action.payload.id)
      if (task) {
        task.completed = !task.completed
      }
    },
    toggleImportant: (state, action: PayloadAction<{ id: number }>) => {
      const task = state.items.find((task) => task.id === action.payload.id)
      if (task) {
        task.important = !task.important
      }
    },
    deleteTask: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((task) => task.id !== action.payload.id)
    },
    setPriority: (state, action: PayloadAction<{ id: number; priority: TaskPriority }>) => {
      const task = state.items.find((task) => task.id === action.payload.id)
      if (task) {
        task.priority = action.payload.priority
      }
    },
    setDueDate: (state, action: PayloadAction<{ id: number; dueDate: string }>) => {
      const task = state.items.find((task) => task.id === action.payload.id)
      if (task) {
        task.dueDate = action.payload.dueDate
      }
    },
    setLocation: (state, action: PayloadAction<{ id: number; location: string }>) => {
      const task = state.items.find((task) => task.id === action.payload.id)
      if (task) {
        task.location = action.payload.location
      }
    },
    addStep: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const task = state.items.find((task) => task.id === action.payload.id)
      if (task) {
        if (!task.steps) task.steps = []
        task.steps.push({
          id: Date.now(),
          text: action.payload.text,
          completed: false,
        })
      }
    },
    toggleStepComplete: (state, action: PayloadAction<{ taskId: number; stepId: number }>) => {
      const task = state.items.find((task) => task.id === action.payload.taskId)
      if (task && task.steps) {
        const step = task.steps.find((step) => step.id === action.payload.stepId)
        if (step) {
          step.completed = !step.completed
        }
      }
    },
    setReminder: (state, action: PayloadAction<{ id: number; reminder: string | null }>) => {
      const task = state.items.find((task) => task.id === action.payload.id)
      if (task) {
        task.reminder = action.payload.reminder
      }
    },
    setRepeat: (state, action: PayloadAction<{ id: number; repeat: string | null }>) => {
      const task = state.items.find((task) => task.id === action.payload.id)
      if (task) {
        task.repeat = action.payload.repeat
      }
    },
    setNotes: (state, action: PayloadAction<{ id: number; notes: string }>) => {
      const task = state.items.find((task) => task.id === action.payload.id)
      if (task) {
        task.notes = action.payload.notes
      }
    },
    setActiveTask: (state, action: PayloadAction<{ id: number | null }>) => {
      state.activeTaskId = action.payload.id
    },
    toggleView: (state) => {
      state.view = state.view === "list" ? "block" : "list"
    },
    setFilter: (state, action: PayloadAction<{ filter: "all" | "today" | "important" | "planned" | "assigned" }>) => {
      state.filter = action.payload.filter
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForTask.pending, (state) => {
        state.loading = "pending"
      })
      .addCase(fetchWeatherForTask.fulfilled, (state, action) => {
        state.loading = "succeeded"
        const task = state.items.find((task) => task.id === action.payload.id)
        if (task) {
          task.weather = action.payload.weather
        }
      })
      .addCase(fetchWeatherForTask.rejected, (state, action) => {
        state.loading = "failed"
        state.error = "Failed to fetch weather data"
        const payload = action.payload as { id: number; error: string } | undefined

        if (payload) {
          const task = state.items.find((task) => task.id === payload.id)
          if (task) {
            task.weather = { error: payload.error }
          }
        }
      })
  },
});

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    },
  },
});

export const { setUser, setError, clearUser } = userSlice.actions;

export const {
  addTask,
  toggleComplete,
  toggleImportant,
  deleteTask,
  setPriority,
  setDueDate,
  setLocation,
  addStep,
  toggleStepComplete,
  setReminder,
  setRepeat,
  setNotes,
  setActiveTask,
  toggleView,
  setFilter,
  
} = tasksSlice.actions

export default tasksSlice.reducer