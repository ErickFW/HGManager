import {View, Text, ScrollView, Alert} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import FormField from "../../components/formfield";
import CustomButton from "../../components/custombutton";
import {router} from "expo-router";
import {criarOrdem} from "../../lib/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider";
import DateTimeField from "../../components/datetimefield";

const Create = () => {

    const { user } = useGlobalContext()
    const [uploading, setUploading] = useState(false)
    const [form, setForm] = useState({
        cliente: '',
        local: '',
        data: null,

    })

    const submit = async () => {
        console.log('Form data:', form.data);
        if (!form.cliente || !form.local || !form.data || isNaN(form.data)) {
            return Alert.alert('Por favor preencher todos os campos');
        }

        setUploading(true);
        try {
            await criarOrdem({
                ...form,
                data: form.data.toISOString(),
                funcionario: user.$id
            });

            Alert.alert('Sucesso', 'Ordem criada');
            router.push('/home');

        } catch (error) {
            Alert.alert('Erro', error.message);
        } finally {
            setForm({
                cliente: '',
                local: '',
                data: null,
            });
            setUploading(false);
        }
    };


    return (
    <SafeAreaView className="bg-black-200 h-full">
        <ScrollView className="px-4 my-6">
            <Text className="text-2xl text-white font-psemibold">
                Criar nova ordem de trabalho
            </Text>

            <FormField
                title="Cliente"
                value={form.cliente}
                placeholder="Nome do cliente"
                handleChangeText={(e) => setForm({...form, cliente: e})}
                otherStyles="mt-10"
            />
            <FormField
                title="Local"
                value={form.local}
                placeholder="Onde será"
                handleChangeText={(e) => setForm({...form, local: e})}
                otherStyles="mt-10"
            />
            <DateTimeField
                title="Data e Hora"
                value={form.data}
                handleChange={(date) => setForm({ ...form, data: date})}
                otherStyles="mt-10 mb-16"
            />
            <CustomButton
                title="Criar ordem"
                handlePress={submit}
                isLoading={uploading}

            />

        </ScrollView>
    </SafeAreaView>
  )
}

export default Create
