import { useCallback, useEffect, useState } from "react";
import { Children } from "../../layouts/Children/Children";
import userApi from "../../api/apiUser";
import { Spin } from "antd";

type Items = {
    hasMore: boolean;
    items: [];
    tolal: number;
};
type interfaceData = {
    data: Items;
    err: number;
    msg: string;
    timestamp: number;
};

export const Home = () => {
    const [data, setData] = useState<interfaceData>();
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        if (data) return;
        setLoading(true);
        try {
            const result = await userApi.getUser();
            setData(result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [data]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    console.log("data: ", data);
    return (
        <Children>
            {loading ? (
                <Spin />
            ) : (
                <ul>
                    {data?.data?.items.map((item: any, index: any) => (
                        <li key={index}>{item.title}</li>
                    ))}
                </ul>
            )}
        </Children>
    );
};
