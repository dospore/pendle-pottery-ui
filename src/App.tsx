import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";

import History from "./pages/History";
import Pool from "./pages/Pool";
import Pools from "./pages/Pools";
import Tickets from "./pages/Tickets";

import HistoryProvider from "./providers/history";
import PoolProvider from "./providers/pool";
import PoolsProvider from "./providers/pools";
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
        element: (
          <PoolsProvider>
            <Pools />
          </PoolsProvider>
        ),
      },
      {
        path: "pool/:id",
        element: (
          <PoolProvider>
            <Pool />
          </PoolProvider>
        ),
      },
      {
        path: "tickets",
        element: (
          <TicketsProvider>
            <Tickets />
          </TicketsProvider>
        ),
      },
      {
        path: "history",
        element: (
          <HistoryProvider>
            <History />
          </HistoryProvider>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
