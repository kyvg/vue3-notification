/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly TEST: boolean
}


interface ImportMeta {
    readonly env: ImportMetaEnv
}
