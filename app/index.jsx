import './globals.css';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router} from "expo-router";

import { images } from '../constants'
import CustomButton from '../components/custombutton';
import {StatusBar} from "expo-status-bar";
import {useGlobalContext} from "../context/GlobalProvider";

export default function App() {
    const {isLoading, isLoggedIn} = useGlobalContext()
    if(!isLoading && isLoggedIn) return <Redirect href="/home" />
  return (
      <SafeAreaView className="bg-black-200 h-full">
        <ScrollView contentContainerStyle={{ height: '100%'}}>
          <View className="w-full items-center justify-center min-h-[85vh] px-4">

            <Image
              source={images.logoBig}
              className="max-w-[380px] w-full h-[300px]"
              resizeMode="contain"
               />

            <View className={"relative mt-5"}>
                <Text className="text-3xl text-white font-bold text-center">
                    Gestão muito melhor de trabalho com {' '}
                    <Text className="text-secondary-200">HGManager</Text> </Text>



            </View>
              <CustomButton
                  title="Entrar"
                  handlePress={() => {router.push('/sign-in')}}
                  containerStyle="w-full mt-7"
              />

          </View>


        </ScrollView>

        <StatusBar backgroundColor='#161622' style={'light'} />


      </SafeAreaView>
  )
}

