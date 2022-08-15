export type UserRole = 'guest' | 'admin' | 'normal' | 'anonymous';

export type User = { id: number; username: string; role: UserRole; accessToken?: string };

export type LoginPayload = { username: string; password: string };

export type LoginResult = User & { accessToken: string };
