import { createLazyFileRoute } from '@tanstack/react-router';
import UserCard from '@/components/account/UserCard';
import InviteCard from '@/components/account/InviteCard';
import SteamCard from '@/components/account/SteamCard';
import TwitchCard from '@/components/account/TwitchCard';
import GameCard from '@/components/account/GameCard';
import TeacherCard from '@/components/account/TeacherCard';
import TermsCard from '@/components/account/TermsCard';
import ArtCard from '@/components/account/ArtCard';
import { useQuery } from "@tanstack/react-query";
import { AuthenticatedUser, removeToken } from "@/utils/authentication";
import "@/assets/_account.scss";
import { isVerified } from '../utils/authentication';

export const Route = createLazyFileRoute('/account')({
  component: () => {
    document.title = 'Eco - Account';
    if (!AuthenticatedUser()) {
      window.location.href = '/login';
    } else {
      return (
        <section className='col-lg-offset-2 col-lg-8' id="account">
          <Account />
        </section>
      )
    }
  }
})

function Account() {
  const userJWT: string = AuthenticatedUser();
  const { data: user, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetch("https://cloud.strangeloopgames.com/UserAccount/GetAccount", {
        headers: {
          'Authorization': `Bearer ${userJWT}`,
          'Content-Type': 'application/json'
        }
      }).then((res) =>
        res.json()
      ),


  });
  if (isLoading) return <div> Loading</div>
  // if(isVerified(user)) {
  //   window.location.href = '/login?error=unverified';
  // }
  if (error) {
    console.log(error);
    return <div>Error: {error.message}</div>
  }
  console.log(user)

  return (
    <>
      <UserCard user={user} />
      <InviteCard user={user} />
      <SteamCard user={user} />
      <TwitchCard user={user} />
      <GameCard user={user} />
      <ArtCard />
      <TeacherCard user={user} />
      <TermsCard />
    </>
  )
}