"use client"

import { useState, useEffect } from "react"
import {
  Calendar,
  Check,
  ChevronDown,
  Loader2,
  Menu,
  Moon,
  Plus,
  Search,
  Star,
  Sun,
  List,
  LayoutGrid,
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { setFilter, toggleView } from "@/lib/redux/features/taskSlice"
import AddTaskForm from "@/components/add-task-form"
import TaskItem from "@/components/task-item"
import TaskDetails from "@/components/task-details"

export default function TodoApp() {
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const tasks = useAppSelector((state) => state.tasks.items)
  const activeTaskId = useAppSelector((state) => state.tasks.activeTaskId)
  const currentFilter = useAppSelector((state) => state.tasks.filter)
  const currentView = useAppSelector((state) => state.tasks.view)
  const dispatch = useAppDispatch()

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Filter tasks
  const getFilteredTasks = () => {
    switch (currentFilter) {
      case "today":
        return tasks
      case "important":
        return tasks.filter((task) => task.important)
      case "planned":
        return tasks.filter((task) => task.dueDate)
      case "assigned":
        return tasks
      default:
        return tasks
    }
  }

  const filteredTasks = getFilteredTasks()
  const pendingTasks = filteredTasks.filter((task) => !task.completed)
  const completedTasks = filteredTasks.filter((task) => task.completed)

  // Calculate stats
  const totalTasks = tasks.length
  const completedTasksCount = tasks.filter((task) => task.completed).length
  const pendingTasksCount = tasks.filter((task) => !task.completed).length
  const completionPercentage = totalTasks > 0 ? (completedTasksCount / totalTasks) * 100 : 0

  return (
    <div className={cn("flex min-h-screen w-full", darkMode ? "bg-zinc-900 text-white" : "bg-white text-zinc-900")}>
      {/* Mobile menu button */}
      <button className="fixed top-4 left-4 z-50 md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          darkMode ? "bg-zinc-800" : "bg-[#f8faf5]",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center p-4">
            <div className="text-2xl font-bold text-green-600 flex items-center">
              <svg viewBox="0 0 24 24" className="h-8 w-8 mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  fill="currentColor"
                />
              </svg>
              DoIt
            </div>
          </div>

          {/* User profile */}
          <div className="flex flex-col items-center p-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-full">
              <Image
                src="/profile.png?height=96&width=96"
                alt="User avatar"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <h2 className="mt-4 text-xl font-semibold">Hey, ABCD</h2>
          </div>

          {/* Navigation */}
          <nav className="mt-4 flex-1 space-y-1 px-4">
            <button
              className={cn(
                "flex w-full items-center rounded-md px-3 py-2",
                currentFilter === "all"
                  ? darkMode
                    ? "bg-green-800/50"
                    : "bg-gray-100 "
                  : darkMode
                    ? "hover:bg-zinc-700"
                    : "hover:bg-white",
                "text-left",
              )}
              onClick={() => dispatch(setFilter({ filter: "all" }))}
            >
              <div className="mr-3">
                <Check className="h-5 w-5" />
              </div>
              <span>All Tasks</span>
            </button>

            <button
              className={cn(
                "flex w-full items-center rounded-md px-3 py-2",
                currentFilter === "today"
                  ? darkMode
                    ? "bg-green-800/50"
                    : "bg-green-100"
                  : darkMode
                    ? "hover:bg-zinc-700"
                    : "hover:bg-white",
                "text-left",
              )}
              onClick={() => dispatch(setFilter({ filter: "today" }))}
            >
              <div className="mr-3 text-green-600">
                <Calendar className="h-5 w-5" />
              </div>
              <span>Today</span>
            </button>

            <button
              className={cn(
                "flex w-full items-center rounded-md px-3 py-2",
                currentFilter === "important"
                  ? darkMode
                    ? "bg-green-800/50"
                    : "bg-green-100"
                  : darkMode
                    ? "hover:bg-zinc-700"
                    : "hover:bg-white",
                "text-left",
              )}
              onClick={() => dispatch(setFilter({ filter: "important" }))}
            >
              <div className="mr-3">
                <Star className="h-5 w-5" />
              </div>
              <span>Important</span>
            </button>

            <button
              className={cn(
                "flex w-full items-center rounded-md px-3 py-2",
                currentFilter === "planned"
                  ? darkMode
                    ? "bg-green-800/50"
                    : "bg-green-100"
                  : darkMode
                    ? "hover:bg-zinc-700"
                    : "hover:bg-white",
                "text-left",
              )}
              onClick={() => dispatch(setFilter({ filter: "planned" }))}
            >
              <div className="mr-3">
                <Calendar className="h-5 w-5" />
              </div>
              <span>Planned</span>
            </button>

            <button
              className={cn(
                "flex w-full items-center rounded-md px-3 py-2",
                currentFilter === "assigned"
                  ? darkMode
                    ? "bg-green-800/50"
                    : "bg-green-100"
                  : darkMode
                    ? "hover:bg-zinc-700"
                    : "hover:bg-white",
                "text-left",
              )}
              onClick={() => dispatch(setFilter({ filter: "assigned" }))}
            >
              <div className="mr-3">
                <Loader2 className="h-5 w-5" />
              </div>
              <span>Assigned to me</span>
            </button>
          </nav>

          {/* Add list button */}
          <div className="p-4">
            <button
              className={cn(
                "flex w-full items-center rounded-md px-3 py-2",
                darkMode ? "hover:bg-zinc-700" : "hover:bg-white",
                "text-left",
              )}
            >
              <div className="mr-3">
                <Plus className="h-5 w-5" />
              </div>
              <span>Add list</span>
            </button>
          </div>

          {/* Stats */}
          <div className={cn("mt-auto p-4", darkMode ? "bg-zinc-800" : "bg-[#f8faf5]")}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Today Tasks</div>
                <div className="text-2xl font-bold">{pendingTasksCount}</div>
              </div>
              <div className="text-gray-400">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Progress chart */}
            <div className="mt-4 flex justify-center">
              <div className="relative h-32 w-32">
                <svg viewBox="0 0 36 36" className="h-full w-full">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-green-200"
                    strokeWidth="3.8"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-green-600"
                    strokeWidth="3.8"
                    strokeDasharray={`${completionPercentage} 100`}
                    strokeLinecap="round"
                    transform="rotate(-90 18 18)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={cn("h-24 w-24 rounded-full", darkMode ? "bg-zinc-900" : "bg-white")}></div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-center space-x-4 text-xs">
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-green-600"></div>
                <span>Pending</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-green-300"></div>
                <span>Done</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={cn(
          "flex-1 transition-all duration-200 ease-in-out",
          sidebarOpen ? "md:ml-64" : "ml-0",
          darkMode ? "bg-zinc-900" : "bg-white",
        )}
      >
        <div className="container mx-auto max-w-4xl p-4">
          {/* Header */}
          <header className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <div
                className={cn(
                  "flex items-center rounded-md border px-3 py-1",
                  darkMode ? "border-zinc-700 text-zinc-400" : "border-zinc-200 text-zinc-500",
                )}
              >
                <span>To Do</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-zinc-800">
                <Search className="h-5 w-5" />
              </button>
              <button
                className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
                onClick={() => dispatch(toggleView())}
              >
                {currentView === "list" ? <LayoutGrid className="h-5 w-5" /> : <List className="h-5 w-5" />}
              </button>
              <button
                className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </header>

          {/* Task input */}
          <AddTaskForm darkMode={darkMode} />

          {/* Task list */}
          {currentView === "list" ? (
            <div className="space-y-6">
              {/* Pending tasks */}
              {pendingTasks.length > 0 && (
                <div className="space-y-1">
                  {pendingTasks.map((task) => (
                    <TaskItem key={task.id} task={task} darkMode={darkMode} />
                  ))}
                </div>
              )}

              {/* Completed tasks */}
              {completedTasks.length > 0 && (
                <div>
                  <h3 className="mb-2 font-medium">Completed</h3>
                  <div className="space-y-1">
                    {completedTasks.map((task) => (
                      <TaskItem key={task.id} task={task} darkMode={darkMode} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {/* Pending tasks */}
              {pendingTasks.map((task) => (
                <TaskItem key={task.id} task={task} darkMode={darkMode} isBlockView={true} />
              ))}

              {/* Completed tasks */}
              {completedTasks.length > 0 && (
                <>
                  <div className="col-span-full mt-4 mb-2">
                    <h3 className="font-medium">Completed</h3>
                  </div>
                  {completedTasks.map((task) => (
                    <TaskItem key={task.id} task={task} darkMode={darkMode} isBlockView={true} />
                  ))}
                </>
              )}
            </div>
          )}

          {/* Task Details Panel */}
          {activeTaskId && <TaskDetails darkMode={darkMode} />}
        </div>
      </main>
    </div>
  )
}

