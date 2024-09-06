import { createLazyFileRoute } from '@tanstack/react-router'
import { AuthenticatedUser } from '../utils/authentication';
import {AuthenticatedUser as AuthUser} from '../types/types';
import { Buy } from '../components/Buy';
import { Hosting } from '../components/Hosting';
document.title = 'Eco - Buy';

export const Route = createLazyFileRoute('/hosting')({
  component: () => {
    return (
      <Hosting />
    )
  }
});