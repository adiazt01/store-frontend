"use client";

import useAuthStore from "@/store/authStore";
import { useForm } from "react-hook-form";
import { Input, Button, Link } from "@nextui-org/react";

export default function Login() {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();
	const { login } = useAuthStore();

	const onSubmit = (data) => {
		login(data);
	};

	return (
		<main className="flex flex-col mt-32 justify-center">
			<div>
				<h1 className="text-4xl">Login</h1>
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
					<Link className="mt-4" href="/auth/register">
						Forgot your password?
					</Link>
				</div>
				<div className="mt-4">
					<Button className="w-full" type="submit">
						Login
					</Button>
					<p className="text-right mt-2 text-zinc-300">
						Don't have an account?{" "}
						<Link href="/auth/register">Create an account</Link>
					</p>
				</div>
			</form>
		</main>
	);
}
