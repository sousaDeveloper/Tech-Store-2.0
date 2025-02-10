import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.error();
  }

  const text = await request.text();

  try {
    const event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_KEY as string
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ["line_items"],
        }
      );
      const lineItems = sessionWithLineItems.line_items;

      // ATUALIZAR PEDIDO
      await prisma.order.update({
        where: {
          id: session.metadata?.orderId,
        },
        data: {
          status: "PAID",
        },
      });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Error verifying Stripe webhook signature:", err);
    return NextResponse.error();
  }
}
