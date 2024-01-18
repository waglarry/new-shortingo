import { Injectable } from '@angular/core';

const REMEMBER_ME_KEY = 'rememberMe';
const STORED_CREDENTIALS_KEY = 'storedCredentials';

@Injectable({
  providedIn: 'root',
})
export class RememberMeService {
  setRememberMe(value: boolean): void {
    localStorage.setItem(REMEMBER_ME_KEY, JSON.stringify(value));
  }

  getRememberMe(): boolean {
    const rememberMe = localStorage.getItem(REMEMBER_ME_KEY);
    return rememberMe ? JSON.parse(rememberMe) : false;
  }

  saveCredentials(credentials: any): void {
    localStorage.setItem(STORED_CREDENTIALS_KEY, JSON.stringify(credentials));
  }

  getStoredCredentials(): any {
    const storedCredentials = localStorage.getItem(STORED_CREDENTIALS_KEY);
    return storedCredentials ? JSON.parse(storedCredentials) : {};
  }
}
