import { Dimensions, FlatList, Platform, Text, TextInput, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, Image, Alert } from 'react-native';
import * as React from 'react';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../styles'

export default function MainScreen() {
      const screenSize = Platform.OS === "web" ? Dimensions.get("window") : Dimensions.get("screen");

      const [entryNotEntered, setEntryNotEntered] = useState("");
      const [entryMessage, setEntryMessage] = useState("");

      const [lists, setLists] = useState([]);
      const [titles, setTitles] = useState("");

      const [listTitle, setListTitle] = useState("");
      const [thisList, setThisList] = useState([]);

      const [modList, setModList] = useState([]);
      
      const [saveLoad, setSaveLoad] = useState(false);
      const [loading, setLoading] = useState(false);
      const [saving, setSaving] = useState(false);

      const [loaded, setLoaded] = useState(false);

      const [refresh, setRefresh] = useState(false);

      const [enteringNumTimes, setEnteringNumTimes] = useState(false);
      const [numTimes, setNumTimes] = useState(0);

      const [choiceMade, setChoiceMade] = useState(false);

      function displayEntryMessage (message) {
            setEntryMessage(message);

            setTimeout(function() {
                  setEntryMessage("");
            }, 5000);
      }

      function displayModifiedList (list, countArray, winnerArray) {
            var modifiedList = [];

            for (let x = 0; x < list.length; x++) {
                  modifiedList.push(list[x]);
            }

            for (let i = 0; i < list.length; i++) {
                  modifiedList[i] += (": " + countArray[i]);
            }

            for (let x = 0; x < winnerArray.length; x++) {
                  modifiedList[winnerArray[x]] += " ☆";
            }

            setChoiceMade(true);
            setModList(modifiedList);
      }

      function randomChoice1X (list) {
            var randomNumber = Math.floor(Math.random() * list.length);

            var modifiedList = [];

            for (let x = 0; x < list.length; x++) {
                  modifiedList.push(list[x]);
            }

            modifiedList[randomNumber] += " ☆";

            setChoiceMade(true);
            setModList(modifiedList);
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

            var most = 0;
            var mostArray = [];

            for (let i = 0; i < countArray.length; i++) {
                  
                  if (countArray[i] >= most) {
                        mostArray.push(i);
                        if (countArray[i] > most) {
                              mostArray = [];
                              most = countArray[i];
                              mostArray.push(i);
                        }
                        
                  }
            }

            displayModifiedList(list, countArray, mostArray);
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

            var most = 0;
            var mostArray = [];

            for (let i = 0; i < countArray.length; i++) {
                  
                  if (countArray[i] >= most) {
                        mostArray.push(i);
                        if (countArray[i] > most) {
                              mostArray = [];
                              most = countArray[i];
                              mostArray.push(i);
                        }
                        
                  }
            }

            displayModifiedList(list, countArray, mostArray);
            return mostArray;
      }

      function saveList (title, list) {
            var setTitle = title;

            if (thisList.length > 1) {
                  if (titles.split(',').includes(setTitle)) {
                        Alert.alert("List already exists with entered title.", "Do you wish to override?", [
                              {
                                    text: "Yes",
                                    onPress: () => {
                                          clearList(setTitle);
                                          // storeTitles(titles);

                                          setLists(lists.concat(list));
                                          storeList(list, setTitle);
                                    }
                              }, {
                                    text: "No",
                                    onPress: () => {
                                          var xTitle = setTitle + titles.split(',').length;
                                          setTitles(titles.concat(xTitle + ','));
                                          storeTitles(titles.concat(xTitle + ','));

                                          setLists(lists.concat(list));
                                          storeList(list, xTitle);
                                    },
                                    
                              }, {
                                    text: "Cancel",

                              }
                        ]
                        );
                        
                  } else {
                        setTitles(titles.concat(setTitle + ','));
                        storeTitles(titles.concat(setTitle + ','));

                        setLists(lists.concat(list));
                        storeList(list, setTitle);
                  }
                  
                  

                  
            }
      }

      const storeList = async (list, title) => {
            try {
                  const jsonValue = JSON.stringify(list)
                  await AsyncStorage.setItem(title, jsonValue)
            } catch (e) {
                  console.log(e);
            }
      }

      const storeTitles = async (title) => {
            try {
                  const jsonValue = JSON.stringify(title)
                  await AsyncStorage.setItem('titles', jsonValue)
            } catch (e) {
                  console.log(e);
            }
      }

      const getTitles = async () => {
            try {
                  const jsonValue = await AsyncStorage.getItem('titles')
                  if (jsonValue != null) {
                        setTitles(JSON.parse(jsonValue));
                  }

                  return jsonValue != null ? JSON.parse(jsonValue) : null;
            } catch (e) {
                  console.log(e);
            }
      }

      const clearTitles = async () => {
            try {
                  return await AsyncStorage.clear();
            } catch (e) {
                  console.log(e);
            }
      }
      const clearList = async (title) => {
            try {
                  return await AsyncStorage.removeItem(title);
            } catch (e) {
                  console.log(e);
            }
      }

      const getList = async (title) => {
            try {
                  const jsonValue = await AsyncStorage.getItem(title)

                  if (jsonValue != null) {
                        setThisList(JSON.parse(jsonValue));
                  }
                  
                  return jsonValue != null ? JSON.parse(jsonValue) : null;
            } catch (e) {
                  console.log(e);
            }
      }

      useEffect (() => {
            getTitles();


      // used to delete saved titles and lists 
            // if (titles.length > 0) {
            //       titles.split(',').forEach((x) => {
            //             clearList(x);
            //       })
            //       clearTitles();
            // }
      }, []);

      useEffect (() => {
            setRefresh(false);
      }, [refresh]);

      useEffect (() => {
            setSaveLoad(false);
            setLoading(false);
            setSaving(false);
            setLoaded(false);
            setRefresh(false);
            setEnteringNumTimes(false);
            setChoiceMade(false);
            // console.log(titles.substring(0, 1))
            if (titles.substring(0, 1).trim() == ',') {
                  // console.log('true')
                  setTitles(titles.slice(1, titles.length - 1));
                  storeTitles(titles.slice(1, titles.length - 1));
            }
            console.log(titles);
      }, []);

      const renderList = ({item, index}) => {
            return (
                  <TouchableOpacity disabled={loading ? false : true} 
                  onPress={() => {
                        if (loading) {
                              getList(item);
                              setLoading(false);
                              setChoiceMade(false);
                              setLoaded(true);
                        }

                  }}>
                        <View style={styles.flatlistView}>
                              <Text style={styles.flatlistText}>
                                    {item}
                              </Text>
                              <TouchableOpacity style={{right: 20, position: 'absolute'}} 
                                    onPress={() => {
                                          if (!loading) {
                                                thisList.splice(index, 1);
                                                setRefresh(true);
                                          } else {
                                                console.log(titles)
                                                Alert.alert("Do you want to delete list: ", String(item), [
                                                      {
                                                            text: "Yes",
                                                            onPress: () => {
                                                                  clearList(item);
                                                                  var temp = titles.split(',').sort();
                                                                  console.log("before" + temp)
                                                                  temp.splice(index, 1);
                                                                  
                                                                  setTitles(temp.join(','));
                                                                  console.log("after " + temp)
                                                                  storeTitles(temp.join(','));
                                                            }
                                                      }, {
                                                            text: "No",
                                                      },
                                                ]
                                                );
                                          }
                                          
                                    }}>
                                    <Image style={{height: 30, width: 20,}}
                                          source={require('../assets/tcc.png')}
                                          
                                    />
                              </TouchableOpacity>
                              
                        </View>
                  </TouchableOpacity>
            );
      }

      return(
            <SafeAreaView style={[styles.mainView, {flex: 1}]}>
                  <View style={{flexDirection: 'row', justifyContent: 'center', top: 5, marginBottom: 10}}>
                        <TextInput 
                              placeholder="Enter text here" 
                              placeholderTextColor="#bbb"
                              style={styles.enterTextInput} 
                              onChangeText={(text) => setEntryNotEntered(text)}
                              value={entryNotEntered}
                              />
                        <TouchableOpacity style={{paddingLeft: 5}} onPress={() => {
                              setSaveLoad(true);
                        }}>
                              <View style={styles.saveLoadButton}>
                                    <Text style={styles.buttonText}>Save/Load</Text>
                              </View>
                        </TouchableOpacity>
                  </View>

                  <View style={styles.flatlistMainView}>
                        {loading ? <FlatList 
                              renderItem={renderList}
                              data={titles.split(',').slice(0, titles.split(',').length - 1).sort()}
                              keyExtractor={(x, i) => (x + i)}
                              style={{width: screenSize.width - 10}}
                        />  
                        :
                        choiceMade ? <FlatList 
                              renderItem={renderList}
                              data={modList}
                              keyExtractor={(x, i) => (x + i)}
                              style={{width: screenSize.width - 10}}
                        /> 
                        : 
                        <FlatList 
                              renderItem={renderList}
                              data={thisList}
                              keyExtractor={(x, i) => (x + i)}
                              style={{width: screenSize.width - 10}}
                              extraData={refresh}
                        />}
                        
                  </View>

                  <View style={styles.bottomButtonsView}>

                        <View style={[styles.entryMessageView, {alignSelf: 'flex-start', left: -10}]}>
                              <Text style={styles.entryMessageText}>
                                    {entryMessage}
                              </Text>
                        </View>

                        <TouchableOpacity onPress={() => {
                              
                              if (entryNotEntered.trim().length > 0) {
                                    thisList.push(entryNotEntered.trim());
                                    setEntryNotEntered("");
                                    setEntryMessage("");
                              } else {
                                    displayEntryMessage("Please enter text");
                              }
                              setChoiceMade(false);
                        }}>
                              <View style={styles.enterClearButton}>
                                    <Text style={styles.buttonText}>Enter</Text>
                              </View>
                        </TouchableOpacity>

                        <View style={styles.bottomMiddleRowButtonsView}>
                              <TouchableOpacity onPress={() => {
                                    if (thisList.length > 1) {
                                          randomChoice1X(thisList);
                                    } else {
                                          displayEntryMessage("Enter at least two choices to list");
                                    }
                                    
                              }}>
                                    <View style={styles.choiceButtons}>
                                          <Text style={styles.buttonText}>Choose x1</Text>
                                    </View>
                              </TouchableOpacity>

                              <TouchableOpacity style={{paddingHorizontal: 5}} onPress={() => {
                                    if (thisList.length > 1) {
                                          randomChoice10X(thisList);
                                    } else {
                                          displayEntryMessage("Enter at least two choices to list");
                                    }
                                    
                              }}>
                                    <View style={styles.choiceButtons}>
                                          <Text style={styles.buttonText}>Choose x10</Text>
                                    </View>
                              </TouchableOpacity>

                              <TouchableOpacity onPress={() => {
                                    if (thisList.length > 1) {
                                          setEnteringNumTimes(true);
                                    } else {
                                          displayEntryMessage("Enter at least two choices to list");
                                    }
                                    
                              }}>
                                    <View style={styles.choiceButtons}>
                                          <Text style={styles.buttonText}>Choose X</Text>
                                    </View>
                              </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => {
                              if (loading) {
                                    setLoading(false);
                                    
                              } else {
                                    setThisList([]);
                                    setModList([]);
                                    setChoiceMade(false);
                              }
                              setLoaded(false);

                        }}>
                              
                                    {loading ?
                                    <View style={styles.enterClearButton}>
                                          <Text style={styles.buttonText}>Cancel</Text>
                                    </View>
                                    :
                                    <View style={styles.enterClearButton}>
                                          <Text style={styles.buttonText}>Clear List</Text>
                                    </View>
                              }
                                    
                              
                        </TouchableOpacity>
                  </View>

                  {saveLoad ? (
                        <View style={styles.saveLoadChooseXBackground}>
                              <View style={styles.modalView}>
                                    {saving ? 
                                    (
                                          <TextInput style={styles.saveChooseXInput} 
                                          onChangeText={(text) => setListTitle(text)}
                                          placeholder="Enter title for list"
                                          placeholderTextColor='#bbb'
                                          />
                                    ) : 
                                    (
                                          <TouchableOpacity onPress={() => {
                                                if (titles.length > 0) {
                                                      setLoading(true);
                                                      setSaveLoad(false);
                                                } else {
                                                      setLoading(false);
                                                      setSaveLoad(false);
                                                      displayEntryMessage("No lists to load")
                                                }
                                          }} style={styles.loadSaveCancelButtons}>
                                                <Text style={styles.buttonText}>Load</Text>
                                          </TouchableOpacity>
                                    )}

                                    <View style={{height: 5}} />
                                    
                                    <TouchableOpacity onPress={() => {
                                          if (thisList.length > 1) {
                                                if (listTitle == "") {
                                                      setListTitle("No Title " + titles.length)
                                                }
                                                if (saving) {
                                                      saveList(listTitle, thisList);
                                                      setSaving(false);
                                                      setSaveLoad(false);
                                                } else {
                                                      setSaving(true);
                                                }
                                          } else {
                                                setSaving(false);
                                                setSaveLoad(false);
                                                displayEntryMessage("List must have at least two items.")
                                          }
                                          
                                          

                                    }} style={styles.loadSaveCancelButtons}>
                                          <Text style={styles.buttonText}>Save</Text>
                                    </TouchableOpacity>

                                    <View style={{height: 5}} />
                                    
                                    <TouchableOpacity onPress={() => {
                                          if (saving) {
                                                setSaving(false);
                                          } else {
                                                setSaveLoad(false);
                                          }
                                          
                                          setLoaded(false);
                                    }} style={styles.loadSaveCancelButtons}>
                                          <Text style={styles.buttonText}>Cancel</Text>
                                    </TouchableOpacity>
                              </View>
                        </View>
                  ) : (<View style={{height: 0, width: 0}}></View>)}

                  { enteringNumTimes ? (
                        <View style={styles.saveLoadChooseXBackground}>
                              <View style={styles.modalView}>
                                    <TextInput style={styles.saveChooseXInput} 
                                          onChangeText={(text) => setNumTimes(parseInt(text))}
                                          placeholder="Enter a number: 1 - 1,000,000"
                                          placeholderTextColor="#bbb"
                                          keyboardType="number-pad"
                                          returnKeyType="done"
                                          />
                                    <TouchableOpacity style={styles.chooseXDoneButton}
                                          onPress={() => {
                                                if (numTimes > 0 && numTimes <= 1000000) {
                                                      randomChoiceX(thisList, numTimes);
                                                      setChoiceMade(true);
                                                } else {
                                                      if (numTimes != 0) {
                                                            displayEntryMessage("Invalid entry. Enter a number: 1 - 1,000,000");
                                                      } else {
                                                            displayEntryMessage("No entry. Enter a number: 1 - 1,000,000")
                                                      }
                                                }
                                                
                                                setEnteringNumTimes(false);
                                                setNumTimes(0);
                                          }}
                                    >
                                          <Text style={styles.buttonText}>Done</Text>
                                    </TouchableOpacity>
                              </View>
                        </View>
                  
                  ) : (<View style={{height: 0, width: 0}}></View>)}
                        
                        <View style={styles.bottomAdView}>

                        </View>
            </SafeAreaView>
      );
}