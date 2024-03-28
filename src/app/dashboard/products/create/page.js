"use client";

import useProductStore from "@/store/productStore";
import { Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";

export default function CreateProductPage() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();
	const { createProduct } = useProductStore();

	const onSubmit = (data) => {
		createProduct({ ...data, price: Number(data.price) });
	};

	return (
		<div className="flex flex-col mt-16 justify-center">
			<h1 className="text-3xl">Crear producto</h1>
			<form
				className="flex flex-col mt-8 gap-8"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div>
					<Input
						label="Nombre"
						labelPlacement="outside"
						placeholder="Mi producto"
						autoComplete="none"
						{...register("name", { required: true })}
					/>
				</div>
				<div>
					<Input
						type="number"
						label="Precio de venta"
						placeholder="0.00"
						labelPlacement="outside"
						startContent={
							<div className="pointer-events-none flex items-center">
								<span className="text-default-400 text-small">BsF.</span>
							</div>
						}
						{...register("price", { required: true })}
					/>
				</div>
				<div className="flex flex-row justify-end">
					<Button auto type="submit">
						Crear producto
					</Button>
				</div>
			</form>
		</div>
	);
}
