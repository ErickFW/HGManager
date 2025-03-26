import { View, Image, Text } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused}) => {
    return (
        <View className="items-center justify-center gap-2 mt-7">
            <Image
            source={icon}
            resizeMode="contain"
            tintColor={color}
            className="w-6 h-6"
            />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs text-center `} style={{ color: color, minWidth: 60}}>
                {name}
            </Text>
        </View>


    )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#0b8cc4',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '232533',
            height: 64,
        }
      }}
      
      >
        <Tabs.Screen name="home"
        options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
                <TabIcon
                icon={icons.profile}
                color={color}
                name="Hoje"
                focused={focused}
        
                />
            )
        }} />
        <Tabs.Screen name="bookmark"
        options={{
            title: 'Bookmark',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
                <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Ordens"
                focused={focused}
        
                />
            )
        }} />
        <Tabs.Screen name="create"
        options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
                <TabIcon
                icon={icons.plus}
                color={color}
                name="Criar"
                focused={focused}
        
                />
            )
        }} />
      </Tabs>
    
    </>
  )
}

export default TabsLayout