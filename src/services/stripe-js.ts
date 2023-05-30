import { loadStripe } from "@stripe/stripe-js";

// Redirects user to stripe payment session
export async function getStripeJs() {
  const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  return stripeJs;
}
