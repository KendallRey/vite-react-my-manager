export type RequestApi = {
    abortController? : AbortController
    apiUrl : string
    token : string
    signal? : AbortSignal
    params? : {[key : string] : string | number | boolean | string[]}
    limit? : number
    page? : number
    endPoint? : string
    data? : {[key : string] : any}
    isCollege?: boolean
    onDownloadProgress? : (e : any)=>void
}

export type AxiosInstanceType = {} & Omit<RequestApi, 'apiUrl'>;
