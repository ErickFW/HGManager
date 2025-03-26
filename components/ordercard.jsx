import {View, Image, Text, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import { icons } from '../constants'
import CustomButton from "./custombutton";

const OrderCard = ({ order: {cliente, data, inicio, fim, local, funcionario: { username, foto }}}) => {
    const [open, setOpen] = useState(false)

  return (
    <View className=" flex-col items-center px-4 mb-10">
        <View className={`flex-row ${open ? "bg-gray-400" : "bg-gray-600"}  gap-3 items-start`}>
            <View className="justify-center items-center flex-row flex-1">
                <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5 ">
                    <Image
                        source={{ uri: foto}}
                        className="w-full h-full rounder-lg"
                        resizeMode='cover' />
                </View>
                <View className="justify-center flex-1 ml-3 gap-y-1" >
                    <Text className="text-white font-psemibold text-sm" numberOfLines={1}>{cliente} {data} {inicio}</Text>
                    <Text className="text-white text-xs font-pregular" numberOfLines={1}>{local}</Text>
                </View>
            </View>
            <View className=" pt-2 ">
                <Image source={icons.menu} className="w-5 h-5" resizeMode='contain' />


            </View>

        </View>

        {open ? (
            <View className="w-full bg-gray-300 justify-center flex-1">

                <Text> {data} </Text>
                <Text> {inicio} </Text>
                <Text> {fim} </Text>
                <TouchableOpacity className="w-full h-7 mt-3 relative justify-center items-center bg-gray-200"
                                  onPress={() => {setOpen(false)}}>
                    <Text className="text-black-200 font-pregular text-xs">Fechar</Text>
                </TouchableOpacity>
            </View>
        ) : (
            <TouchableOpacity className="w-full h-7 mt-3 relative justify-center items-center bg-gray-200"
            onPress={() => {setOpen(true)}}>
                <Text className="text-black-200 font-pregular text-xs">Abrir</Text>
            </TouchableOpacity>

    )}


    </View>
  )
}

export default OrderCard