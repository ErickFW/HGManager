import {View, Text, Alert, ScrollView, Image} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";

import {images} from '../../constants'
import FormField from "../../components/formfield";
import CustomButton from "../../components/custombutton";
import {Link, router} from "expo-router";
import {account, createUser, getCurrentUser} from "../../lib/appwrite";
import {signIn} from "../../lib/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider";

const SignIn = () => {
    const [form, setForm] = useState({email: '', password: ''})

    const { setUser, setIsLoggedIn } = useGlobalContext()

    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async() => {
        if(!form.email || !form.password){
            Alert.alert('Erro', 'Por favor preencha todos os campos')
        }
        setIsSubmitting(true);
        try {
            await signIn(form.email, form.password);
            const result = await getCurrentUser();
            setUser(result);
            setIsLoggedIn(true);


            router.replace('/home');
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            setIsSubmitting(false);
        }

    }

  return (
    <SafeAreaView className="bg-black-200 h-full">
       <ScrollView>
           <View className={"w-full justify-center h-full px-4 my-6"}>
               <Image source={images.logo}
               resizeMode="contain" className="w-[115px] h-[35px]"/>
               <Text className="text-2xl text-white mt-10 font-psemibold">Faça Login</Text>
               <FormField
                   title="Email"
                   value={form.email}
                   handleChangeText={(e) => setForm({...form, email: e})}
                   otherStyles="mt-7"
                   keyboardTyle="email-adress"

               />
               <FormField
                   title="Password"
                   value={form.password}
                   handleChangeText={(e) => setForm({...form, password: e})}
                   otherStyles="mt-7"

               />

               <CustomButton
                    title="Entrar"
                    handlePress={submit}
                    containerStyle={"mt-7"}
                    isLoading={isSubmitting}

               />

               <View className=" justify-center pt-5 flex-row gap-2">
                   <Text className="text-lg text-gray-100 font-pregular">Não tem uma conta?</Text>
                   <Link href="/sign-up" className=" text-lg font-psemibold text-secondary-200">Faça uma</Link>


               </View>

           </View>
       </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn