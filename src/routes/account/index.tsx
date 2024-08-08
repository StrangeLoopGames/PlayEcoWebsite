import { createFileRoute, Navigate, redirect, useNavigate } from '@tanstack/react-router';
import UserCard from '../../components/account/UserCard';
import SteamCard from '../../components/account/SteamCard';
import DownloadsCard from '../../components/account/DownloadsCard';
import TermsCard from '../../components/account/TermsCard';
import ArtCard from '../../components/account/ArtCard';
import TransactionsCard from '../../components/account/TransactionsCard';
import { AuthenticatedUser, useUserQuery } from "../../utils/authentication";
import "../../assets/_account.scss";
import { Modal } from '../../components/Modal';

type AccountParams = {
  refType: string | null;
  token: string | null;
  redirect: string | null;
  product: string | null;
}
export const Route = createFileRoute('/account/')({
  validateSearch: (search: Record<string, unknown>): AccountParams => {
    return { 
      refType: search.type as string, 
      token: search.token as string, 
      redirect: search.redirect as string, 
      product: search.pid as string,
    };
  },
  beforeLoad: async ({ location, search }) => {
    if (!AuthenticatedUser()) {
      throw redirect({
        to: '/login',
        search: {
          redirect: search.redirect != null ? search.redirect : location.href,
        },
      })
    }
  },
  component: () => {
    document.title = 'Eco - Account';
    return (
      <section className='page-wrap-main col-lg-offset-2 col-lg-8' id="account">
        <Account />
      </section>
    )
  }
  })


function Account() {
  const userJWT = (AuthenticatedUser()) ? AuthenticatedUser() : '';
  const { data: user, error, isLoading } = useUserQuery(userJWT as string);
  if (isLoading) return <Modal type="Loading" message="Please wait while we load your account information." />;
  if (error) {
    return <Modal type="Error" message={error.message} data={undefined} />
  }
  return (
    <>
    { user && !user.verified ? (
      <p className="alert alert-info">Your account is not verified, please check your email for a verification link.</p>
    ) : null
    }
      <UserCard user={user} />
      <DownloadsCard user={user} />
      <TransactionsCard user={user} />
      <SteamCard user={user} />
      {/* <TwitchCard user={user} /> */}
      <ArtCard />
      <TermsCard />
    </>
  )
}