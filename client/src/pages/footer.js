import React, { Component } from "react";
import {View, StyleSheet,Button,ScrollView,Image, AppRegistry} from "semantic-ui-react";

import "../styling/footer.css";
class footer extends React.Component {

render(){
    return{
        <View style={styles.footer} >
 
          <div>
            <Button variant="member" size="lg" block onClick={()=> React.router(members)}>
             Memberpage
            </Button>
            <Button variant="lifecoach" size="lg" block onClick={()=> React.router(lifeCoaches)}>
             Lifecoachpage
            </Button>
            <Button variant="vacancies" size="lg" block onClick={()=> React.router(vacancies)}>
             Vacanciespage
            </Button>
          </div>;    
 
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
   
});
export default footer
