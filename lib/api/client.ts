export type UserRole = "CLIENT" | "VENDOR" | "ADMIN";

export type ApiMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

const ROLE_EMAILS: Record<UserRole, string> = {
  CLIENT: "client1@shoofly.com",
  VENDOR: "vendor1@shoofly.com",
  ADMIN: "admin@shoofly.com",
};

export class ApiClientError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
  }
}

export async function apiFetch<T>(
  path: string,
  role: UserRole,
  options?: {
    method?: ApiMethod;
    body?: unknown;
    cache?: RequestCache;
  }
): Promise<T> {
  const response = await fetch(path, {
    method: options?.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      "x-user-email": ROLE_EMAILS[role],
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
    cache: options?.cache ?? "no-store",
  });

  const payload = await response.json().catch(() => ({} as Record<string, unknown>));

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload !== null && "error" in payload
        ? String((payload as { error: string }).error)
        : `Request failed with ${response.status}`;
    throw new ApiClientError(message, response.status);
  }

  return payload as T;
}
