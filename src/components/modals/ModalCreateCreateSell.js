import useProductStore from "@/store/productStore";
import useSellStore from "@/store/sellStore";
import useStore from "@/hooks/store/useStore";
import { Autocomplete, AutocompleteItem, Modal, ModalContent,Button ,ModalHeader, ModalBody, Input  } from "@nextui-org/react";
import { FaSpinner } from "react-icons/fa";

import { useState } from "react";
import { useForm } from "react-hook-form";

export const ModalCreateSell = ({ isOpenModal, onOpenChange }) => {
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
    <Modal isOpen={isOpenModal} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Crear venta
            </ModalHeader>
            <ModalBody>
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
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
