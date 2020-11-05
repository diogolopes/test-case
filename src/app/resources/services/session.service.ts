import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
/**
 * Session storage service
 * Provides methods to get, set, remove, clear session storage items.
 */
export class SessionService {
    /**
     * set session storage item
     * @param key 
     * @param value 
     */
    setItem(key: string, value: any) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * get session storage item
     * @param key 
     */
    getItem(key: string): any {
        var value = sessionStorage.getItem(key);
        //return JSON.parse(value);
        return {userId: 1, userName: "admin", password: "password", emailId: "admin@admin.com", birthDate: "1992-10-28T02:00:00.000Z"};
    }

    /**
     * remove session storage item
     * @param key
     */
    removeItem(key: string) {
        sessionStorage.removeItem(key);
    }

    /**
     * remove all session storage items
     */
    clear() {
        sessionStorage.clear();
    }

}