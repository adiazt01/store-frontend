import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import useProductStore from "@/store/productStore";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

export const ModalUpdateCard = ({
  product,
  onOpenChangeUpdate,
  isOpenModalUpdate,
}) => {
  const { name, price, id } = product;
  const { updateProduct } = useProductStore();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return {
        name: name,
        price: price,
      };
    }, [name, price]),
  });

  useEffect(() => {
    reset({
      name: name,
      price: price,
    });
  }, [name, price, reset]);

  const onSubmit = (data) => {
    updateProduct(id, data);
  };

  return (
    <Modal isOpen={isOpenModalUpdate} onOpenChange={onOpenChangeUpdate}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Actualizar producto
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col mt-8 gap-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <Input
                    name="name"
                    label="Nombre"
                    labelPlacement="outside"
                    placeholder="Mi producto"
                    autoComplete="none"
                    {...register("name")}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    name="price"
                    label="Precio de venta"
                    placeholder="0.00"
                    labelPlacement="outside"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">
                          BsF.
                        </span>
                      </div>
                    }
                    {...register("price")}
                  />
                </div>
                <ModalFooter>
                  <Button color="primary" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button type="submit" color="primary" onPress={onClose}>
                    Actualizar producto
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
