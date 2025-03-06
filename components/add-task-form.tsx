"use client"

import { useState, useRef, type KeyboardEvent } from "react"
import { Bell, Calendar, MapPin, Flag } from "lucide-react"
import { useAppDispatch } from "@/lib/redux/hooks"
import { addTask, fetchWeatherForTask, type TaskPriority } from "@/lib/redux/features/taskSlice"
import { cn } from "@/lib/utils"

interface AddTaskFormProps {
  darkMode: boolean
}

export default function AddTaskForm({ darkMode }: AddTaskFormProps) {
  const [newTask, setNewTask] = useState("")
  const [error, setError] = useState("")
  const [showPriorityMenu, setShowPriorityMenu] = useState(false)
  const [priority, setPriority] = useState<TaskPriority>(null)
  const [location, setLocation] = useState<string>("")
  const [showLocationInput, setShowLocationInput] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()

  const handleAddTask = () => {
    if (newTask.trim() === "") {
      setError("Task cannot be empty")
      inputRef.current?.focus()
      return
    }

    const taskData = {
      text: newTask,
      priority,
      location: location || undefined,
    }

    dispatch(addTask(taskData))

    // If location is provided, fetch weather data
    if (location && location.trim() !== "") {
      const taskId = Date.now() // Same ID used in addTask
      dispatch(fetchWeatherForTask({ id: taskId, location }))
    }

    // Reset form
    setNewTask("")
    setPriority(null)
    setLocation("")
    setShowLocationInput(false)
    setShowPriorityMenu(false)
    setError("")
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask()
    }
  }

  const getPriorityColor = (selectedPriority: TaskPriority) => {
    switch (selectedPriority) {
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
    <div className={cn("mb-6 rounded-md p-4", darkMode ? "bg-zinc-800" : "bg-[#f8faf5]")}>
      <div className="mb-2 text-lg font-medium">Add A Task</div>
      <div className="flex flex-col">
        <input
          ref={inputRef}
          type="text"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value)
            if (error) setError("")
          }}
          className={cn(
            "w-full bg-transparent outline-none",
            darkMode ? "text-white placeholder:text-zinc-400" : "text-zinc-900 placeholder:text-zinc-500",
          )}
          placeholder="Add a new task..."
          onKeyDown={handleKeyDown}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

        {showLocationInput && (
          <div className="mt-2 flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={cn(
                "w-full bg-transparent outline-none text-sm",
                darkMode ? "text-white placeholder:text-zinc-400" : "text-zinc-900 placeholder:text-zinc-500",
              )}
              placeholder="Add location (for weather)..."
            />
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex space-x-4">
          <button className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-zinc-700">
            <Bell className="h-5 w-5" />
          </button>

          <div className="relative">
            <button
              className={cn(
                "rounded-full p-1 hover:bg-gray-200 dark:hover:bg-zinc-700",
                priority && getPriorityColor(priority),
              )}
              onClick={() => setShowPriorityMenu(!showPriorityMenu)}
            >
              <Flag className="h-5 w-5" />
            </button>

            {showPriorityMenu && (
              <div
                className={cn(
                  "absolute left-0 top-full mt-1 w-32 rounded-md shadow-lg z-10",
                  darkMode ? "bg-zinc-700" : "bg-white",
                )}
              >
                <div className="py-1">
                  <button
                    className={cn(
                      "flex w-full items-center px-4 py-2 text-sm",
                      darkMode ? "hover:bg-zinc-600 text-white" : "hover:bg-gray-100 text-gray-900",
                    )}
                    onClick={() => {
                      setPriority("high")
                      setShowPriorityMenu(false)
                    }}
                  >
                    <Flag className="mr-2 h-4 w-4 text-red-500" />
                    High
                  </button>
                  <button
                    className={cn(
                      "flex w-full items-center px-4 py-2 text-sm",
                      darkMode ? "hover:bg-zinc-600 text-white" : "hover:bg-gray-100 text-gray-900",
                    )}
                    onClick={() => {
                      setPriority("medium")
                      setShowPriorityMenu(false)
                    }}
                  >
                    <Flag className="mr-2 h-4 w-4 text-yellow-500" />
                    Medium
                  </button>
                  <button
                    className={cn(
                      "flex w-full items-center px-4 py-2 text-sm",
                      darkMode ? "hover:bg-zinc-600 text-white" : "hover:bg-gray-100 text-gray-900",
                    )}
                    onClick={() => {
                      setPriority("low")
                      setShowPriorityMenu(false)
                    }}
                  >
                    <Flag className="mr-2 h-4 w-4 text-blue-500" />
                    Low
                  </button>
                  <button
                    className={cn(
                      "flex w-full items-center px-4 py-2 text-sm",
                      darkMode ? "hover:bg-zinc-600 text-white" : "hover:bg-gray-100 text-gray-900",
                    )}
                    onClick={() => {
                      setPriority(null)
                      setShowPriorityMenu(false)
                    }}
                  >
                    <Flag className="mr-2 h-4 w-4 text-gray-400" />
                    None
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-zinc-700"
            onClick={() => setShowLocationInput(!showLocationInput)}
          >
            <MapPin className={cn("h-5 w-5", location ? "text-green-500" : "")} />
          </button>

          <button className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-zinc-700">
            <Calendar className="h-5 w-5" />
          </button>
        </div>
        <button
          onClick={handleAddTask}
          className={cn(
            "rounded-md px-4 py-2 font-medium text-white transition-colors",
            darkMode ? "bg-green-600 hover:bg-green-700" : "bg-green-600 hover:bg-green-700",
          )}
        >
          ADD TASK
        </button>
      </div>
    </div>
  )
}

