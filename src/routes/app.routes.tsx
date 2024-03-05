import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../pages/Dashboard";
import Details from "../pages/Details/intex";
import Profile from "../pages/Profile";

const Stack = createNativeStackNavigator();

function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}}/>
            <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
            <Stack.Screen name="Details" component={Details} initialParams={{ title: '', snippet: '', link: '' }} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

export default AppRoutes;