export interface Loading {
    loading?: boolean
    success?: boolean
    error?: boolean
}

export enum Gender {
    man = 1,
    girl,
    unknown
}

export type Size = 'middle' | 'large' | 'small'
