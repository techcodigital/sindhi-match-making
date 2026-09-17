export type Gender = 'Woman' | 'Man';
export type Profile = { id:string; name:string; gender:Gender; age:number; city:string; occupation:string; education:string; image:string; verified:boolean; height:string; religion:string; caste:string; income:string; about:string; completion:number };
export type Plan = { name:string; price:string; note:string; featured?:boolean; features:string[] };
