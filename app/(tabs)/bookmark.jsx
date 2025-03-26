import {View, Text, Image, FlatList, RefreshControl} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import { images } from '../../constants'
import SearchInput from "../../components/searchinput";
import EmptyState from "../../components/emptystate";
import {getAllOrders} from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import OrderCard from "../../components/ordercard";
import {StatusBar} from "expo-status-bar";

const Orders
    = () => {
    const {data: orders, refetch} = useAppwrite(getAllOrders)

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

    //console.log(orders);


    return (
        <SafeAreaView className="bg-black-200 h-full">
            <FlatList
                data={orders}
                keyExtractor={(item) => item.$id}
                renderItem={({item}) => (
                    <OrderCard order={item}/>

                )}
                ListHeaderComponent={() => (
                    <View className="my-6 px-4 space-y-6">
                        <View className="justify-between items-start flex-row mb-6">
                            <View>
                                <Text className="text-2xl font-psemibold text-white">HIDROGERAL</Text>
                                <Text className="font-pmedium text-sm text-gray-100">Lista de todas as ordens atuais</Text>
                            </View>
                            <View className="mt-1.5">
                                <Image
                                    source={images.logoSmall}
                                    className="w-9 h-10"
                                    resizeMode='contain'
                                />

                            </View>
                        </View>

                        <SearchInput />


                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="Nenhuma ordem"
                        subtitle="Faça já a primeira ordem"
                    />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
            <StatusBar backgroundColor='#161622' style={'light'} />
        </SafeAreaView>


    )
}

export default Orders
