import React, { Component } from "react";
import {View, Text, StyleSheet,TouchableOpacity,ScrollView,Image, AppRegistry} from "react-native";

import "../styling/footer.css";
class footer extends React.Component {

render(){
    return{
        <View style={ styles.bottomView} >
 
                  <Text style={styles.textStyle}>This is Bottom View.</Text>
 
               </View>
    }
}

    
}
const styles=StyleSheet.create({
   footer:{
    position: fixed,
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor:'#000',
    color: white,
    alignItems: center,
   },
    textStyle:{
 
    color: '#fff',
    fontSize:22
  }
});
export default footer
