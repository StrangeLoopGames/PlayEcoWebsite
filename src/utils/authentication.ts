type sessionStore = {
	token: string,
	expiry: number,
}

export function AuthenticatedUser(): string | boolean {
	if(checkTokenExpiry()) {
		const item = localStorage.getItem("token");
		if (item) {
			const session: sessionStore = JSON.parse(item);
			return session.token;
		}
	}
	return false;
}

export function storeToken(token: string): void {
	const thirtyDays = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
	const item: sessionStore = {
		token: token,
		expiry: thirtyDays,
	}
	localStorage.setItem("token", JSON.stringify(item));
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
// export function isVerified(user: { verified: boolean; }): boolean {
// 	if(!user || !user.verified) {
// 		removeToken();
// 		return false;
// 	}
// 	return user.verified;
// }