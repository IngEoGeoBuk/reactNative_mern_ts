import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Axios from 'axios'


type RootStackParamList = {
    Home: undefined,
    Details: {
      id: string
    }
}

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const Details = ({ navigation, route } : Props ) => {
    const [id, setId] = useState<string>("")
    const [name, setName] = useState<string>("");
    const [age, setAge] = useState<string>("");
  
    useEffect(() => {
      const { id } = route.params;
      setId(id)
      Axios.get(`http://10.0.2.2:3001/readOne/${id}`)
      .then((res) => {
        setName(res.data[0].name)
        setAge(res.data[0].age)
      }).catch((err) => {
        console.log(err);
      })   
    }, [])
    
    const updateFriend = () => {
      Axios.put('http://10.0.2.2:3001/update', {name, age, id})
      .then((res) => { 
        navigation.navigate("Home")
      }).catch((err) => {
        console.log(err)
      })
    }
    
  
    return (
      <View>
        <TextInput 
          placeholder="Friend name..."
          value={name}
          onChangeText={(e) => {setName(e)}}
        />
        <TextInput 
          keyboardType="numeric"
          placeholder="Friend age..."
          value={age.toString()}
          onChangeText={(e) => {setAge(e)}}
        />
        <Button 
          title="Update Friend"
          onPress={updateFriend}
        />
      </View>
    )
}

export default Details