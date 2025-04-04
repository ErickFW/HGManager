import {useEffect, useState} from "react";
import {getAllOrders} from "./appwrite";
import {Alert} from "react-native";

const useAppwrite = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fn();
            setData(response);

        } catch (error) {
            Alert.alert('Erro', error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => fetchData();

    return { data, isLoading, refetch };
}

export default useAppwrite;