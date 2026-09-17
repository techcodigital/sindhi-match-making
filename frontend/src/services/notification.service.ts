import { apiClient } from './api-client';
export type Notification = { id:string; text:string; time:string };
export class NotificationService { static list = async () => (await apiClient.get<Notification[]>('/notifications')).data; }
