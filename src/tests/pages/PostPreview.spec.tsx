import { render, screen } from "@testing-library/react";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { mocked } from "jest-mock";
import { getPrismicClient } from "../../services/prismic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const post = {
  slug: "my-new-post",
  title: "my new title",
  content: "<p>Post excerpt</p>",
  updatedAt: "01 de abril de 2021",
};
jest.mock("../../services/prismic");
jest.mock("next-auth/react");
jest.mock("next/router");

describe("Post preview page", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" });

    render(<Post post={post} />);

    expect(screen.getByText("my new title")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("redirects user to full post when is subscribed", async () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);
    const pushMocked = jest.fn();

    useSessionMocked.mockReturnValueOnce({
      data: {
        activeSubscription: "fake-active-sub",
        expires: "",
      },
      status: "loading",
    } as any);

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked,
    } as any);

    render(<Post post={post} />);

    expect(pushMocked).toHaveBeenCalledWith("/posts/my-new-post");
  });

  it("loads inital data", async () => {
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

    const response = await getStaticProps({ params: { slug: "my-new-post" } });

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
