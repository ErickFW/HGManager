import {View, Text, ScrollView, Image, Alert} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import { createContext, useContext, useState, useEffect} from 'react';
import {images} from '../../constants'
import FormField from "../../components/formfield";
import CustomButton from "../../components/custombutton";
import {Link, router} from "expo-router";
import {createUser} from "../../lib/appwrite";
import {account} from "../../lib/appwrite";
import {useGlobalContext } from '../../context/GlobalProvider';

const SignUp = () => {

    const [form, setForm] = useState({nome:'',email: '', password: ''})

    const { setUser, setIsLoggedIn } = useGlobalContext()

    const [isSubmitting, setIsSubmitting] = useState(false);


    const submit = async() => {
        if(!form.nome || !form.email || !form.password){
            Alert.alert('Erro', 'Por favor preencha todos os campos')
        }
        setIsSubmitting(true);
        try {
            const result = await createUser(form.email, form.password, form.nome);
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
                    <Text className="text-2xl text-white mt-10 font-psemibold">Crie sua conta</Text>
                    <FormField
                        title="Nome"
                        value={form.nome}
                        handleChangeText={(e) => setForm({...form, nome: e})}
                        otherStyles="mt-7"

                    />
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
                        title="Criar conta"
                        handlePress={submit}
                        containerStyle={"mt-7"}
                        isLoading={isSubmitting}

                    />

                    <View className=" justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">Já tem uma conta?</Text>
                        <Link href="/sign-in" className=" text-lg font-psemibold text-secondary-200">Entre agora</Link>


                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp