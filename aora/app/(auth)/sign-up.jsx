import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [from, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit =  async () => {
    if (!from.username || !from.email || !from.password) {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(from.email, from.password, from.username);
      router.replace("/home");
    } catch (error) {
      alert("Error",error.message);
    }finally{
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center px-4 h-full min-h-screen">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white  text-semibold mt-10 font-psemibold">
            Sign up to Aora
          </Text>
          <FormField
            title="Username"
            value={from.username}
            placeholder="Enter your username"
            handleChangeText={(text) => setForm({ ...from, username: text })}
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={from.email}
            placeholder="Enter your email"
            handleChangeText={(text) => setForm({ ...from, email: text })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={from.password}
            placeholder="Enter your email"
            handleChangeText={(text) => setForm({ ...from, password: text })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign Up"
            handlePress={() => submit()}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-4 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular mt-7">
              Already have an account?
              <Link
                href="/sign-in"
                className="text-lg text-secondary font-psemibold"
              >
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
