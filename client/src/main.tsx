import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <>hi</>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
