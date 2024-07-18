import { createLazyFileRoute } from '@tanstack/react-router'
import { AuthenticatedUser } from '../utils/authentication';
import {AuthenticatedUser as AuthUser} from '../types/types';
import { Buy } from '../components/Buy';
document.title = 'Eco - Buy';

export const Route = createLazyFileRoute('/buy')({
  component: () => {
    const isLoggedIn: AuthUser = AuthenticatedUser();
    return (
      <Buy />
    )
  }
});