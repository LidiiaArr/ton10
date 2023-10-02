import { useEffect, useState } from "react";

export function useAsyncInitialize<T>(func: ()=> Promise<T>, deps: any[] = []) {
    const [state, setState] = useState<T | undefined>();
    useEffect(()=>{
        (async ()=> {
            setState(await func())
        })()
    }, deps)
    return state
}
//Будем использовать, чтобы инициализировать контракты
//если произошли какие-то изменения наш хук автоматически переинициализировал контракты