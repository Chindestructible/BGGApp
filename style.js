
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, ScrollView} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    height:"100%",
    backgroundColor: 'orange',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40
  },icon:{
    width:50,
    height:50
  },image:{
    width: 400,
    height: 400
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
  },gamePanel:{
   backgroundColor: 'lightgray',
    borderWidth: 3,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 3,
    margin: 5,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    font: '15px Arial, sans-serif',
    width: 400
  }, innerView:{
    width:"70%"
  }, game:{
     alignItems: 'center',
     justifyContent: 'space-between',
     flexDirection: 'column',
     flex: 2
  }
});

export default styles;