import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Prisma } from "@prisma/client";
import { getOrderStatus } from "../helpers/status";
import { format } from "date-fns";
import Separator from "@/app/(shop)/_components/Separator";
import { computeProductTotalPrice } from "@/helpers/product";
import OrderProductItem from "./OrderProductItem";
import toCurrency from "@/helpers/toCurrency";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: { orderProducts: { include: { product: true } } };
  }>;
  dataAosDelay: number;
}

const OrderItem = ({ order, dataAosDelay }: OrderItemProps) => {
  const subtotal = order.orderProducts.reduce((acc, orderProduct) => {
    return acc + Number(orderProduct.product.basePrice) * orderProduct.quantity;
  }, 0);

  const total = order.orderProducts.reduce((acc, product) => {
    const productTotalPrice = computeProductTotalPrice(product.product);
    return acc + productTotalPrice * product.quantity;
  }, 0);

  const totalDiscounts = subtotal - total;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={order.id}>
        <AccordionTrigger
          className="w-full outline-none border-b"
          data-aos="fade-up"
          data-aos-delay={dataAosDelay}
        >
          <div className="flex text-left w-full">
            <div className="flex flex-1 flex-col gap-1 text-left">
              <p className="text-sm font-bold uppercase lg:text-base">
                Pedido com {order.orderProducts.length} produto(s)
              </p>
              <span className="text-xs opacity-60">
                Feito em {format(order.createdAt, "d/MM/y 'às' HH:mm")}
              </span>
            </div>

            <div className="hidden flex-1 font-bold lg:block">
              <p className="text-xs lg:text-sm">Status</p>
              <p className="text-xs text-[#8162FF] lg:text-sm">
                {getOrderStatus(order.status)}
              </p>
            </div>

            <div className="hidden flex-1 lg:block">
              <p className="text-xs font-bold lg:text-sm ">Data</p>
              <p className="text-xs opacity-60 lg:text-sm">
                {format(order.createdAt, "d/MM/y")}
              </p>
            </div>

            <div className="hidden flex-1 lg:block">
              <p className="text-xs font-bold lg:text-sm">Pagamento</p>
              <p className="text-xs opacity-60 lg:text-sm">Cartão</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-center justify-between lg:hidden">
              <div className="font-bold">
                <p className="text-xs lg:text-sm">Status</p>
                <p className="text-xs text-[#8162FF] lg:text-sm">
                  {getOrderStatus(order.status)}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold lg:text-sm">Data</p>
                <p className="text-xs opacity-60 lg:text-sm">
                  {format(order.createdAt, "d/MM/y")}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold lg:text-sm">Pagamento</p>
                <p className="text-xs opacity-60 lg:text-sm">Cartão</p>
              </div>
            </div>

            {order.orderProducts.map((orderProduct) => (
              <OrderProductItem
                key={orderProduct.id}
                orderProduct={orderProduct}
              />
            ))}

            <div className="flex w-full flex-col gap-1 text-xs">
              <Separator />

              <div className="flex w-full justify-between lg:text-base">
                <p>Subtotal</p>
                <p>{toCurrency(subtotal)}</p>
              </div>

              <Separator />

              <div className="flex w-full justify-between lg:text-base">
                <p>Entrega</p>
                <p>GRÁTIS</p>
              </div>

              <Separator />

              <div className="flex w-full justify-between py-1 lg:text-base">
                <p>Descontos</p>
                <p>-{toCurrency(totalDiscounts)}</p>
              </div>

              <Separator />

              <div className="flex w-full justify-between py-1 text-sm font-bold lg:text-xl">
                <p>Total</p>
                <p>{toCurrency(total)}</p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default OrderItem;
