import { apiClient } from './api-client'; import type { Plan } from '@/types';
export class SubscriptionService { static getPlans = async () => (await apiClient.get<Plan[]>('/plans')).data; static subscribe = async (plan:string) => (await apiClient.post<{ success:boolean; plan:string }>('/memberships', { plan })).data; }
