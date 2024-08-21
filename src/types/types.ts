export type sessionStore = {
	token: string;
	expiry: number;
};
export type AuthenticatedUser = string | false;

export type User = {
    id: string | number;
    steamId: string | null;
    twitchId: string | null;
    twitchUsername: string | null;
    username: string | null;
    avatarUrl: string | null;
    avatarDna: string | null;
    achievements: { name: string, worldSource: string, worldName: string, description: string, timeAchieved: string }[] | null;
    ecoCredits: number | null;
    ownsEco: boolean;
    verified: boolean;
    items: { type: string, worldSource: string, worldName: string, description: string, timeAchieved: string }[] | null;
	blockPurchasing: boolean | null;
    isDeveloper: boolean;
    isCloudAdmin: boolean;
    bannedUntil: string | null;
    bannedReason: string | null;
    isBanned: boolean;
    lastWorldId: string | null;
    lastWorldJoinTime: string | null;
    heartBeatTime: string | null;
    creationTime: string | null;
    online: boolean;
    timeOnlineTotal: string | null;
    lastEmailSent: string | null;
}
export type Version = {
    id: string;
    versionCategory: string;
    versionNumber: string;
    commitNumber?: string;
    downloadUrls?: {
        windows64: string;
        windows32: string;
        mac: string;
        linux: string;
        server: {
            linux: string;
            mac: string;
            pc: string;
        };
    };
}
export type GroupedVersion = {
    baseVersion: string;
    versions: Version[];
}
export type marketItem = {
    id: string,
    sku: string,
    description: string | null,
    name: string,
    price: number,
}