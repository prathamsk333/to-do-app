"use client"

import { useEffect } from "react"
import { Cloud, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppDispatch } from "@/lib/redux/hooks"
import { fetchWeatherForTask } from "@/lib/redux/features/taskSlice"

interface WeatherDisplayProps {
  taskId: number
  location: string
  weather?: {
    temp?: number
    condition?: string
    icon?: string
    error?: string
  } | null
  loading: "idle" | "pending" | "succeeded" | "failed"
  darkMode: boolean
}

export default function WeatherDisplay({ taskId, location, weather, loading, darkMode }: WeatherDisplayProps) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (location && (!weather || weather.error)) {
      dispatch(fetchWeatherForTask({ id: taskId, location }))
    }
  }, [dispatch, location, weather, taskId])

  if (!location) return null

  return (
    <div className={cn("mt-2 p-2 rounded-md text-sm", darkMode ? "bg-zinc-700 bg-opacity-50" : "bg-gray-100")}>
      {loading === "pending" ? (
        <div className="flex items-center">
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          <span>Loading weather data...</span>
        </div>
      ) : weather?.error ? (
        <div className="flex items-center text-red-500">
          <AlertCircle className="h-4 w-4 mr-2" />
          <span>{weather.error}</span>
        </div>
      ) : weather?.temp ? (
        <div className="flex items-center">
          <Cloud className="h-4 w-4 mr-2" />
          <span>
            {weather.temp}°C - {weather.condition}
          </span>
        </div>
      ) : (
        <div className="flex items-center">
          <Cloud className="h-4 w-4 mr-2" />
          <span>No weather data available</span>
        </div>
      )}
    </div>
  )
}

