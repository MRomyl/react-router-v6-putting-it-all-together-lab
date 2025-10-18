import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

// 👇 Replace your old beforeEach() with this one
beforeEach(() => {
  global.fetch = vi.fn((url) => {
    if (url.endsWith("/directors")) {
      return Promise.resolve({
        ok: true,
        json: async () => [
          {
            id: "1",
            name: "Christopher Nolan",
            bio: "Director of mind-bending films.",
            movies: [
              {
                id: "m1",
                title: "Inception",
                time: 148,
                genres: ["Sci-Fi", "Thriller"],
              },
            ],
          },
        ],
      });
    }

    if (url.match(/\/directors\/1$/)) {
      return Promise.resolve({
        ok: true,
        json: async () => ({
          id: "1",
          name: "Christopher Nolan",
          bio: "Director of mind-bending films.",
          movies: [
            {
              id: "m1",
              title: "Inception",
              time: 148,
              genres: ["Sci-Fi", "Thriller"],
            },
          ],
        }),
      });
    }

    if (url.match(/\/directors\/1\/movies\/m1$/)) {
      return Promise.resolve({
        ok: true,
        json: async () => ({
          id: "m1",
          title: "Inception",
          time: 148,
          genres: ["Sci-Fi", "Thriller"],
        }),
      });
    }

    return Promise.resolve({
      ok: false,
      json: async () => ({ error: "Not found" }),
    });
  });

  window.history.pushState({}, "", "/");
});

test("renders HomePage by default", async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // your test content...
});
