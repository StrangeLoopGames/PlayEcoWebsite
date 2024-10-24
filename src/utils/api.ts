import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import { AuthenticatedUser, removeToken } from "./authentication";
import { components as types } from '../types/api'
import { AuthenticatedUser as AuthUser } from "../types/types";
import { t } from "@lingui/macro";
type User = types["schemas"]["StrangeUser"];
export function useFetchUserById(userJWT: string, user: string) {
    const url = `${import.meta.env.VITE_CLOUD_API_URL}UserAccount/${user}`;
    return useQuery({
        queryKey: ["selected", user],
        queryFn: () =>
            fetch(url, {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                if (!res.ok) {
                    if (res.status === 401) {
                        removeToken();
                        location.href = '/login';
                    }
                }
                return res.json();
            }).catch((error) => {
                console.error('Error:', error);
            }),
        refetchOnWindowFocus: false,
    });
}
export function useFetchCrud(type: string, pageNumber: number, pageSize: number, userJWT: string) {
    let url;
    switch (type) {
        case "FlagReports":
            url = `${import.meta.env.VITE_CLOUD_API_URL}Flags/FlagReport`;
            break;
        default:
            url = `${import.meta.env.VITE_CLOUD_API_URL}${type}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    }
    return useQuery({
        queryKey: ["users" , type],
        queryFn: () =>
            fetch(url, {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                if (!res.ok) {
                    if (res.status === 401) {
                        removeToken();
                        location.href = '/login';
                    }
                    if(res.status === 404) {
                        throw new Error('Resource not found');
                    }
                    throw new Error('Network response was not ok');
                }
                return res.json();
            }),
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
    });
}

export function useSearchCrud(type: string, search: string, pageNumber: number, 
    pageSize: number, adminJWT: string, options: { enabled?: boolean } = {}, 
    orderBy?: string, ascending?: boolean) {  
    const url = `${import.meta.env.VITE_CLOUD_API_URL}${type}/search?search=${search}&pageNumber=${pageNumber}\
    &pageSize=${pageSize}&orderBy${orderBy}&ascending=${ascending}`;
        return useQuery({
            queryKey: ["search", type, search],
            queryFn: () =>
                fetch(url, {
                    headers: {
                        Authorization: `Bearer ${adminJWT}`,
                        "Content-Type": "application/json",
                    },
                }).then((res) => {
                    if (!res.ok) {
                        if (res.status === 401) {
                            removeToken();
                            location.href = '/login';
                        }
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                }),
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000,
            enabled: options.enabled !== undefined ? options.enabled : true,
        });
}

export async function crudUpdateById(type: string, adminJWT: string, property: string, object: unknown) {
    const propertyCapitalized = property.charAt(0).toUpperCase() + property.slice(1);
    const url = `${import.meta.env.VITE_CLOUD_API_URL}${type}?propertyName=${propertyCapitalized}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${adminJWT}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
}

export async function putNewCrud(type: string, adminJWT: string , object: unknown) {
    const url = `${import.meta.env.VITE_CLOUD_API_URL}${type}?propertyName=null`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${adminJWT}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
}
    
// Transactions 
export function useGetUserTransactions(user: string) {
    const url = `${import.meta.env.VITE_CLOUD_API_URL}UserAccount/GetTransactionSummaries`;
    return useQuery({
        queryKey: ["transaction", user],
        queryFn: () =>
            fetch(url, {
                headers: {
                    Authorization: `Bearer ${AuthenticatedUser() as string}`,
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                if (!res.ok) {
                    if (res.status === 401) {
                        removeToken();
                        location.href = '/login';
                    }
                }
                return res.json();
            }),
        refetchOnWindowFocus: true,
        staleTime: 5 * 60 * 1000,
    });
}
export function useGetGameVersions() {
    const url = `${import.meta.env.VITE_CLOUD_API_URL}s3/GameVersions`;
    return useQuery({
        queryKey: ["gameVersions"],
        queryFn: () =>
            fetch(url, {
                headers: {
                    Authorization: `Bearer ${AuthenticatedUser() as string}`,
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                if (!res.ok) {
                    if (res.status === 401) {
                        removeToken();
                        location.href = '/login';
                    }
                }
                return res.json();
            }),
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
    });
}
export function useGetUserInvites() {
    const url = `${import.meta.env.VITE_CLOUD_API_URL}Invites/GetInvites`;
    return useQuery({
        queryKey: ["userInvites"],
        queryFn: () =>
            fetch(url, {
                headers: {
                    Authorization: `Bearer ${AuthenticatedUser() as string}`,
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                if (!res.ok) {
                    if (res.status === 401) {
                        removeToken();
                        location.href = '/login';
                    }
                }
                return res.json();
            }),
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
        
    });
}