import { serverBackend } from '@/server';

export async function getPosts() {
    try {
        const result: any = await fetch(`${serverBackend}/api/v1/post`, {
            method: 'GET',
            cache: 'no-cache',
        });
        if (result.ok) {
            return result.json();
        } else {
            return { err: 'None API' };
        }
    } catch {
        return { err: 'None URL' };
    }
}

export async function getSlides() {
    try {
        const result: any = await fetch(`${serverBackend}/api/v1/getBanner`, {
            method: 'GET',
            cache: 'no-store',
        });
        if (result.ok) {
            return result.json();
        } else {
            return { err: 'None API' };
        }
    } catch {
        return { err: 'None URL' };
    }
}

export async function getCategories() {
    try {
        const result: any = await fetch(`${serverBackend}/api/v1/category`, {
            method: 'GET',
            cache: 'no-cache',
        });
        if (result.ok) {
            return result.json();
        } else {
            return { err: 'None API' };
        }
    } catch {
        return { err: 'None URL' };
    }
}
