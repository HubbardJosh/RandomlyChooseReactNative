import { Dimensions, FlatList, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as React from 'react';
import {useEffect, useState, Component} from 'react';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainScreen() {
      const screenSize = Platform.OS === "web" ? Dimensions.get("window") : Dimensions.get("screen");
      const navigation = useNavigation();
      const [thisList, setThisList] = useState([]);
      var [entryNotEntered, setEntryNotEntered] = useState("");
      var saving = false;
      var [entryMessage, setEntryMessage] = useState("");
      const baseHeightUnit = screenSize.height / 25;

      const renderList = ({item}) => {
            return (
                  <View style={{height: 50, paddingTop: 10, justifyContent: 'center', borderBottomWidth: 0.2, borderBottomColor: '#fff',}}>
                        <Text style={{fontSize: 25, fontWeight: '300', color: '#fff'}}>
                              {item}
                        </Text>
                  </View>
            );
      }

      function displayEntryMessage (message) {
            setEntryMessage(message);

            setTimeout(function() {
                  setEntryMessage("");
            }, 5000);
      }

      return(
            <View style={{height: screenSize.height, width: screenSize.width, paddingTop: Platform.OS == "android" ? baseHeightUnit + 10 : baseHeightUnit * 2, backgroundColor: '#222123'}}>
                  <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <TextInput 
                              placeholder="Enter text here" 
                              placeholderTextColor="#000"
                              style={{width: (screenSize.width - 35 - (screenSize.width / 5)), paddingLeft: 3, backgroundColor: '#888', borderRadius: 3, fontSize: 20, fontWeight: '400', color: '#fff'}} 
                              onChangeText={(text) => setEntryNotEntered(text)}
                              value={entryNotEntered}
                              />
                        <TouchableOpacity style={{paddingLeft: 5}} onPress={() => {
                              navigation.navigate("LoadList");
                        }}>
                              <View style={{height: baseHeightUnit, width: ((screenSize.width / 5) + 20), backgroundColor: '#888', justifyContent: 'center', alignItems: 'center', borderRadius: 3}}>
                                    <Text style={{fontSize: 20, fontWeight: '400'}}>Save/Load</Text>
                              </View>
                        </TouchableOpacity>
                  </View>

                  <View style={{justifyContent: 'center', alignItems: 'center', height: ((baseHeightUnit * 14) - 20), paddingBottom: 5, paddingTop: 10}}>
                        <FlatList 
                              renderItem={renderList}
                              data={thisList}
                              keyExtractor={(x, i) => (x + i)}
                              style={{width: screenSize.width - 10}}
                        />
                  </View>

                  <View style={{paddingVertical: 5, paddingLeft: 10, height: baseHeightUnit, justifyContent: 'center'}}>
                        <Text style={{fontSize: 18, fontWeight: '400', color: '#fff'}}>
                              {entryMessage}
                        </Text>
                  </View>

                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => {
                              
                              if (entryNotEntered.trim().length > 0) {
                                    thisList.push(entryNotEntered);
                                    setEntryNotEntered("");
                                    setEntryMessage("");
                              } else {
                                    displayEntryMessage("Please enter text");
                              }
                        }}>
                              <View style={{height: baseHeightUnit * 1.5, width: screenSize.width - 10, backgroundColor: '#888', justifyContent: 'center', alignItems: 'center', borderRadius: 3}}>
                                    <Text style={{fontSize: 20, fontWeight: '400'}}>Enter</Text>
                              </View>
                        </TouchableOpacity>

                        <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 4}}>
                              <TouchableOpacity onPress={() => {
                                    navigation.navigate("LoadList");
                              }}>
                                    <View style={{height: baseHeightUnit * 1.5, width: (screenSize.width / 3) - 7, backgroundColor: '#888', justifyContent: 'center', alignItems: 'center', borderRadius: 3}}>
                                          <Text style={{fontSize: 20, fontWeight: '400'}}>Choose x1</Text>
                                    </View>
                              </TouchableOpacity>

                              <TouchableOpacity style={{paddingHorizontal: 5}} onPress={() => {
                                    navigation.navigate("LoadList");
                              }}>
                                    <View style={{height: baseHeightUnit * 1.5, width: (screenSize.width / 3) - 6, backgroundColor: '#888', justifyContent: 'center', alignItems: 'center', borderRadius: 3}}>
                                          <Text style={{fontSize: 20, fontWeight: '400'}}>Choose x10</Text>
                                    </View>
                              </TouchableOpacity>

                              <TouchableOpacity onPress={() => {
                                    navigation.navigate("LoadList");
                              }}>
                                    <View style={{height: baseHeightUnit * 1.5, width: (screenSize.width / 3) - 7, backgroundColor: '#888', justifyContent: 'center', alignItems: 'center', borderRadius: 3}}>
                                          <Text style={{fontSize: 20, fontWeight: '400'}}>Choose X</Text>
                                    </View>
                              </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => {
                              setThisList([]);
                        }}>
                              <View style={{height: baseHeightUnit * 1.5, width: screenSize.width - 10, backgroundColor: '#888', justifyContent: 'center', alignItems: 'center', borderRadius: 3}}>
                                    <Text style={{fontSize: 20, fontWeight: '400'}}>Clear List</Text>
                              </View>
                        </TouchableOpacity>
                  </View>
                  <View style={{position: 'absolute', bottom: 30, height: 50, width: 320, backgroundColor: '#fff', alignSelf: 'center', marginTop: 10}}>

                  </View>
            </View>
      );
}