import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Octicons, Feather } from '@expo/vector-icons'; 
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const ROOT_URI = "https://www.boardgamegeek.com/xmlapi2/"

export default function App(){

  const Tap = createBottomTabNavigator();

  return (
    <NavigationContainer>
       <Tap.Navigator>
         <Tap.Screen options={{
          tabBarLabel: 'Collection',
          tabBarIcon: ({ color, size }) => (
            <Feather name="calendar" color={color} size={size} />
          ),
        }} name = {"Collection"} component={Collection} />
       </Tap.Navigator>
    </NavigationContainer>
  )
}

/* Component for the Collection screen */
function Collection(){
  const [collection, setCollection] = useState([]);

  const onPress = (username) =>{
    getCollection(username)
  }

  const getCollection = async(username)=>{
    const response = await fetch(ROOT_URI + "collection?username=" + username).catch(err => console.log(err))
    var tempArray = [];
    response.map((item) => {[...tempArray, item]})
    setCollection(tempArray)
    console.log(collection)

    //const result =  await response.json().catch(err => console.log(err));
    //console.log(result)

  }

  return(
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.innerView}>
        <AddPanel onPress = {onPress} />
        <Text> {collection.length} </Text>
      </KeyboardAvoidingView>
    </View>
    )
}

 //Contains the elements to add a username, a text input and a button
function AddPanel(props){
   
  const [username, setUsername] = useState("")

  let getText = (event)=>{
    setUsername(event.target.value)
  }

  return(
   <View style={styles.main}>
      <TextInput style = {styles.input} type={"text"} name={"city_text"} placeholder={"BGG Username"} id={"city_text"} onChange={getText} value={username}/>
      <TouchableOpacity
       style = {styles.button}
        href={"#" }
        onPress={
          ()=>{
            props.onPress(username)
          }
        }
      >
      <FontAwesomeIcon icon={faPlus} />
      </TouchableOpacity>
  </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    height:"100%",
    backgroundColor: '#EAEAEA',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40
  },icon:{
    width:20,
    height:20
  },addPanel:{
        marginBottom: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 2
  },button: {
    alignItems: "center",
    backgroundColor: "#EAEAEA",
  },input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 2,
    padding: 3,
    margin: 5,
  },cityPanel:{
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 3,
    margin: 5,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300
  }, innerView:{
    width:"70%",
    alignItems: 'center'
  }, currentWeather:{
    navigationOptions: {
        tabBarIcon: (tabInfo) => {
        return (
          <Feather
            name="calendar"
            size={24}
            color={tabInfo.focused ? "#006600" : "#8e8e93"}
          />
        )}
    }
  }
});