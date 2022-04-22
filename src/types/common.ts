export interface Loading {
    loading?: boolean
    success?: boolean
    error?: boolean
}

// 性别
export enum Gender {
    man = 1,
    girl,
    unknown
}

// 尺寸
export type Size = 'middle' | 'large' | 'small'
