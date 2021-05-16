import { Dimensions, FlatList, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as React from 'react';
import {useEffect, useState, Component} from 'react';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainScreen() {
      const screenSize = Platform.OS === "web" ? Dimensions.get("window") : Dimensions.get("screen");
      const navigation = useNavigation();

      var [entryNotEntered, setEntryNotEntered] = useState("");
      var [entryMessage, setEntryMessage] = useState("");
      const baseHeightUnit = screenSize.height / 25;

      const [lists, setLists] = useState([]);
      const [titles, setTitles] = useState([]);

      const [listTitle, setListTitle] = useState("");
      const [thisList, setThisList] = useState([]);

      const [saveLoad, setSaveLoad] = useState(false);
      const [loading, setLoading] = useState(false);
      const [saving, setSaving] = useState(false);

      const [enteringNumTimes, setEnteringNumTimes] = useState(false);
      const [numTimes, setNumTimes] = useState(0);

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

      function randomChoice1X (list) {
            var randomNumber = Math.floor(Math.random() * list.length);

            return list[randomNumber];
      }

      function randomChoice10X (list) {
            
            var countArray = [];
            for (let i = 0; i < list.length; i++) {
                  countArray.push(0);
            }

            for (let i = 0; i < 10; i++) {
                  var randomNumber = Math.floor(Math.random() * list.length);
                  countArray[randomNumber] += 1;
                  
            }
            // alert(countArray);
            var most = 0;
            var mostArray = [];

            for (let i = 0; i < countArray.length; i++) {
                  
                  if (countArray[i] >= most) {
                        mostArray.push(list[i]);
                        if (countArray[i] > most) {
                              mostArray = [];
                              most = countArray[i];
                              mostArray.push(list[i]);
                        }
                        
                  }
            }

            alert(countArray);
            return mostArray;
      }

      function randomChoiceX (list, amount) {
            var countArray = [];
            for (let i = 0; i < list.length; i++) {
                  countArray.push(0);
            }

            for (let i = 0; i < amount; i++) {
                  var randomNumber = Math.floor(Math.random() * list.length);
                  countArray[randomNumber] += 1;
                  
            }
            // alert(countArray);
            var most = 0;
            var mostArray = [];

            for (let i = 0; i < countArray.length; i++) {
                  
                  if (countArray[i] >= most) {
                        mostArray.push(list[i]);
                        if (countArray[i] > most) {
                              mostArray = [];
                              most = countArray[i];
                              mostArray.push(list[i]);
                        }
                        
                  }
            }

            alert(countArray);
            return mostArray;
      }

      function saveList (title, list) {
            // alert(lists.length);
            // alert(thisList)
            // lists.push(list);
            var listArray = [];
            listArray.push(lists);
            listArray.push([list]);
            setLists(listArray);
            var titleArray = [];
            titleArray.push(titles);
            titleArray.push(title);
            setTitles(titleArray);
            // titles.push(title);
            
            // alert(lists.length);
            storeLists(listArray);
            storeTitles(titleArray);
      }

      const storeLists = async (list) => {
            try {
                  const jsonValue = JSON.stringify(list)
                  await AsyncStorage.setItem('@lists', jsonValue)
            } catch (e) {
                  alert(e);
            }
      }



      const storeTitles = async (title) => {
            try {
                  const jsonValue = JSON.stringify(title)
                  await AsyncStorage.setItem('@titles', jsonValue)
            } catch (e) {
                  alert(e);
            }
      }

      

      useEffect (() => {
            const getTitles = async () => {
                  try {
                        const jsonValue = await AsyncStorage.getItem('@titles')
                        return jsonValue != null ? JSON.parse(jsonValue) : null;
                  } catch (e) {
                        alert(e);
                  }
            }

            const getLists = async () => {
                  try {
                        const jsonValue = await AsyncStorage.getItem('@lists')
                        return jsonValue != null ? JSON.parse(jsonValue) : null;
                  } catch (e) {
                        alert(e);
                  }
            }
            // alert(lists.length);
            // if (getLists != undefined && getTitles != undefined) {
                  setLists(getLists);
                  setTitles(getTitles);
            // }
            // alert(lists.length);
            // if (lists.length > 0) {
            //       // titles.forEach((x) => {
            //       //       alert(x);
            //       // })
            //       // alert(lists);
            //       // alert(titles);
            //       // alert(lists.length);
            //       var count = 0;
            //       lists.forEach((x) => {
            //             alert(count + "  " + x);
            //             count += 1;
            //       })
            // }
            
      }, [titles.length])

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
                              setSaveLoad(true);
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
                                    alert(randomChoice1X(thisList));
                              }}>
                                    <View style={{height: baseHeightUnit * 1.5, width: (screenSize.width / 3) - 7, backgroundColor: '#888', justifyContent: 'center', alignItems: 'center', borderRadius: 3}}>
                                          <Text style={{fontSize: 20, fontWeight: '400'}}>Choose x1</Text>
                                    </View>
                              </TouchableOpacity>

                              <TouchableOpacity style={{paddingHorizontal: 5}} onPress={() => {
                                    alert(randomChoice10X(thisList));
                              }}>
                                    <View style={{height: baseHeightUnit * 1.5, width: (screenSize.width / 3) - 6, backgroundColor: '#888', justifyContent: 'center', alignItems: 'center', borderRadius: 3}}>
                                          <Text style={{fontSize: 20, fontWeight: '400'}}>Choose x10</Text>
                                    </View>
                              </TouchableOpacity>

                              <TouchableOpacity onPress={() => {
                                    setEnteringNumTimes(true);
                                    
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

                  {saveLoad ? (
                        <View style={{position: 'absolute', elevation: 9, height: screenSize.height, width: screenSize.width, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(100, 100, 100, 0.6)'}}>
                              <View style={{position: 'absolute', elevation: 100, paddingVertical: 10, width: screenSize.width / 1.5, backgroundColor: '#fff', alignItems: 'center', alignContent: 'center'}}>
                                    {/* <View style={{height: 10}} /> */}

                                    {saving ? 
                                    (
                                          <TextInput style={{paddingLeft: 5, height: (screenSize.width / 1.5) / 4 - 10, width: screenSize.width / 1.5 - 20, backgroundColor: '#777'}} 
                                          onChangeText={(text) => setListTitle(text)}
                                          placeholder="Enter title for list"
                                          />
                                    ) : 
                                    (
                                          <TouchableOpacity onPress={() => {
                                                setLoading(true);
                                          }} style={{alignItems: 'center', justifyContent: 'center', height: (screenSize.width / 1.5) / 4 - 10, width: screenSize.width / 1.5 - 20, backgroundColor: '#777'}}>
                                                <Text>Load</Text>
                                          </TouchableOpacity>
                                    )}
                                    

                                    <View style={{height: 5}} />
                                    
                                    <TouchableOpacity onPress={() => {
                                          if (saving) {
                                                saveList(listTitle, thisList);
                                                setSaving(false);
                                                setSaveLoad(false);
                                          } else {
                                                setSaving(true);
                                          }
                                          

                                    }} style={{alignItems: 'center', justifyContent: 'center', height: (screenSize.width / 1.5) / 4 - 10, width: screenSize.width / 1.5 - 20, backgroundColor: '#777'}}>
                                          <Text>Save</Text>
                                    </TouchableOpacity>

                                    <View style={{height: 5}} />
                                    
                                    <TouchableOpacity onPress={() => {
                                          if (saving) {
                                                setSaving(false);
                                          } else {
                                                setSaveLoad(false);
                                          }
                                          
                                          
                                    }} style={{alignItems: 'center', justifyContent: 'center', height: (screenSize.width / 1.5) / 4 - 10, width: screenSize.width / 1.5 - 20, backgroundColor: '#777'}}>
                                          <Text>Cancel</Text>
                                    </TouchableOpacity>
                              </View>
                        </View>
                  ) : (<View style={{height: 0, width: 0}}></View>)}

                  { enteringNumTimes ? (
                        <View onTouchEnd={() => {
                              setEnteringNumTimes(false);
                        }} style={{position: 'absolute', elevation: 999, height: screenSize.height, width: screenSize.width, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(100, 100, 100, 0.6)'}}>
                              <View style={{position: 'absolute', elevation: 10, paddingVertical: 10, width: screenSize.width / 1.5, backgroundColor: '#fff', alignItems: 'center', alignContent: 'center'}}>
                                    <TextInput style={{paddingLeft: 5, height: (screenSize.width / 1.5) / 4 - 10, width: screenSize.width / 1.5 - 20, backgroundColor: '#777'}} 
                                          onChangeText={(text) => setNumTimes(text)}
                                          placeholder="Enter a number: 1 - 1,000,000"
                                          keyboardType="number-pad"
                                          returnKeyType="done"
                                          />
                                    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 5, height: (screenSize.width / 1.5) / 4 - 10, width: screenSize.width / 1.5 - 20, marginTop: 5, backgroundColor: '#777'}}
                                          onPress={() => {
                                                if (numTimes > 0 && numTimes <= 1000000) {
                                                      alert(randomChoiceX(thisList, numTimes));
                                                } else {
                                                      if (numTimes != 0) {
                                                            displayEntryMessage("Invalid entry. Enter a number from range 1 - 1,000,000");
                                                      }
                                                }
                                                setEnteringNumTimes(false);
                                          }}
                                    >
                                          <Text>Done</Text>
                                    </TouchableOpacity>
                              </View>
                        </View>
                  
                  ) : (<View style={{height: 0, width: 0}}></View>)}

                  <View style={{position: 'absolute', bottom: 30, height: 50, width: 320, backgroundColor: '#fff', alignSelf: 'center', marginTop: 10}}>

                  </View>
            </View>
      );
}