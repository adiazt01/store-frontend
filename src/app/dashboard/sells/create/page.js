"use client";

import { useForm } from "react-hook-form";
import { Input, Button } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import useStore from "@/hooks/store/useStore";
import useProductStore from "@/store/productStore";
import { FaSpinner } from "react-icons/fa6";
import { useState } from "react";
import useSellStore from "@/store/sellStore";

export default function CreateSell() {
  const { register, handleSubmit } = useForm();
  const products = useStore(useProductStore, (state) => state.products);
  const { createSell } = useSellStore();
  const [selectedKey, setSelectedKey] = useState(null);
  const [value, setValue] = useState("");

  const onSelectionChange = (id) => {
    setSelectedKey(id);
  };

  const onInputChange = (value) => {
    setValue(value);
  };

  const onSubmit = (data) => {
    data.productId = selectedKey;
    createSell(data);
  };

  return (
    <div className="flex flex-col mt-16 justify-center">
      <h1 className="text-3xl">Crear venta</h1>
      <form
        className="flex flex-col mt-8 gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Autocomplete
            defaultItems={products}
            label="Producto"
            placeholder="Busca un producto"
            labelPlacement="outside"
            className="max-w-xs"
            allowsCustomValue={true}
            onSelectionChange={onSelectionChange}
            onInputChange={onInputChange}
          >
            {products &&
              products.map((product) => (
                <AutocompleteItem key={product.id} value={product.id}>
                  {`${product.name} - ${product.price} Bsf.`}
                </AutocompleteItem>
              ))}
          </Autocomplete>
        </div>
        {selectedKey && (
          <div>
            <Input
              type="number"
              label="Cantidad"
              placeholder="0.00"
              labelPlacement="outside"
              startContent={<FaSpinner />}
              {...register("quantity", { required: true })}
            />
          </div>
        )}

        {value && <div>{value.price}</div>}

        <div className="flex flex-row justify-end">
          <Button auto type="submit">
            Registrar venta
          </Button>
        </div>
      </form>
    </div>
  );
}
