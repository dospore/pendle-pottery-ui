import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";

import Pools from "./pages/Pools";
import Tickets from "./pages/Tickets";
import TicketsProvider from "./providers/tickets";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    // TODO error element
    // errorElement: <ErrorBoundary />,
    children: [
      {
        path: "pools",
        element: <Pools />,
      },
      {
        path: "tickets",
        element: (
          <TicketsProvider>
            <Tickets />
          </TicketsProvider>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
