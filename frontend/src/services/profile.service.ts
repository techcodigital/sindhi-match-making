import { apiClient } from './api-client';
import type { Profile } from '@/types';
export class ProfileService { static list = async () => (await apiClient.get<Profile[]>('/profiles')).data; static get = async (id:string) => (await apiClient.get<Profile>(`/profiles/${id}`)).data; static save = async (profile:Partial<Profile>) => (await apiClient.post<Profile>('/profiles/me', profile)).data; }
