import { router, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {

  const { loading, isLogged } = useGlobalContext()

  if (!loading && isLogged) return <Redirect href="/home" />


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full  justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possiblities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
            className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
            source={images.path}
            resizeMode="contain"
            />
          </View>
          <Text className="text-sm  font-pregular text-gray-100 mt-7 text-center">Where creativity meets innovation; embark on a journey of limitless exploration with Aora.</Text>
          <CustomButton
            title="Get Started"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-5"
          />
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622"  />
    </SafeAreaView>
  );
}
