import {View, Text, Image, FlatList} from 'react-native'
import React, {useEffect} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import { images } from '../../constants'
import SearchInput from "../../components/searchinput";
import EmptyState from "../../components/emptystate";
import {searchOrders} from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import OrderCard from "../../components/ordercard";
import {StatusBar} from "expo-status-bar";
import {useLocalSearchParams} from "expo-router";

const Search
    = () => {
    const { query } = useLocalSearchParams()
    const { data: orders, refetch } = useAppwrite(() => searchOrders(query));

    useEffect(() => {
        refetch()
    }, [query])

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
                                <Text className="font-pmedium text-sm text-gray-100">Resultado da pesquisa: {query}</Text>
                            </View>
                            <View className="mt-1.5">
                                <Image
                                    source={images.logoSmall}
                                    className="w-9 h-10"
                                    resizeMode='contain'
                                />

                            </View>
                        </View>

                        <SearchInput initialQuery={query} />


                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="Nenhuma ordem encontrada"
                        subtitle="Nenhum video foi encontrado para esta pesquisa"
                    />
                )}
            />
            <StatusBar backgroundColor='#161622' style={'light'} />
        </SafeAreaView>


    )
}

export default Search
