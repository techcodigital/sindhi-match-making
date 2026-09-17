import { apiClient } from './api-client';
import type { Profile } from '@/types';

export type CurrentSession = { user:{ id:string; phone:string; profileId:string|null }; profile:(Profile & Record<string, unknown>)|null };
export class SessionService {
  static current = async () => (await apiClient.get<CurrentSession>('/auth/me')).data;
  static signedIn = () => typeof window !== 'undefined' && Boolean(window.localStorage.getItem('smm_token'));
  static signOut = () => { if (typeof window !== 'undefined') window.localStorage.removeItem('smm_token'); };
}
