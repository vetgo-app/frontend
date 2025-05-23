import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//import pour redux persist
import user from './reducers/user';
import { Provider } from "react-redux";
import {  configureStore } from '@reduxjs/toolkit';


//imports des écrans
import HomeScreen from "./screens/HomeScreen";
import AgendaScreen from "./screens/AgendaScreen";
import AnimalScreen from "./screens/AnimalScreen";
import FaqScreen from "./screens/FaqScreen";
import ProfileScreen from "./screens/ProfileScreen";
import TakeRdvScreen from "./screens/TakeRdvScreen"
import RdvConfirmationScreen from "./screens/RdvConfirmationScreen";
import SignUpScreen from "./screens/SignUpScreen";

import SignInScreen from "./screens/SignInScreen";

import AgendaProScreen from "./screens/AgendaProScreen";
import HealthJournal from "./screens/HealthJournal";
import ProfileProScreen from "./screens/ProfileProScreen";
import EmergencyScreen from './screens/EmergencyScreen';
import RechercherListeScreen from './screens/RechercherListeScreen';
import ProfessionnelLoginScreen from './screens/ProfessionnelLoginScreen';
import UrgenceScreen from "./screens/UrgenceScreen";


const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Provider store={store}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = "";
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Agenda") {
              //   iconName = "calendar";
              // } else if (route.name === "Animal") {
              //   iconName = "paw";
              // } else if (route.name === "Faq") {
              //   iconName = "info-circle";
            } else if (route.name === "SignUp") {
              iconName = "user";
            } else if (route.name === "SignIn") {
              iconName = "user";
            } else if (route.name === "TakeRdv") {
              iconName = "plus-circle";
            } else if (route.name === "RdvConfirmation") {
              iconName = "check-circle";
              iconName = "calendar";
            } else if (route.name === "Animal") {
              iconName = "paw";
            } else if (route.name === "HealthCard") {
              iconName = "thumbs-up";
            } else if (route.name === "Faq") {
              iconName = "info-circle";
            } else if (route.name === "Profile") {
              iconName = "user";
            } else if (route.name === "AgendaPro") {
              iconName = "star"
            }
            return (
              <FontAwesome name={iconName} size={size} color={color} solid />
            );
          },
          tabBarActiveTintColor: "#1472AE",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
        {/* <Tab.Screen name="Agenda" component={AgendaScreen} /> */}
        {/* <Tab.Screen name="Animal" component={AnimalScreen} /> */}
        <Tab.Screen name="SignIn" component={SignInScreen} />
        <Tab.Screen name="SignUp" component={SignUpScreen} />
        {/* <Tab.Screen name="Faq" component={FaqScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} /> */}
        <Tab.Screen name="TakeRdv" component={TakeRdvScreen} />
        <Tab.Screen name="RdvConfirmation" component={RdvConfirmationScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Agenda" component={AgendaScreen} />
        <Tab.Screen name="Animal" component={AnimalScreen} />
        <Tab.Screen name="HealthCard" component={HealthJournal} />
        <Tab.Screen name="Faq" component={FaqScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="ProfilePro" component={ProfileProScreen} />
        <Tab.Screen name="AgendaPro" component={AgendaProScreen} />
      </Tab.Navigator>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
  },

});


//navigation principale:

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Urgences" component={EmergencyScreen} />
        <Stack.Screen name="Recherche" component={RechercherListeScreen} />
        <Stack.Screen name="Professionnel" component={ProfessionnelLoginScreen} />

        <Stack.Screen name="RechercherUrgence" component={UrgenceScreen} />

      </Stack.Navigator>

    </NavigationContainer>
  )
}



