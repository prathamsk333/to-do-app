"use client"

import { useState, useEffect } from "react"
import { X, Plus, Bell, Calendar, RotateCw, Flag, MapPin, Cloud, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  setActiveTask,
  addStep,
  toggleStepComplete,
  setDueDate,
  setReminder,
  setRepeat,
  setNotes,
  setPriority,
  setLocation,
  fetchWeatherForTask,
  toggleComplete, // Added import for toggleComplete
  type TaskPriority,
} from "@/lib/redux/features/taskSlice"

interface TaskDetailsProps {
  darkMode: boolean
}

export default function TaskDetails({ darkMode }: TaskDetailsProps) {
  const dispatch = useAppDispatch()
  const activeTaskId = useAppSelector((state) => state.tasks.activeTaskId)
  const task = useAppSelector((state) => state.tasks.items.find((task) => task.id === activeTaskId))
  const loading = useAppSelector((state) => state.tasks.loading)

  const [newStep, setNewStep] = useState("")
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [notes, setNotesState] = useState("")
  const [showPriorityMenu, setShowPriorityMenu] = useState(false)
  const [location, setLocationState] = useState("")
  const [showLocationInput, setShowLocationInput] = useState(false)

  useEffect(() => {
    if (task) {
      setNotesState(task.notes || "")
      setLocationState(task.location || "")
      setSelectedDate(task.dueDate || "")
    }
  }, [task])

  if (!task) return null

  const handleClose = () => {
    dispatch(setActiveTask({ id: null }))
  }

  const handleAddStep = () => {
    if (newStep.trim() === "") return
    dispatch(addStep({ id: task.id, text: newStep }))
    setNewStep("")
  }

  const handleToggleStep = (stepId: number) => {
    dispatch(toggleStepComplete({ taskId: task.id, stepId }))
  }

  const handleSetDueDate = (date: string) => {
    dispatch(setDueDate({ id: task.id, dueDate: date }))
    setShowDatePicker(false)
  }

  const handleSetReminder = () => {
    // In a real app, this would show a time picker
    dispatch(setReminder({ id: task.id, reminder: "Tomorrow at 9:00 AM" }))
  }

  const handleSetRepeat = () => {
    // In a real app, this would show options
    dispatch(setRepeat({ id: task.id, repeat: "Daily" }))
  }

  const handleSaveNotes = () => {
    dispatch(setNotes({ id: task.id, notes }))
  }

  const handleSetPriority = (priority: TaskPriority) => {
    dispatch(setPriority({ id: task.id, priority }))
    setShowPriorityMenu(false)
  }

  const handleSetLocation = () => {
    if (location.trim() === "") return
    dispatch(setLocation({ id: task.id, location }))

    // Fetch weather data for the location
    dispatch(fetchWeatherForTask({ id: task.id, location }))
    setShowLocationInput(false)
  }

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-blue-500"
      default:
        return darkMode ? "text-white" : "text-zinc-900"
    }
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 w-80 shadow-lg z-50 p-4 overflow-y-auto",
        darkMode ? "bg-zinc-800 text-white" : "bg-[#f8faf5] text-zinc-900",
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Task Details</h2>
        <button onClick={handleClose} className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-zinc-700">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-4 flex items-start">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch(toggleComplete({ id: task.id }))} // Corrected the function call here
          className="mt-1 mr-3 h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
        />
        <div className="flex-1">
          <div className="text-lg font-medium">{task.text}</div>

          <div className="mt-2 flex flex-wrap gap-2">
            <button
              className={cn(
                "flex items-center rounded-md px-2 py-1 text-sm",
                darkMode ? "bg-zinc-700 hover:bg-zinc-600" : "bg-white hover:bg-gray-100",
                task.priority && getPriorityColor(task.priority),
              )}
              onClick={() => setShowPriorityMenu(!showPriorityMenu)}
            >
              <Flag className="mr-1 h-4 w-4" />
              <span>{task.priority ? `Priority: ${task.priority}` : "Set priority"}</span>
            </button>

            {showPriorityMenu && (
              <div
                className={cn("absolute mt-8 w-32 rounded-md shadow-lg z-10", darkMode ? "bg-zinc-700" : "bg-white")}
              >
                <div className="py-1">
                  <button
                    className={cn(
                      "flex w-full items-center px-4 py-2 text-sm",
                      darkMode ? "hover:bg-zinc-600 text-white" : "hover:bg-gray-100 text-gray-900",
                    )}
                    onClick={() => handleSetPriority("high")}
                  >
                    <Flag className="mr-2 h-4 w-4 text-red-500" />
                    High
                  </button>
                  <button
                    className={cn(
                      "flex w-full items-center px-4 py-2 text-sm",
                      darkMode ? "hover:bg-zinc-600 text-white" : "hover:bg-gray-100 text-gray-900",
                    )}
                    onClick={() => handleSetPriority("medium")}
                  >
                    <Flag className="mr-2 h-4 w-4 text-yellow-500" />
                    Medium
                  </button>
                  <button
                    className={cn(
                      "flex w-full items-center px-4 py-2 text-sm",
                      darkMode ? "hover:bg-zinc-600 text-white" : "hover:bg-gray-100 text-gray-900",
                    )}
                    onClick={() => handleSetPriority("low")}
                  >
                    <Flag className="mr-2 h-4 w-4 text-blue-500" />
                    Low
                  </button>
                  <button
                    className={cn(
                      "flex w-full items-center px-4 py-2 text-sm",
                      darkMode ? "hover:bg-zinc-600 text-white" : "hover:bg-gray-100 text-gray-900",
                    )}
                    onClick={() => handleSetPriority(null)}
                  >
                    <Flag className="mr-2 h-4 w-4 text-gray-400" />
                    None
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Plus className="h-4 w-4 mr-2" />
          <h3 className="text-sm font-medium">Add Step</h3>
        </div>

        <div className="flex items-center mb-2">
          <input
            type="text"
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            className={cn(
              "flex-1 rounded-l-md border px-3 py-1 text-sm",
              darkMode
                ? "bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                : "bg-white border-gray-200 text-zinc-900 placeholder:text-zinc-500",
            )}
            placeholder="Add a step..."
          />
          <button
            onClick={handleAddStep}
            className={cn("rounded-r-md px-3 py-1 text-sm font-medium text-white", "bg-green-600 hover:bg-green-700")}
          >
            Add
          </button>
        </div>

        {task.steps && task.steps.length > 0 && (
          <div className="space-y-2 mt-2">
            {task.steps.map((step) => (
              <div key={step.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={step.completed}
                  onChange={() => handleToggleStep(step.id)}
                  className="mr-2 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className={cn("text-sm", step.completed && "line-through text-gray-500")}>{step.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Location and Weather */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <h3 className="text-sm font-medium">Location</h3>
          </div>
          <button
            onClick={() => setShowLocationInput(!showLocationInput)}
            className="text-sm text-blue-500 hover:text-blue-600"
          >
            {task.location ? "Edit" : "Add"}
          </button>
        </div>

        {showLocationInput ? (
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocationState(e.target.value)}
              className={cn(
                "flex-1 rounded-l-md border px-3 py-1 text-sm",
                darkMode
                  ? "bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                  : "bg-white border-gray-200 text-zinc-900 placeholder:text-zinc-500",
              )}
              placeholder="Enter location..."
            />
            <button
              onClick={handleSetLocation}
              className={cn("rounded-r-md px-3 py-1 text-sm font-medium text-white", "bg-green-600 hover:bg-green-700")}
            >
              Save
            </button>
          </div>
        ) : task.location ? (
          <div className="flex items-center text-sm">
            <span>{task.location}</span>
          </div>
        ) : null}

        {task.location && task.weather && (
          <div className="mt-2 p-2 rounded-md bg-opacity-50 text-sm">
            {loading === "pending" ? (
              <div className="flex items-center">
                <Cloud className="h-4 w-4 mr-2 animate-pulse" />
                <span>Loading weather data...</span>
              </div>
            ) : task.weather.error ? (
              <div className="flex items-center text-red-500">
                <AlertCircle className="h-4 w-4 mr-2" />
                <span>{task.weather.error}</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Cloud className="h-4 w-4 mr-2" />
                <span>
                  {task.weather.temp}°C - {task.weather.condition}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Due Date */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <h3 className="text-sm font-medium">Due Date</h3>
          </div>
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="text-sm text-blue-500 hover:text-blue-600"
          >
            {task.dueDate ? "Edit" : "Add"}
          </button>
        </div>

        {showDatePicker ? (
          <div className="p-2 rounded-md border mb-2">
            <div className="text-center mb-2">
              <h4 className="text-sm font-medium">Select date</h4>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={cn(
                  "w-full rounded-md border px-3 py-1 text-sm mt-1",
                  darkMode ? "bg-zinc-700 border-zinc-600 text-white" : "bg-white border-gray-200 text-zinc-900",
                )}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDatePicker(false)}
                className="px-3 py-1 text-sm rounded-md bg-gray-200 dark:bg-zinc-600"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSetDueDate(selectedDate)}
                className="px-3 py-1 text-sm rounded-md bg-green-600 text-white"
              >
                OK
              </button>
            </div>
          </div>
        ) : task.dueDate ? (
          <div className="flex items-center text-sm">
            <span>{task.dueDate}</span>
          </div>
        ) : null}
      </div>

      {/* Reminder */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            <h3 className="text-sm font-medium">Set Reminder</h3>
          </div>
          <button onClick={handleSetReminder} className="text-sm text-blue-500 hover:text-blue-600">
            {task.reminder ? "Edit" : "Add"}
          </button>
        </div>

        {task.reminder && (
          <div className="flex items-center text-sm">
            <span>{task.reminder}</span>
          </div>
        )}
      </div>

      {/* Repeat */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <RotateCw className="h-4 w-4 mr-2" />
            <h3 className="text-sm font-medium">Repeat</h3>
          </div>
          <button onClick={handleSetRepeat} className="text-sm text-blue-500 hover:text-blue-600">
            {task.repeat ? "Edit" : "Add"}
          </button>
        </div>

        {task.repeat && (
          <div className="flex items-center text-sm">
            <span>{task.repeat}</span>
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Add Notes</h3>
          <button onClick={handleSaveNotes} className="text-sm text-blue-500 hover:text-blue-600">
            Save
          </button>
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotesState(e.target.value)}
          className={cn(
            "w-full rounded-md border px-3 py-2 text-sm",
            darkMode
              ? "bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
              : "bg-white border-gray-200 text-zinc-900 placeholder:text-zinc-500",
          )}
          placeholder="Add notes..."
          rows={4}
        />
      </div>

      <div className="text-xs text-gray-500 mt-auto pt-4">Created Today</div>
    </div>
  )
}

