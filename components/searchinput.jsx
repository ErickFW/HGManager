import {View, Text, TextInput, TouchableOpacity, Image, Alert} from 'react-native'
import React, {useState} from 'react'
import {icons} from '../constants'
import {usePathname, router} from "expo-router";

const SearchInput = ({initialQuery}) => {
    const pathname = usePathname()
    const [query, setQuery] = useState(initialQuery || '');
    const [isFocused, setIsFocused] = useState(false);
    return (
            <View
                className={`border-2 w-full h-16 px-4 bg-gray-700
                 rounded-2xl ${isFocused ? "border-secondary" : "border-gray-600"} items-center flex-row
                 space-x-4`}
            >

                <TextInput
                    className="text-base mt-0.5 text-white flex-1 font-pregular "
                    value={query}
                    placeholder="Procurar por nome ou data"
                    placeholderTextColor="#CDCDE0"
                    onChangeText={(e) => setQuery(e)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />

                <TouchableOpacity
                    onPress={() => {
                        if(!query) {
                            return Alert.alert('Missing query!', "Please input something on the search query")
                        }
                        if(pathname.startsWith('/search')) router.
                        setParams({ query})
                        else router.push(`/search/${query}`)
                    }}>
                    <Image
                        source={icons.search}
                        className="w-5 h-5"
                        resizeMode="contain"

                    />

                </TouchableOpacity>


            </View>
    )
}

export default SearchInput