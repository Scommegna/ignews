import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";
import NextAuth from "../../pages/api/auth/[...nextauth]";

// Subscription button component
export function SubscribeButton() {
  // Gets data if user is logged in
  const { data: session, status } = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    // Logs in the user if it is not
    if (!session) {
      signIn("github");
      return;
    }

    // Redirects user that already has a subscription
    if (status === "authenticated") {
      router.push("/posts");
      return;
    }

    try {
      // Redirects user to checkout
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
