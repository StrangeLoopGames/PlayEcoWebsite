import { createFileRoute, redirect, useSearch } from '@tanstack/react-router'
import { log } from 'console';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/verifyemail')({
  validateSearch: (search: Record<string, unknown>) => {
    return {token: search.token as string };
  },
  component: VerifyEmail
})

export function VerifyEmail() {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {token} = Route.useSearch();
  useEffect(() => {
    if(!token) {
      throw redirect({
        to: '/login',
        search: {
          error: 'verify_email_error',
          redirect: location.href,
        },
      })
    } else {
      fetch(`${import.meta.env.VITE_CLOUD_API_URL}api/Registration/VerifyEmail?verifyToken=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (!res.ok) {
          setError('There was an error verifying your email. Please try again.');
        }
        setVerified(true);
        setTimeout(() => {
          location.href = '/login';
        }, 500);
      }).catch((error) => {
        console.error('Error:', error);
      });
    }
  }, [token]);
  document.title = 'Eco - Verify Email';
  return (
    <section className='d-flex col-lg-offset-2 col-lg-8 justify-content-center' id="login">
      {
        verified && error == null ? (
          <p className="alert alert-success">Your email has been verified. You will be redirect soon. 
            <a href="/account">Click here if you are not redirected.</a>
          </p>
        ) : error != null ? (
          <p className="alert alert-danger">{error}</p>
        ) : (
          <p className="alert alert-info">Verifying email...</p>
        )
      }
  </section>
  )
}