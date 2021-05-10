import React from 'react';
import { Text, View, TouchableOpacity,StyleSheet } from 'react-native';
import * as Permissions from "expo-permissions";
import {BarCodeScanner} from "expo-barcode-scanner";

export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state={
      hasCameraPermissions:null,
      scanned:false,
      scannedData:"",
      buttonState:'normal',
    }
  }
  getCameraPermissions=async()=>{
    const {
      status
    }=
    await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermissions:status==="granted",
      buttonState:'clicked',
      scanned:false
    })
  }
  handleBarcodeScanned=async({type,data})=>{
    this.setState({
      scanned:true,
      scannedData:data,
      buttonState:"normal",
    })
  }
    render() {
      const hasCameraPermissions=this.state.hasCameraPermissions;
      const scanned=this.state.scanned;
      const buttonState=this.state.buttonState;
      if(buttonState==="clicked" && hasCameraPermissions){
        return(
          <BarCodeScanner onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned} 
          style={StyleSheet.absoluteFillObject}>
            
          </BarCodeScanner>
        )
      }
      else if(buttonState==='normal'){
      return (
        <View style={styles.container}>
          <Text style={styles.displaytText}>{hasCameraPermissions===true? this.state.scannedData:"request camera permission"}</Text>
          <TouchableOpacity onPress={
            this.getCameraPermissions
          } 
          style={styles.scanButton}>

            <Text style={styles.buttonText}>
              Scan QR code
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
  const styles= StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    displaytText:{
      fontSize:15,
      textDecorationLine:'underline'
    },
    scanButton:{
      backgroundColor:'cyan',
      padding:10,
      margin:10,
    }
  })