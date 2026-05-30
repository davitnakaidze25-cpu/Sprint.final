import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useEffect } from 'react';

export default function App() {
  // We removed the auto dark-mode listener to ensure the "white theme" is strictly available by default, 
  // users can explicitly toggle it in the Onboarding / Dashboard header.
  
  return <RouterProvider router={router} />;
}
