import "server-only";

import { TRPCError } from "@trpc/server";
import { cookies } from "next/headers";

import { CacheMonitor } from "@/lib/monitoring/cache-monitor";

/* eslint-disable no-undef */
export class HttpError extends Error {
    public status: number;
    public statusText: string;
    public response: Response;

    constructor(response: Response) {
        super(`HTTP error! status: ${response.status}`);
        this.status = response.status;
        this.statusText = response.statusText;
        this.response = response;
    }
}

class FetchClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private buildUrl(endpoint: string): string {
        if (this.baseURL.endsWith("/") && endpoint.startsWith("/")) {
            return `${this.baseURL}${endpoint.slice(1)}`;
        } else if (!this.baseURL.endsWith("/") && !endpoint.startsWith("/")) {
            return `${this.baseURL}/${endpoint}`;
        } else {
            return `${this.baseURL}${endpoint}`;
        }
    }

    private buildUrlWithParams(
        url: string,
        params?: Record<string, any>
    ): string {
        if (!params) return url;
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, value.toString());
            }
        });
        const queryString = searchParams.toString();
        return queryString ? `${url}?${queryString}` : url;
    }

    // Hàm helper để lấy store location từ cookie
    private getStoreLocationFromCookie(): { code: number; name: string } {
        try {
            const cookieStore = cookies();
            const locationCookie = cookieStore.get("SELECTED_STORE_LOCATION");

            if (locationCookie?.value) {
                const parsed = JSON.parse(locationCookie.value);

                // Validate parsed data
                if (
                    typeof parsed.code === "number" &&
                    typeof parsed.name === "string"
                ) {
                    return parsed;
                }
            }

            // Default value nếu không có cookie
            return { code: 79, name: "TP Hồ Chí Minh" };
        } catch (error) {
            console.error("Error parsing store location cookie:", error);
            return { code: 79, name: "TP Hồ Chí Minh" };
        }
    }

    // Hàm helper để lấy store location từ cookie
    private getAccessTokenFromCookie(): string {
        const cookieStore = cookies();
        const accessTokenCookie = cookieStore.get("USER_TOKEN");

        if (accessTokenCookie?.value) {
            const value = accessTokenCookie.value;

            return value;
        }

        return undefined;
    }

    protected async request<R>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<R> {
        const {
            method = "GET",
            headers = {},
            body = null,
            cache = "no-store",
            next,
        } = options;

        const url = this.buildUrl(endpoint);
        const storeLocation = this.getStoreLocationFromCookie();

        const fetchOptions: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Selected-Store-Location": encodeURIComponent(
                    JSON.stringify(storeLocation)
                ),
                Authorization: `Bearer ${this.getAccessTokenFromCookie()}`,
                ...headers,
            },
            body:
                body && typeof body === "object" && !(body instanceof FormData)
                    ? JSON.stringify(body)
                    : body,
            cache: next?.revalidate ? undefined : cache,
            ...(next?.revalidate || next?.tags ? { next } : {}),
        };
        try {
            const startTime = performance.now();

            const response = await fetch(url, fetchOptions);
            const endTime = performance.now();
            const duration = endTime - startTime;
            const isCacheMiss = duration > 100; // Threshold có thể điều chỉnh

            if (method === "GET") {
                if (isCacheMiss && next?.tags) {
                    CacheMonitor.logCacheMiss(
                        `Tags: ${next?.tags.join(";")} - Url: ${url}`
                    );
                } else {
                    if (!isCacheMiss && (next || cache !== "no-store")) {
                        CacheMonitor.logCacheHit(`Url: ${url}`);
                    }
                }
            }

            const status = response.status;
            if (status === 403) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "Không có quyền hạn",
                    cause: response,
                });
            }

            // if (!response.ok) {
            //   throw new HttpError(response)
            // }
            return await response.json();
        } catch (err) {
            throw err;
        }
    }

    get<R>(
        endpoint: string,
        options: RequestInit & { params?: Record<string, any> } = {}
    ): Promise<R> {
        const { params, ...fetchOptions } = options;
        const url = this.buildUrlWithParams(endpoint, params);
        return this.request<R>(url, { ...fetchOptions, method: "GET" });
    }

    post<B, R>(
        endpoint: string,
        body: B,
        options: RequestInit = {}
    ): Promise<R> {
        return this.request<R>(endpoint, {
            ...options,
            method: "POST",
            body: JSON.stringify(body),
        });
    }

    put<B, R>(
        endpoint: string,
        body: B,
        options: RequestInit = {}
    ): Promise<R> {
        return this.request<R>(endpoint, {
            ...options,
            method: "PUT",
            body: JSON.stringify(body),
        });
    }

    patch<B, R>(
        endpoint: string,
        body: B,
        options: RequestInit = {}
    ): Promise<R> {
        return this.request<R>(endpoint, {
            ...options,
            method: "PATCH",
            body: JSON.stringify(body),
        });
    }

    delete<R>(endpoint: string, options: RequestInit = {}): Promise<R> {
        return this.request<R>(endpoint, { ...options, method: "DELETE" });
    }
}

export default FetchClient;
