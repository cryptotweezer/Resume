"use client"

import { useSyncExternalStore } from "react"

const subscribe = () => () => { }

/**
 * true once the component has hydrated on the client, false while rendering on the
 * server. Use it to gate anything that would otherwise cause a hydration mismatch
 * (themed assets, WebGL canvases). Replaces the setState-in-effect "mounted" flag.
 */
export function useMounted() {
    return useSyncExternalStore(subscribe, () => true, () => false)
}
