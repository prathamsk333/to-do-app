"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Star,
  Calendar,
  Cloud,
  Flag,
  Bell,
  Moon,
  Sun,
  ArrowRight,
  Menu,
  X,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuRef]);

  return (
    <div
      className={cn(
        "min-h-screen w-full",
        darkMode ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"
      )}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md bg-opacity-80 transition-colors duration-200 ease-in-out">
        <div
          className={cn(
            "border-b",
            darkMode
              ? "bg-zinc-900/80 border-zinc-800"
              : "bg-white/80 border-zinc-100"
          )}
        >
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <div className="text-2xl font-bold text-green-600 flex items-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 mr-2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                      fill="currentColor"
                    />
                  </svg>
                  DoIt
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a
                  href="#features"
                  className="text-sm font-medium hover:text-green-600 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#testimonials"
                  className="text-sm font-medium hover:text-green-600 transition-colors"
                >
                  Testimonials
                </a>
                <a
                  href="#pricing"
                  className="text-sm font-medium hover:text-green-600 transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#faq"
                  className="text-sm font-medium hover:text-green-600 transition-colors"
                >
                  FAQ
                </a>
              </nav>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <button
                  className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>

                <Link
                  href="/login"
                  className={cn(
                    "hidden md:inline-flex items-center rounded-md px-4 py-2 text-sm font-medium",
                    "bg-green-600 text-white hover:bg-green-700 transition-colors"
                  )}
                >
                  Get Started
                </Link>

                {/* Mobile menu button */}
                <button
                  className="md:hidden rounded-md p-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          ref={mobileMenuRef}
          className={cn(
            "md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 transform transition-transform duration-300 ease-in-out",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="space-y-1 px-4 pb-3 pt-2">
            <a
              href="#features"
              className="block px-3 py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="block px-3 py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="block px-3 py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="block px-3 py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <Link
              href="/login"
              className={cn(
                "block px-3 py-2 text-base font-medium rounded-md mt-4",
                "bg-green-600 text-white hover:bg-green-700 transition-colors"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

     
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Organize your tasks,{" "}
                <span className="text-green-600">boost productivity</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 dark:text-gray-400">
                DoIt helps you manage tasks, set priorities, and stay on top of
                your schedule with powerful features and a beautiful interface.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/login"
                className={cn(
                  "inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium",
                  "bg-green-600 text-white hover:bg-green-700 transition-colors"
                )}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="#features"
                className={cn(
                  "inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium",
                  darkMode
                    ? "bg-zinc-800 text-white hover:bg-zinc-700"
                    : "bg-gray-100 text-zinc-900 hover:bg-gray-200",
                  "transition-colors"
                )}
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Powerful Features
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to stay organized and boost your productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div
              className={cn(
                "p-6 rounded-xl",
                darkMode ? "bg-zinc-800" : "bg-[#f8faf5]"
              )}
            >
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <Flag className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Task Prioritization
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Set high, medium, or low priorities for your tasks to focus on
                what matters most.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className={cn(
                "p-6 rounded-xl",
                darkMode ? "bg-zinc-800" : "bg-[#f8faf5]"
              )}
            >
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <Cloud className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Weather Integration
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Plan outdoor activities with confidence by checking the weather
                right in your task details.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className={cn(
                "p-6 rounded-xl",
                darkMode ? "bg-zinc-800" : "bg-[#f8faf5]"
              )}
            >
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Reminders</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Never miss a deadline with customizable reminders and
                notifications.
              </p>
            </div>

            {/* Feature 4 */}
            <div
              className={cn(
                "p-6 rounded-xl",
                darkMode ? "bg-zinc-800" : "bg-[#f8faf5]"
              )}
            >
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Due Dates & Scheduling
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Set due dates and organize your tasks in a calendar view for
                better planning.
              </p>
            </div>

            {/* Feature 5 */}
            <div
              className={cn(
                "p-6 rounded-xl",
                darkMode ? "bg-zinc-800" : "bg-[#f8faf5]"
              )}
            >
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Important Tasks</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Mark tasks as important to keep them at the top of your list and
                never forget critical items.
              </p>
            </div>

            {/* Feature 6 */}
            <div
              className={cn(
                "p-6 rounded-xl",
                darkMode ? "bg-zinc-800" : "bg-[#f8faf5]"
              )}
            >
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Subtasks & Steps</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Break down complex tasks into manageable steps and track
                progress on each one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Screenshot Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-transparent to-green-50 dark:to-zinc-800/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Beautiful & Intuitive Interface
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Designed to help you focus on your tasks, not on figuring out the
              app
            </p>
          </div>

          <div className="relative">
            <div
              className={cn(
                "absolute -inset-0.5 rounded-2xl blur-xl opacity-70",
                "bg-gradient-to-r from-green-600 to-emerald-600"
              )}
            />
            <div
              className={cn(
                "relative rounded-2xl overflow-hidden shadow-2xl border",
                darkMode ? "border-zinc-700" : "border-gray-200"
              )}
            >
              <Image
                src="/list-light.png"
                alt="DoIt App Interface"
                width={1600}
                height={800}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Simple & Clean</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Distraction-free interface that helps you focus on your tasks
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Dark & Light Modes</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Choose the theme that works best for your eyes and environment
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fully Responsive</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Works perfectly on all your devices, from desktop to mobile
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              What Our Users Say
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Thousands of people are using DoIt to organize their lives and
              boost productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div
              className={cn(
                "p-6 rounded-xl",
                darkMode ? "bg-zinc-800" : "bg-[#f8faf5]"
              )}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mb-4 italic">
                "DoIt has completely transformed how I manage my daily tasks.
                The priority system helps me focus on what's important, and the
                weather integration is perfect for planning outdoor activities."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src="/placeholder.svg?height=40&width=40&text=JS"
                    alt="User"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Jessica Smith</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Marketing Manager
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div
              className={cn(
                "p-6 rounded-xl",
                darkMode ? "bg-zinc-800" : "bg-[#f8faf5]"
              )}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mb-4 italic">
                "As a freelancer juggling multiple projects, DoIt has been a
                game-changer. The subtasks feature helps me break down complex
                projects, and the clean interface keeps me focused."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src="/placeholder.svg?height=40&width=40&text=MJ"
                    alt="User"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Michael Johnson</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Freelance Designer
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div
              className={cn(
                "p-6 rounded-xl",
                darkMode ? "bg-zinc-800" : "bg-[#f8faf5]"
              )}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mb-4 italic">
                "I've tried dozens of task management apps, but DoIt is by far
                the best. The dark mode is easy on the eyes, and the reminders
                ensure I never miss an important deadline."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src="/placeholder.svg?height=40&width=40&text=AP"
                    alt="User"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Alex Patel</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Software Engineer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to boost your productivity?
            </h2>
            <p className="mt-4 text-lg text-green-100 max-w-2xl mx-auto">
              Join thousands of users who are already organizing their lives
              with DoIt
            </p>
            <div className="mt-8">
              <Link
                href="/login"
                className={cn(
                  "inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium",
                  "bg-white text-green-600 hover:bg-green-50 transition-colors"
                )}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={cn(
          "py-12 border-t",
          darkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"
        )}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-green-600 flex items-center mb-4">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    fill="currentColor"
                  />
                </svg>
                DoIt
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                The task management app that helps you stay organized and boost
                productivity.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Product
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-gray-500 dark:text-gray-400 hover:text-green-600"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-gray-500 dark:text-gray-400 hover:text-green-600"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 dark:text-gray-400 hover:text-green-600"
                  >
                    Integrations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 dark:text-gray-400 hover:text-green-600"
                  >
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 dark:text-gray-400 hover:text-green-600"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 dark:text-gray-400 hover:text-green-600"
                  >
                    Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 dark:text-gray-400 hover:text-green-600"
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 dark:text-gray-400 hover:text-green-600"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 dark:text-gray-400 hover:text-green-600"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 dark:text-gray-400 hover:text-green-600"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 dark:text-gray-400 hover:text-green-600"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 dark:text-gray-400 hover:text-green-600"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800">
            <p className="text-gray-500 dark:text-gray-400 text-center">
              &copy; {new Date().getFullYear()} DoIt. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
