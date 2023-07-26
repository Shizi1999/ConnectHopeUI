import { useContext } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { AppContext } from './context/app.context';
import FormLayout from './layout/FormLayout';
import path from './constant/path';
import MainLayout from './layout/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/ResetPassword';
import ForgetPassword from './pages/ForgetPassword';
import CreateAndUpdatePost from './pages/CreateAndUpdatePost';
import UserLayout from './layout/UserLayout';
import AdminLayout from './layout/AdminLayout';
import UserManage from './pages/UserManage';
import AdminPostManage from './pages/AdminPostManage';
import Post from './pages/Post';
import Contact from './pages/Contact';
import Me from './pages/Me';
import MeManagePost from './pages/MeManagePost';
import Blog from './pages/Blog';

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />;
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />;
}
function AdminRoute() {
  const { isAuthenticated, profile } = useContext(AppContext);
  return isAuthenticated && profile?.role === 'admin' ? <Outlet /> : <Navigate to={path.login} />;
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    // Public Route
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: path.home,
          element: <Home />
        },
        {
          path: path.blog,
          element: <Blog />
        },
        {
          path: path.post,
          element: <Post />
        },
        {
          path: path.contact,
          element: <Contact />
        },
        {
          path: '*',
          element: <NotFound />
        }
      ]
    },

    // Rejeted Route
    {
      path: '',
      element: <FormLayout />,
      children: [
        {
          path: path.login,
          element: <Login />
        },
        {
          path: path.register,
          element: <Register />
        }
      ]
    },
    {
      path: '',
      element: <FormLayout />,
      children: [
        {
          path: path.forgetpassword,
          element: <ForgetPassword />
        },
        {
          path: path.resetpassword,
          element: <ResetPassword />
        }
      ]
    },
    // Protected Route
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <ProtectedRoute />,
          children: [
            {
              path: path.me,
              element: (
                <UserLayout>
                  <Me />
                </UserLayout>
              )
            },
            {
              path: path.meManagePost,
              element: (
                <UserLayout>
                  <MeManagePost />
                </UserLayout>
              )
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.createAndUpdatePost,
          element: <CreateAndUpdatePost />
        }
      ]
    },
    // Admin Route
    {
      path: '',
      element: <AdminRoute />,
      children: [
        {
          path: '',
          element: <AdminLayout />,
          children: [
            {
              path: path.adminUser,
              element: <UserManage />
            },
            {
              path: path.adminPost,
              element: <AdminPostManage />
            }
          ]
        }
      ]
    }
  ]);

  return routeElements;
}
