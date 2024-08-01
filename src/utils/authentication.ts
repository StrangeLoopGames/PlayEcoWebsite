import { useQuery, UseQueryResult } from "@tanstack/react-query";

import {AuthenticatedUser as AuthUser, sessionStore, User} from '../types/types';

export function AuthenticatedUser() : AuthUser {
	if (checkTokenExpiry()) {
		const item = localStorage.getItem("token");
		if (item) {
			const session: sessionStore = JSON.parse(item);
			return session.token;
		}
	}
	return false;
}

export function storeToken(token: string): string {
	const thirtyDays = new Date().getTime() + 1 * 24 * 60 * 60 * 1000;
	const item: sessionStore = {
		token: token,
		expiry: thirtyDays,
	};
	localStorage.setItem("token", JSON.stringify(item));
	return token;
}

export function removeToken(): void {
	localStorage.removeItem("token");
}

export function checkTokenExpiry(): boolean {
	const item = localStorage.getItem("token");
	if (!item) {
		return false;
	}
	const session: sessionStore = JSON.parse(item);
	return session.expiry > new Date().getTime();
}

// custom hook to get user data
export function useUserQuery(userJWT: string): UseQueryResult<User>  {
	return useQuery({
		queryKey: ["user"],
		queryFn: () =>
			fetch(`${import.meta.env.VITE_CLOUD_API_URL}UserAccount/GetAccount`, {
				headers: {
					Authorization: `Bearer ${userJWT}`,
					"Content-Type": "application/json",
				},
			}).then((res) => {
				if (!res.ok) {
					if(res.status === 401) {
						removeToken();
						location.href = '/login';
				}
			}
				return res.json();
			}).catch((error) => {
				removeToken();
				location.href = '/login?error=authenication_error';
			}),
		refetchOnWindowFocus: false,
		staleTime: 5 * 60 * 1000,
	});
}

export function isValidUsername(username: string): boolean {
		// Allowed characters (a-z, A-Z, or 0-9) as well as underscores (_).
		const allowedChars = /^[a-zA-Z0-9_]+$/;
		// Check if the username contains only allowed characters
		if (!allowedChars.test(username)) {
			return false; // Username contains disallowed characters
		} else {
			return true; // Username is valid
		}
}
export function isValidPassword(password: string): boolean {
	// Password must be at least 8 characters long
	const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
	if (!regex.test(password)) {
		return false; // Password is too short
	} else {
		return true; // Password is valid
	}
}

export function useIsUserAdmin(userJWT: string): boolean {
	const {data: user} = useUserQuery(userJWT);
	if(user && user.isSLG && user.isCloudAdmin) {
		return true;
	} else {
		return false;
	}
}
// Check if the user is a new user when using steam to register
export function checkNewSteamUserStatus (user: User): boolean{
// Using regex to check if the string starts with "steam:"
	const regex = /^steam:/i; 
	return regex.test(user.username);
}