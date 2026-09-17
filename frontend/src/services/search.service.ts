import { apiClient } from './api-client';
import type { Gender, Profile } from '@/types';

export type SearchFilters = { city:string; age:string; height:string; religion:string; caste:string; education:string; occupation:string };
export type DiscoverResult = { profiles:Profile[]; lookingFor:Gender; filters:{ height:string[]; religion:string[]; caste:string[]; education:string[]; occupation:string[] } };

export class SearchService {
  static async search(query = '', filters: SearchFilters, viewerGender: Gender = 'Woman') {
    const { data } = await apiClient.get<DiscoverResult>('/discover', { params: { q: query, viewerGender, ...filters } });
    return data;
  }
}
