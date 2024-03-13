import {useEffect, useState} from "react";
import axios from "../axios.ts"

export enum HttpMethods {
    get = "get",
    post = "post",
    patch = "patch",
    delete = "delete"
}
function useFetch(url: string, method: HttpMethods, params: object) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setData(null);
        setError(null);
        axios[method](url, params)
            .then(res => {
                setLoading(false);
                res.data.content && setData(res.data.content);
            })
            .catch(err => {
                setLoading(false)
                setError(err)
            })
    }, [url])

    return [data, loading, error]
}

export default useFetch;