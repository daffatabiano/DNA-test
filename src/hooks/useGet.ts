import { API_KEY, BASE_URL } from '@/data/base/data';
import axios from 'axios';

const useGet = () => {
    const get = async (url: string) => {
        try {
            const res = await axios.get<ApiResponse>(`${BASE_URL}/${url}`, {
                headers: {
                    'x-api-key': API_KEY,
                },
            });
            return res;
        } catch (err) {
            return err;
        }
    };
    return {
        get,
    };
};

export default useGet;
