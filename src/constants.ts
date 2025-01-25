export const ONE_SECOND = 1_000;
export const ONE_MINUTE = 60 * ONE_SECOND;

export const DEBOUNCE_DEFAULT_DELAY = 500;

export const PLAN_IDS = {
    basic: 'basic',
    pro: 'pro',
} as const;

export const PLAN_OPTIONS = [
    { label: 'Basic', value: PLAN_IDS.basic },
    { label: 'Pro', value: PLAN_IDS.pro },
];
