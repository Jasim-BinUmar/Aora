import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appWrite'

const SignIn = () => {
  const [form, setForm] = useState({
    email:'',
    password: ''
  })
  //Loading 
  const [isSubmitting, setisSubmitting] = useState(false)

  //Function for submitting form

  const submit = async () => {
    if (form.email === ""|| form.password === "") {
      Alert.alert('Error', 'Please fill in all the fields')      
    }
    setisSubmitting(true);
    try {
      await signIn(form.email, form.password);
      // //set it to global state
      // router.replace('/home')
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);
      Alert.alert("Success", "User Signed in successfully");
      router.replace("/home");


    } catch (error) {
      Alert.alert('Error', error.message);
    }
    finally{
      setisSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[90vh] px-4 my-6">
          <Image source={images.logo} className="w-[115px] h-[35px]" resizeMode="contain"/>
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            LogIn to Aora
          </Text>

          {/* For Email */}
          
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"

          />

          {/* For password */}
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            otherStyles="mt-7"
          
          />

          {/* Custom button for sign in*/}
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles= " w-full mt-7"
            isLoading={isSubmitting}
          >
                       
          </CustomButton>
          <View className="justify-center flex-row pt-5 gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account? {' '}
              <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>Sign Up</Link>
            </Text>
          </View>        
        </View>
      </ScrollView>
      
    </SafeAreaView>
  )
}

export default SignIn