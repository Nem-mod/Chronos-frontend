import { useEffect, useState } from 'react';
import axios from '../axios.ts';

export enum HttpMethods {
    get = 'get',
    post = 'post',
    patch = 'patch',
    delete = 'delete'
}

function useFetch(url: string, method: HttpMethods, params?: object): [any, boolean | null, string | null] {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setData(null);
        setError(null);
        axios[method](url, params)
            .then(res => {
                setLoading(false);
                res.data && setData(res.data);
            })
            .catch(err => {
                setLoading(false);
                setError(err);
            });
    }, [url]);

    return [data, loading, error];
}

export default useFetch;