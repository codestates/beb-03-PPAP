import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Mail, Meet, Settings } from "../screens/TabScreens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../assets/colorScheme";
import { Login } from "../screens";

const TabIcon = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const Gradient = () => {
  <LinearGradient colors={[colors.main, colors.leaf]} />;
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Settings"
      screenOptions={({ route }) => ({
        tabBarIcon: (props) => {
          let name = "";
          if (route.name === "Mail")
            name = props.focused ? "email" : "email-outline";
          else if (route.name === "Meet")
            name = props.focused ? "video" : "video-outline";
          else
            name = props.focused
              ? "folder-settings"
              : "folder-settings-outline";
          return TabIcon({ ...props, name });
        },
        tabBarLabelPosition: "below-icon",
        tabBarLabelStyle: { fontSize: 13 },
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.dark,
        tabBarInactiveTintColor: colors.dark,
      })}
    >
      <Tab.Screen name="Mail" component={Mail} />
      <Tab.Screen name="Meet" component={Login} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
