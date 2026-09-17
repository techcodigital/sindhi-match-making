import { create } from 'zustand';
import type { Profile } from '@/types';
import { apiClient } from '@/services/api-client';

type Store = { user:Profile|null; setUser:(user:Profile)=>void; favouriteIds:string[]; loadFavourites:()=>Promise<void>; toggleFavourite:(id:string)=>Promise<void> };
export const useAppStore = create<Store>((set) => ({
  user: null,
  setUser: user => set({ user }),
  favouriteIds: [],
  loadFavourites: async () => { try { const { data } = await apiClient.get<{ favouriteIds:string[] }>('/favourites'); set({ favouriteIds: data.favouriteIds }); } catch {} },
  toggleFavourite: async id => { try { const { data } = await apiClient.post<{ favouriteIds:string[] }>(`/favourites/${id}`); set({ favouriteIds: data.favouriteIds }); } catch {} },
}));
