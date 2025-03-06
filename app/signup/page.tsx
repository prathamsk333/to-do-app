"use client";

import Link from "next/link";
import { FormEvent, useState, useEffect, ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { setUser, setError } from "../../lib/redux/features/taskSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { signUpPOST } from "../http";
import { useRouter } from "next/navigation";
import Notification from "../notification";

export default function Component() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: signUpPOST,
    onSuccess: (data) => {
      Cookies.set("token", data.token, { expires: 7, path: "/" });
      dispatch(setUser(data));
    },
    onError: (error) => {
      dispatch(setError(error.message));
    },
  });

  useEffect(() => {
    if (data) {
      router.push("/home");
    }
  }, [data, dispatch]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(formData);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8faf5]">
      {isError && <Notification message={error.message} status="error" />}
      {data && <Notification message="Signup successful" status="success" />}
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-2">
          Sign up for SchedulEase
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Create an account to manage your appointments
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name :
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your Name"
              className="w-full px-3 py-2 bg-[#f8faf5] rounded-md"
              onChange={handleChange}
              value={formData.name}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone No :
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your Phone Number"
              className="w-full px-3 py-2 bg-[#f8faf5] rounded-md"
              onChange={handleChange}
              value={formData.phone}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email :
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              className="w-full px-3 py-2 bg-[#f8faf5] rounded-md"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password :
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your Password"
              className="w-full px-3 py-2 bg-gray-100 rounded-md"
              onChange={handleChange}
              value={formData.password}
            />
          </div>

          <div>
            <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password :
            </label>
            <input
              type="password"
              id="passwordConfirm"
              placeholder="Confirm your Password"
              className="w-full px-3 py-2 bg-gray-100 rounded-md"
              onChange={handleChange}
              value={formData.passwordConfirm}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-md transition duration-300"
            disabled={isPending}
          >
            {isPending ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-green-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}