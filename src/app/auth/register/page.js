"use client";

import { useForm } from "react-hook-form";
import { Input, Button, Link } from "@nextui-org/react";
import useAuthStore from "@/store/authStore";

export default function Register() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const password = watch("password", "");

	const { register: registerUser } = useAuthStore();

	const onSubmit = (data) => {
		registerUser(data);
	};

	return (
		<main className="flex flex-col mt-16 justify-center">
			<div>
				<h1 className="text-4xl">Register</h1>
				<p className="text-medium mt-1 text-zinc-300">
					To start save and admin your store
				</p>
			</div>
			<form
				className="flex flex-col mt-8 gap-8"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div>
					<Input
						label="Name"
						autoComplete="none"
						{...register("name", { required: true })}
					/>
					{errors.name && (
						<span className="ml-1 mt-2 text-red-500">Email is required</span>
					)}
				</div>
				<div>
					<Input
						type="email"
						label="Email"
						autoComplete="none"
						{...register("email", { required: true })}
					/>
					{errors.email && (
						<span className="ml-1 mt-2 text-red-500">Email is required</span>
					)}
				</div>
				<div className="flex flex-col">
					<Input
						type="password"
						label="password"
						autoComplete="none"
						{...register("password", { required: true })}
					/>
					{errors.password && (
						<span className="ml-1 mt-2 text-red-500">Password is required</span>
					)}
				</div>
				<div className="flex flex-col">
					<Input
						type="password"
						label="Confirm password"
						autoComplete="none"
						{...register("confirmPassword", {
							required: true,
							validate: (value) =>
								value === password || "The passwords do not match",
						})}
					/>
					{errors.confirmPassword && (
						<span className="ml-1 mt-2 text-red-500">
							{errors.confirmPassword.message}
						</span>
					)}
				</div>
				<div className="mt-4">
					<Button className="w-full" type="submit">
						Register
					</Button>
					<p className="text-right mt-2 text-zinc-300">
						Has an account? <Link href="/auth/login">Login here</Link>
					</p>
				</div>
			</form>
		</main>
	);
}
