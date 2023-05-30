import * as prismic from "@prismicio/client";

// Client to communicate with prismic API
export function getPrismicClient(req?: unknown) {
  const prismicClient = prismic.createClient(process.env.PRISMIC_END_POINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  return prismicClient;
}
