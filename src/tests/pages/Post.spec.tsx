import { render, screen } from "@testing-library/react";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { mocked } from "jest-mock";
import { getPrismicClient } from "../../services/prismic";
import { getSession } from "next-auth/react";

const post = {
  slug: "my-new-post",
  title: "my new title",
  content: "<p>Post excerpt</p>",
  updatedAt: "01 de abril de 2021",
};
jest.mock("../../services/prismic");
jest.mock("next-auth/react");

describe("Post page", () => {
  it("renders correctly", () => {
    render(<Post post={post} />);

    expect(screen.getByText("my new title")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
  });

  it("redirects user if no subscription is found", async () => {
    const getSessionMocked = mocked(getSession);
    getSessionMocked.mockResolvedValueOnce(null);

    const response = await getServerSideProps({
      params: { slug: "my-new-post" },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/",
        }),
      })
    );
  });

  it("loads inital data", async () => {
    const getSesssionMocked = mocked(getSession);
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: {
            type: "heading",
            text: "my new title",
          },

          content: {
            type: "paragraph",
            text: "Post excerpt",
          },
        },
        last_publication_date: "04-01-2021",
      }),
    } as any);

    getSesssionMocked.mockResolvedValueOnce({
      activeSubscription: "fake-active-subscription",
    } as any);

    const response = await getServerSideProps({
      params: { slug: "my-new-post" },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          props: {
            post: {
              slug: "my-new-post",
              title: "my new title",
              content: "<p>Post excerpt</p>",
              updatedAt: "01 de abril de 2021",
            },
          },
        }),
      })
    );
  });
});
