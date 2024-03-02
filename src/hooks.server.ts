import { auth } from '$lib/server/auth';
import AuthStore from '$lib/stores/AuthStore';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const sessionId = event.cookies.get(auth.sessionCookieName);
    if (!sessionId) {
        event.locals.user = null;
        event.locals.session = null;
        AuthStore.set({
            user: null,
            session: null
        })
        return resolve(event);
    }

    const { session, user } = await auth.validateSession(sessionId);
    if (session && session.fresh) {
        const sessionCookie = auth.createSessionCookie(session.id);
        // sveltekit types deviates from the de-facto standard
        // you can use 'as any' too
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: '.',
            ...sessionCookie.attributes
        });
    }
    if (!session) {
        const sessionCookie = auth.createBlankSessionCookie();
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: '.',
            ...sessionCookie.attributes
        });
    }

    event.locals.user = user;
    event.locals.session = session;
    AuthStore.set({
        user: {
            id: user?.id as string,
            email: user?.email as string,
            name: user?.name as string,
            avatar: user?.avatar as string
        }, session
    })

    return resolve(event);
};