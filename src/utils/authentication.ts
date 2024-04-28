import { useQuery, UseQueryResult } from "@tanstack/react-query";
type sessionStore = {
	token: string;
	expiry: number;
};
interface User {
    id: string;
    steamId: string;
    twitchId: string;
    twitchUsername: string;
    username: string;
    avatarUrl: string;
    avatarDna: string;
    achievements: string[];
    ecoCredits: number;
    ownsEco: boolean;
    verified: boolean;
    items: string;
    isDeveloper: boolean;
    isCloudAdmin: boolean;
    bannedUntil: string;
    bannedReason: string;
    isBanned: boolean;
    lastWorldId: string;
    lastWorldJoinTime: string;
    heartBeatTime: string;
    creationTime: string;
    online: boolean;
    timeOnlineTotal: string;
    lastEmailSent: string;
}

export function AuthenticatedUser(): string | boolean {
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
	const thirtyDays = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
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
			fetch("https://cloud.strangeloopgames.com/UserAccount/GetAccount", {
				headers: {
					Authorization: `Bearer ${userJWT}`,
					"Content-Type": "application/json",
				},
			}).then((res) => res.json()),
		refetchOnWindowFocus: false,
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

// Check if the user is a new user when using steam to register
export function checkNewSteamUserStatus (user: User): boolean{
// Using regex to check if the string starts with "steam:"
	const regex = /^steam:/i; 
	const checkUsername: boolean = !user.verified && regex.test(user.username)
	return checkUsername;
}