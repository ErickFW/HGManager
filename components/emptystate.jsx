import { View, Image, Text } from 'react-native'
import '../app/globals.css';
import React from 'react'

import { images } from '../constants'
import CustomButton from "./custombutton";
import {router} from "expo-router";

const EmptyState = ({title, subtitle}) => {
  return (
    <View className="justify-center items-center px-4">
        <Image
            source={images.empty}
            className="w-[270px] h-[215px]"
            resizeMode='contain'
        />
        <Text className="text-xl text-center font-psemibold text-white mt-2">{title}</Text>
        <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>

        <CustomButton
            title="Criar já"
            handlePress={() => router.push('/create')}
            containerStyle="w-full my-5"
        />
    </View>
  )
}

export default EmptyState