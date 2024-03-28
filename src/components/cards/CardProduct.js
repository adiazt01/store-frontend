"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ModalDeleteCard } from "../modals/ModalDeleteCard";
import { ModalUpdateCard } from "../modals/ModalUpdateCard";

export const CardProduct = ({ product }) => {
  const {
    isOpen: isOpenModalUpdate,
    onOpen: onOpenModalUpdate,
    onOpenChange: onOpenChangeUpdate,
  } = useDisclosure();
  const {
    isOpen: isOpenModalDelete,
    onOpen: onOpenModalDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure();
  const { name, price } = product;

  return (
    <>
      <Card className="p-1 h-min">
        <CardHeader>
          <p className="text-2xl truncate">{name}</p>
        </CardHeader>
        <CardBody className="-mt-5">
          <p className="text-2xl text-default-500">
            {price} <span className="text-lg">Bs</span>
          </p>
        </CardBody>
        <CardFooter className="flex flex-row gap-4 justify-end">
          <Button
            onPress={onOpenModalUpdate}
            isIconOnly
            color="danger"
            aria-label="Delete"
          >
            <FaEdit />
          </Button>
          <Button
            onPress={onOpenModalDelete}
            isIconOnly
            color="danger"
            aria-label="Delete"
          >
            <FaTrash />
          </Button>
        </CardFooter>
      </Card>
      <ModalUpdateCard
        isOpenModalUpdate={isOpenModalUpdate}
        onOpenChangeUpdate={onOpenChangeUpdate}
        product={product}
      />
      <ModalDeleteCard
        isOpenModalDelete={isOpenModalDelete}
        onOpenChangeDelete={onOpenChangeDelete}
        product={product}
      />
    </>
  );
};
