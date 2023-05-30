import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

// Subscription button component
export function SubscribeButton() {
  // Gets data if user is logged in
  const { data: session } = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    // Logs in the user if it is not
    if (!session) {
      signIn("github");
      return;
    }

    // active sub
    // Redirects user that already has a subscription
    if (session) {
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
