import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//import pour redux persist
import user from "./reducers/user";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

//imports des écrans

//start tab nav
import HomeScreen from "./screens/HomeScreen";
import AgendaScreen from "./screens/AgendaScreen";
import AnimalScreen from "./screens/AnimalScreen";
import FaqScreen from "./screens/FaqScreen";
import ProfileScreen from "./screens/ProfileScreen";
//end tab nav

import TakeRdvScreen from "./screens/TakeRdvScreen";
import RdvConfirmationScreen from "./screens/RdvConfirmationScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignUpPro from "./screens/SignUpPro";

import SignInScreen from "./screens/SignInScreen";
import SignInPro from "./screens/SignInPro";

import AgendaProScreen from "./screens/AgendaProScreen";
import HealthJournal from "./screens/HealthJournal";
import ProfileProScreen from "./screens/ProfileProScreen";
import EmergencyScreen from "./screens/EmergencyScreen";
import RechercherListeScreen from "./screens/RechercherListeScreen";
import UrgenceScreen from "./screens/UrgenceScreen";
import QuestionScreen from "./screens/QuestionScreen";
import InfoProScreen from "./screens/InfoProScreen";

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName = "";
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Agenda") {
            iconName = "calendar";
          } else if (route.name === "Animal") {
            iconName = "paw";
          } else if (route.name === "Faq") {
            iconName = "info-circle";
          } else if (route.name === "SignUp") {
            iconName = "user";
          } else if (route.name === "SignIn") {
            iconName = "user";
          } else if (route.name === "TakeRdv") {
            iconName = "plus-circle";
          } else if (route.name === "RdvConfirmation") {
            iconName = "check-circle";
          } else if (route.name === "Animal") {
            iconName = "paw";
          } else if (route.name === "HealthCard") {
            iconName = "thumbs-up";
          } else if (route.name === "SignUpPro") {
            iconName = "user";
          } else if (route.name === "Profile") {
            iconName = "user";
          } else if (route.name === "AgendaPro") {
            iconName = "star";
          }
          return (
            <FontAwesome
              name={iconName}
              size={35}
              color={color}
              solid
              style={{ alignItems: "center" }}
            />
          );
        },
        tabBarStyle: { height: 80 }, // modifier la hauteur de la tab
        tabBarActiveTintColor: "#0D2C56",
        tabBarInactiveTintColor: "#1477AE",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Agenda" component={AgendaScreen} />
      <Tab.Screen name="Animal" component={AnimalScreen} />
      <Tab.Screen name="Faq" component={FaqScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {/* <Tab.Screen name="SignIn" component={SignInScreen} />
      <Tab.Screen name="SignUp" component={SignUpScreen} />
      <Tab.Screen name="SignInPro" component={SignInPro} />
      <Tab.Screen name="SignUpPro" component={SignUpPro} />
      <Tab.Screen name="TakeRdv" component={TakeRdvScreen} />
      <Tab.Screen name="RdvConfirmation" component={RdvConfirmationScreen} />
      {/* <Tab.Screen name="HealthCard" component={HealthJournal} />
      <Tab.Screen name="ProfilePro" component={ProfileProScreen} />
      <Tab.Screen name="AgendaPro" component={AgendaProScreen} /> */}
    </Tab.Navigator>
  );
}

//navigation principale:

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Recherche" component={RechercherListeScreen} />
          <Stack.Screen name="RechercherUrgence" component={UrgenceScreen} />
          <Stack.Screen name="LienQuestion" component={QuestionScreen} />
          <Stack.Screen name="LienFaq" component={FaqScreen} />
          <Stack.Screen name="InfoProScreen" component={InfoProScreen} />
          <Stack.Screen name="TakeRdv" component={TakeRdvScreen} />
          <Stack.Screen name="RdvConfirmation" component={RdvConfirmationScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
