import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//imports des écrans
import HomeScreen from "./screens/HomeScreen";
import AgendaScreen from "./screens/AgendaScreen";
import AnimalScreen from "./screens/AnimalScreen";
import FaqScreen from "./screens/FaqScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProfileProScreen from "./screens/ProfileProScreen";
import UrgenceScreen from "./screens/UrgenceScreen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = "";
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Agenda") {
              iconName = "calendar";
            } else if (route.name === "Animal") {
              iconName = "paw";
            } else if (route.name === "Faq") {
              iconName = "info-circle";
            } else if (route.name === "Profile") {
              iconName = "user";
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
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Agenda" component={AgendaScreen} />
        <Tab.Screen name="Animal" component={AnimalScreen} />
        <Tab.Screen name="Faq" component={FaqScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="ProfilePro" component={ProfileProScreen} />
        <Tab.Screen name="urgence" component={UrgenceScreen} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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


       

        <Stack.Screen name="Urgences" component={UrgencesScreen} />
        <Stack.Screen name="Recherche" component={RechercherListeScreen} />
        <Stack.Screen name="Professionnel" component={ProfessionnelLoginScreen} /> 
      </Stack.Navigator>

    </NavigationContainer>
  )
}

