import useProductStore from "@/store/productStore";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";


export const ModalDeleteCard = ({
  product,
  onOpenChangeDelete,
  isOpenModalDelete,
}) => {
  const { name, id } = product;
  const { deleteProduct } = useProductStore();

  return (
    <Modal isOpen={isOpenModalDelete} onOpenChange={onOpenChangeDelete}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Eliminar producto
            </ModalHeader>
            <ModalBody>
              <p>
                Estas seguro de eliminar el producto? "
                <span className="text-red-600 font-bold">{name}</span>"
              </p>
              <p></p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <Button
                color="danger"
                onPress={() => {
                  deleteProduct(id);
                  onClose();
                }}
              >
                Eliminar productos
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
