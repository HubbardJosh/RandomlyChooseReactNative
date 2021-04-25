import { Dimensions, Platform, Text, TouchableOpacity, View } from 'react-native';
import * as React from 'react';
import { useNavigation } from "@react-navigation/native";

export default function MainScreen({Navigation}) {
      const screenSize =
        Platform.OS === "web" ? Dimensions.get("window") : Dimensions.get("screen");
      const navigation = useNavigation();

      return(
            <View style={{height: screenSize.height, width: screenSize.width, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{alignContent: 'center'}}>Main Screen</Text>
                  <TouchableOpacity onPress={() => {
                        navigation.navigate("LoadList");
                  }}>
                        <View style={{height: 30, width: 120, backgroundColor: '#888', justifyContent: 'center', alignItems: 'center'}}>
                              <Text>To Load List Screen</Text>
                        </View>
                  </TouchableOpacity>
            </View>
      );
}