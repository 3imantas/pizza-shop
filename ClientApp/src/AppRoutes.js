import { Counter } from "./Components/Counter";
import { FetchData } from "./Components/FetchData";
import { Home } from "./Components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  }
];

export default AppRoutes;
