import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Axios from 'axios'
import { useFocusEffect } from '@react-navigation/native';


interface FrindType {
    _id: string
    name: string;
    age: number;
    __v?: Number;
}
  
type RootStackParamList = {
    Details: {
      id: string
    }
}

type Props = NativeStackScreenProps<RootStackParamList>;

const Home = ({navigation} : Props) => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [listOfFriends, setListOfFriends] = useState<FrindType[]>([]);

    useFocusEffect(() => {
      Axios.get('http://10.0.2.2:3001/read')
      .then((res) => {
        setListOfFriends(res.data);
      }).catch((err) => {
        console.log(err);
      })   
    })
  
    const addFriend = () => {
      Axios.post('http://10.0.2.2:3001/addfriend', {
        name, age
      })
      .then((res) => {
        setListOfFriends([...listOfFriends, { _id: res.data._id, name, age}])
      }).catch((err) => {
        console.log(err);
      })
      setName('')
      setAge(0)
    }
  
    const deleteFriend = (id: string) => {
      Axios.delete(`http://10.0.2.2:3001/delete/${id}`)
      .then(() => {
        setListOfFriends(listOfFriends.filter((val: any) => {
          return val._id !== id;
        }))
      })
    }
  
    return (
      <View>
        <Button 
          title="Test"
          onPress={() => setName('')}
        />
        <TextInput 
          placeholder="Friend name..."
          value={name}
          onChangeText={(e) => {setName(e)}}
        />
        <TextInput 
          keyboardType="numeric"
          placeholder="Friend age..."
          value={age.toString()}
          onChangeText={(e) => {setAge(parseInt(e))}}
        />
        <Button 
          title="Add Friend"
          onPress={addFriend}
        />
        <View >
          {listOfFriends.map((val : FrindType, key: number) => {
            return (
              <View key={key}>
                <Text>Name: {val.name}</Text>
                <Text>Age: {val.age}</Text>
                <Button 
                  title="Delete Friend"
                  onPress={() => { deleteFriend(val._id) }}
                />
                <Button 
                  title="Update"
                  onPress={() => navigation.navigate("Details", { id: val._id})}
                />
              </View>
            )
          })}
        </View>
      </View>
    )
}

export default Home

const styles = StyleSheet.create({})
