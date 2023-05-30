import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import { signIn, useSession, signOut } from "next-auth/react";

import styles from "./styles.module.scss";

// Sign in with github button component
export function SignInButton() {
  // Gets session state from signIn and Out functions
  const { data: session } = useSession();

  console.log(session);

  // Changes button stylization based on user authentication
  return session ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn("github")}
    >
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}
