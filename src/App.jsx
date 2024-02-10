/* eslint-disable no-unused-vars */
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRoutes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Authorization from './Authorization';
import Dashboard from './components/Dashboard';
import EditProfile from './pages/EditProfile';
import Category from './pages/Category';
import Promo from './pages/Promo';
import Activity from './pages/Activity';
import DetailPromo from './pages/DetailPromo';
import DetailActivity from './pages/DetailActivity';


const routes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: (
      <Authorization>
        <Dashboard />
      </Authorization>
    ),
  },
  {
    path: "/profile",
    element: (
      <Authorization>
        <EditProfile />
      </Authorization>
    ),
  },
  {
    path: "/promotion",
    element: (
      <Authorization>
        <Promo />
      </Authorization>
    ),
  },
  {
    path: "/activities",
    element: (
      <Authorization>
        <Activity />
      </Authorization>
    ),
  },
  {
    path: "/categories",
    element: (
      <Authorization>
        <Category />
      </Authorization>
    ),
  },
  {
    path: "/promotion/:id",
    element: (
      <Authorization>
        <DetailPromo />
      </Authorization>
    ),
  },
  {
    path: "/activities/:id",
    element: (
      <Authorization>
        <DetailActivity />
      </Authorization>
    ),
  },
];

function App() {
  const route = useRoutes(routes)
  return route
}

export default App
