import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import { AuthenticatedUser, removeToken } from "./authentication";
import { components as types } from '../types/api'
import { AuthenticatedUser as AuthUser } from "../types/types";
type User = types["schemas"]["StrangeUser"];
export function useFetchUserById(userJWT: string, user: string) {
    const url = `https://cloud.strangeloopgames.com/UserAccount/${user}`;
    return useQuery({
        queryKey: ["selected", user],
        queryFn: () =>
            fetch(url, {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                console.log(res);
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
export function useFetchUsers(pageNumber: number, pageSize: number, userJWT: string) {
    const url = `https://cloud.strangeloopgames.com/UserAccount?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return useQuery({
        queryKey: ["users"],
        queryFn: () =>
            fetch(url, {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                console.log(res);
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
export function useSearchUser(pageNumber: number, pageSize: number, search: string) {
    const url = `https://cloud.strangeloopgames.com/UserAccount/search?search=${search}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return useQuery({
        queryKey: ["search", search],
        queryFn: () =>
            fetch(url, {
                headers: {
                    Authorization: AuthenticatedUser() as string,
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                console.log(res);
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
export async function userUpdateUserById(adminJWT: string, updatedUser: User) {
	const url = `https://cloud.strangeloopgames.com/UserAccount`;
	const response = await fetch(url, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${adminJWT}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updatedUser),
	});

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json();
}
// Transactions 
export function useGetUserTransactions(user: string) {
    const url = "https://cloud.strangeloopgames.com/UserAccount/GetTransactionSummaries";
    return useQuery({
        queryKey: ["transaction", user],
        queryFn: () =>
            fetch(url, {
                headers: {
                    Authorization: `Bearer ${AuthenticatedUser() as string}`,
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                console.log(res);
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