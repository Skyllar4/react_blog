import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { MainPage } from './pages/MainPage';
import { AuthPage } from './pages/AuthPage';
import { ErrorPage } from './pages/ErrorPage';
import { ProfilePage } from './pages/ProfilePage';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import { PrivateCard } from './Components/Layout/PostList/PostCard/PrivateCard';
import { CreatePostPage } from './pages/CreatePostPage';

const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth/login",
    element: <AuthPage authState="login"/>,
  },
  {
    path: "/auth/register",
    element: <AuthPage authState="register"/>,
  },
  {
    path: '/post/:id',
    element: <PrivateCard />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/createPost',
    element: <CreatePostPage />
  }
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
