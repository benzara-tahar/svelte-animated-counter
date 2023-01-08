export type CounterValue = string | number | Record<string, any>;
export type CountValueResolver = (value: any) => string;

export type CounterDirection = 'up' | 'down' | 'random';
