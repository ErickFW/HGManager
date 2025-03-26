import {View, Text, Image, FlatList, TouchableOpacity, RefreshControl} from 'react-native'
import React, {useEffect, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import { icons, images } from '../../constants'
import SearchInput from "../../components/searchinput";
import EmptyState from "../../components/emptystate";
import {getDailyOrders, getUserOrders, signOut} from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import OrderCard from "../../components/ordercard";
import {StatusBar} from "expo-status-bar";
import { useGlobalContext} from "../../context/GlobalProvider";
import { router } from 'expo-router'
import DailyCard from "../../components/dailycard";

const Home
    = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext();
    const { data: orders, refetch } = useAppwrite(() => getUserOrders(user.$id));
    const {data: dailyOrders} = useAppwrite(() => getDailyOrders(user.$id));


    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        await refetch();
        setRefreshing(false);
    }

    const logout = async () => {
        await signOut();
        setUser(null);
        setIsLoggedIn(false);

        router.replace('/sign-in')

    }

    return (
        <SafeAreaView className="bg-black-200 h-full">
            <FlatList

                data={orders}
                keyExtractor={(item) => item.$id}
                renderItem={({item}) => (
                    <OrderCard order={item}/>


                )}
                ListHeaderComponent={() => (
                    <View className="my-6 space-y-6 mx-6" >
                        <View className="justify-between items-start flex-row mb-6">
                            <View className="w-[46px] h-[46px] justify-center items-center ">
                                <Image
                                    source={images.logoSmall}
                                    className="w-full h-full"
                                    resizeMode='cover' />
                            </View>
                            <View className="justify-center flex-1 ml-3 gap-y-1">
                                <Text className="font-pmedium text-sm text-gray-100">Bem vindo de volta</Text>
                                <Text className="text-2xl font-psemibold text-white">{user?.username}</Text>

                            </View>
                            <TouchableOpacity
                                className="mt-1.5"
                                onPress={logout}>
                                <Image
                                    source={icons.logout}
                                    className="w-9 h-10"
                                    resizeMode='contain'
                                />

                            </TouchableOpacity>
                        </View>

                        <View className="w-full flex-1 pt-5">
                            <Text className="text-gray-100 px-4 text-lg font-pregular mb-3">
                                Ordens do dia: {dailyOrders.length || 0}
                            </Text>

                            {dailyOrders && dailyOrders.length > 0 ? (
                                dailyOrders.map((order) => (
                                    <DailyCard key={order.$id} order={order} />
                                ))
                            ) : (
                                <Text className="text-gray-100">Nenhuma ordem para hoje.</Text>
                            )}


                            <Text className="text-gray-100 px-4 text-lg font-pregular mt-7">
                                Ordens futuras: {orders.length || 0}
                            </Text>




                        </View>



                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="Nenhuma ordem encontrada"
                        subtitle="Não há nenhuma order para você atualmente"
                    />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
            <StatusBar backgroundColor='#161622' style={'light'} />
        </SafeAreaView>


    )
}

export default Home
