import { OrderStatus } from "@prisma/client";

export const getOrderStatus = (orderStatus: OrderStatus) => {
  return {
    [OrderStatus.PAID]: "Pago",
    [OrderStatus.PENDING]: "Pendente",
    [OrderStatus.CANCELED]: "Cancelado",
  }[orderStatus];
};
