import { Button, useDisclosure } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import { ModalCreateSell } from "../modals/ModalCreateCreateSell";

export const FastCreateSellButton = () => {
  const {
    isOpen,
    onOpen,
    onOpenChange
  } = useDisclosure();

  return (
    <>
      <Button
        color="success"
        size="small"
        onPress={onOpen}
        auto
        className="flex items-center gap-2"
      >
        <FaPlus />
        <span>Crear venta</span>
      </Button>
      <ModalCreateSell
        isOpenModal={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
};
