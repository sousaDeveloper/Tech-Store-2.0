import { createCheckout } from "@/actions/checkout";
import { createOrder } from "@/actions/order";
import { redirect } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { CartProduct } from "@/providers/cart";

export const handleFinishPurchaseClick = async (
  userId: string,
  products: CartProduct[]
) => {
  if (!userId) {
    return redirect("/api/auth/signin");
  }

  try {
    const order = await createOrder(products, userId);

    const checkout = await createCheckout(products, order.id);

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
    );
    await stripe?.redirectToCheckout({ sessionId: checkout.id });
  } catch (error) {
    console.error("Erro ao finalizar compra:", error);
  }
};
