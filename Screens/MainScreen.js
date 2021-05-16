import { Dimensions, FlatList, Platform, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import * as React from 'react';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../styles'

export default function MainScreen() {
      const screenSize = Platform.OS === "web" ? Dimensions.get("window") : Dimensions.get("screen");

      var [entryNotEntered, setEntryNotEntered] = useState("");
      var [entryMessage, setEntryMessage] = useState("");
      const baseHeightUnit = screenSize.height / 25;

      const [lists, setLists] = useState([]);
      const [titles, setTitles] = useState([]);

      const [listTitle, setListTitle] = useState("");
      const [thisList, setThisList] = useState([]);

      const [modList, setModList] = useState([]);

      const [saveLoad, setSaveLoad] = useState(false);
      const [loading, setLoading] = useState(false);
      const [saving, setSaving] = useState(false);

      const [enteringNumTimes, setEnteringNumTimes] = useState(false);
      const [numTimes, setNumTimes] = useState(0);

      const [choiceMade, setChoiceMade] = useState(false);

      const renderList = ({item}) => {
            return (
                  <View style={styles.flatlistView}>
                        <Text style={styles.flatlistText}>
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

      function displayModifiedList (list, countArray, winnerArray) {
            var modifiedList = [];

            for (let x = 0; x < list.length; x++) {
                  modifiedList.push(list[x]);
            }

            for (let i = 0; i < list.length; i++) {
                  modifiedList[i] += (": " + countArray[i]);
            }

            for (let x = 0; x < winnerArray.length; x++) {
                  for (let i = 0; i < list.length; i++) {
                        if (list[i] == winnerArray[x]) {
                              modifiedList[i] += " ☆";
                        }
                  }
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
                        mostArray.push(list[i]);
                        if (countArray[i] > most) {
                              mostArray = [];
                              most = countArray[i];
                              mostArray.push(list[i]);
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
                        mostArray.push(list[i]);
                        if (countArray[i] > most) {
                              mostArray = [];
                              most = countArray[i];
                              mostArray.push(list[i]);
                        }
                        
                  }
            }

            displayModifiedList(list, countArray, mostArray);
            return mostArray;
      }

      function saveList (title, list) {
            var listArray = [];
            listArray.push(lists);
            listArray.push([list]);
            setLists(listArray);
            
            var titleArray = [];
            titleArray.push(titles);
            titleArray.push(title);
            setTitles(titleArray);

            storeLists(listArray);
            storeTitles(titleArray);
      }

      const storeLists = async (list) => {
            try {
                  const jsonValue = JSON.stringify(list)
                  await AsyncStorage.setItem('@lists', jsonValue)
            } catch (e) {
                  console.log(e);
            }
      }



      const storeTitles = async (title) => {
            try {
                  const jsonValue = JSON.stringify(title)
                  await AsyncStorage.setItem('@titles', jsonValue)
            } catch (e) {
                  console.log(e);
            }
      }

      

      useEffect (() => {
            const getTitles = async () => {
                  try {
                        const jsonValue = await AsyncStorage.getItem('@titles')
                        return jsonValue != null ? JSON.parse(jsonValue) : null;
                  } catch (e) {
                        console.log(e);
                  }
            }

            const getLists = async () => {
                  try {
                        const jsonValue = await AsyncStorage.getItem('@lists')
                        return jsonValue != null ? JSON.parse(jsonValue) : null;
                  } catch (e) {
                        console.log(e);
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
            <View style={styles.mainView}>
                  <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <TextInput 
                              placeholder="Enter text here" 
                              placeholderTextColor="#000"
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
                        {choiceMade ? <FlatList 
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
                        />}
                        
                  </View>

                  <View style={styles.entryMessageView}>
                        <Text style={styles.entryMessageText}>
                              {entryMessage}
                        </Text>
                  </View>

                  <View style={styles.bottomButtonsView}>
                        <TouchableOpacity onPress={() => {
                              
                              if (entryNotEntered.trim().length > 0) {
                                    thisList.push(entryNotEntered);
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
                              setThisList([]);
                              setModList([]);
                              setChoiceMade(false);
                        }}>
                              <View style={styles.enterClearButton}>
                                    <Text style={styles.buttonText}>Clear List</Text>
                              </View>
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
                                          />
                                    ) : 
                                    (
                                          <TouchableOpacity onPress={() => {
                                                setLoading(true);
                                          }} style={styles.loadSaveCancelButtons}>
                                                <Text style={styles.buttonText}>Load</Text>
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
                                          onChangeText={(text) => setNumTimes(text)}
                                          placeholder="Enter a number: 1 - 1,000,000"
                                          keyboardType="number-pad"
                                          returnKeyType="done"
                                          />
                                    <TouchableOpacity style={styles.chooseXDoneButton}
                                          onPress={() => {
                                                if (numTimes > 0 && numTimes <= 1000000) {
                                                      randomChoiceX(thisList, numTimes);
                                                } else {
                                                      if (numTimes != 0) {
                                                            displayEntryMessage("Invalid entry. Enter a number from range 1 - 1,000,000");
                                                      }
                                                }
                                                setEnteringNumTimes(false);
                                          }}
                                    >
                                          <Text style={styles.buttonText}>Done</Text>
                                    </TouchableOpacity>
                              </View>
                        </View>
                  
                  ) : (<View style={{height: 0, width: 0}}></View>)}

                  <View style={styles.bottomAdView}>

                  </View>
            </View>
      );
}