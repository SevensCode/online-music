declare module 'city'

interface City {
    [value: string]: {
        province: string
        name: string
        id: string
    }[]
}

declare const city: City
export default city
