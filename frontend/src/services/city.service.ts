import { mockDelay } from './api-client';
export class CityService { static list = () => mockDelay(['Mumbai','Pune','Bengaluru','Delhi','Ahmedabad','Hyderabad']); }
