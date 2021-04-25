import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './Screens/MainScreen';
import LoadListScreen from './Screens/LoadListScreen';

const Stack = createStackNavigator();

export default function App() {
  
  return (
    // <View>
    //   <Text>Main Screen</Text>
    // </View>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" headerMode="none" screenOptions={{}}>
        <Stack.Screen name="Main" component={MainScreen}/>
        {/* <Stack.Screen name="Main" component={MainScreen} /> */}
        <Stack.Screen name="LoadList" component={LoadListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
