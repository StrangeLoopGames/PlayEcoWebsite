import { createLazyFileRoute } from '@tanstack/react-router'
import { removeToken } from "../utils/authentication";
import "../assets/_account.scss";
export const Route = createLazyFileRoute('/logout')({
  component: () => {
    document.title = 'Eco - Login';
    removeToken();
    window.location.href = '/';
  }
});