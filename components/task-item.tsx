"use client"

import { useState } from "react"
import { Star, Flag, Calendar, MapPin, Cloud, Trash2, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppDispatch } from "@/lib/redux/hooks"
import {
  toggleComplete,
  toggleImportant,
  deleteTask,
  setActiveTask,
  type Task,
  type TaskPriority,
} from "@/lib/redux/features/taskSlice"

interface TaskItemProps {
  task: Task
  darkMode: boolean
  isBlockView?: boolean
}

export default function TaskItem({ task, darkMode, isBlockView = false }: TaskItemProps) {
  const [showDetails, setShowDetails] = useState(false)
  const dispatch = useAppDispatch()

  const handleToggleComplete = () => {
    dispatch(toggleComplete({ id: task.id }))
  }

  const handleToggleImportant = () => {
    dispatch(toggleImportant({ id: task.id }))
  }

  const handleDelete = () => {
    dispatch(deleteTask({ id: task.id }))
  }

  const handleShowDetails = () => {
    dispatch(setActiveTask({ id: task.id }))
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
        return ""
    }
  }

  const getPriorityLabel = (priority: TaskPriority) => {
    switch (priority) {
      case "high":
        return "High"
      case "medium":
        return "Medium"
      case "low":
        return "Low"
      default:
        return ""
    }
  }

  if (isBlockView) {
    return (
      <div
        className={cn(
          "p-4 rounded-md border transition-all",
          darkMode
            ? "bg-zinc-800 border-zinc-700 hover:border-zinc-600"
            : "bg-white border-gray-200 hover:border-gray-300",
          "cursor-pointer",
        )}
        onClick={handleShowDetails}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => {
                e.stopPropagation()
                handleToggleComplete()
              }}
              className="mr-3 h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className={cn("font-medium", task.completed && "line-through text-gray-500")}>{task.text}</span>
          </div>
          <div className="flex space-x-1">
            {task.priority && <Flag className={cn("h-4 w-4", getPriorityColor(task.priority))} />}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleToggleImportant()
              }}
              className={cn(
                "rounded-full p-1",
                task.important ? "text-yellow-500" : "text-gray-400 hover:text-gray-600",
              )}
            >
              <Star className={cn("h-4 w-4", task.important ? "fill-current" : "")} />
            </button>
          </div>
        </div>

        {task.dueDate && (
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{task.dueDate}</span>
          </div>
        )}

        {task.location && (
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{task.location}</span>

            {task.weather && !task.weather.error && (
              <div className="flex items-center ml-2">
                <Cloud className="h-3 w-3 mr-1" />
                <span>{task.weather.temp}°C</span>
              </div>
            )}
          </div>
        )}

        {task.steps && task.steps.length > 0 && (
          <div className="mt-2 text-xs text-gray-500">
            <div className="flex items-center">
              <span>
                {task.steps.filter((step) => step.completed).length}/{task.steps.length} steps
              </span>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between border-b py-3 group",
        darkMode ? "border-zinc-800" : "border-gray-100",
      )}
    >
      <div className="flex items-center flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="mr-3 h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
        />
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className={cn(task.completed && "line-through text-gray-500")}>{task.text}</span>
            {task.priority && <Flag className={cn("ml-2 h-4 w-4", getPriorityColor(task.priority))} />}
          </div>

          {(task.dueDate || task.location || (task.weather && !task.weather.error)) && (
            <div className="flex items-center mt-1 text-xs text-gray-500 space-x-3">
              {task.dueDate && (
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{task.dueDate}</span>
                </div>
              )}

              {task.location && (
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{task.location}</span>
                </div>
              )}

              {task.weather && !task.weather.error && (
                <div className="flex items-center">
                  <Cloud className="h-3 w-3 mr-1" />
                  <span>{task.weather.temp}°C</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={handleToggleImportant}
          className={cn("rounded-full p-1", task.important ? "text-yellow-500" : "text-gray-400 hover:text-gray-600")}
        >
          <Star className={cn("h-5 w-5", task.important ? "fill-current" : "")} />
        </button>

        <button
          onClick={handleShowDetails}
          className="rounded-full p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <button
          onClick={handleDelete}
          className="rounded-full p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

