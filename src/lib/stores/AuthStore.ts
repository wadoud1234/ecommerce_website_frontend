import type { Session, User } from "lucia";
import { get, writable } from "svelte/store";

export type UserAuthData = {
	id: string;
	email: string;
	name: string;
	avatar: string;
} | null;
type AuthData = {
	user: UserAuthData;
	session: Session | null;
};

const AuthStore = writable<AuthData>();

export default AuthStore;
