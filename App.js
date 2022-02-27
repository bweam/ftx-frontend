import { StatusBar } from 'expo-status-bar';
import { React, useCallback, useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button,SafeAreaView, Pressable, ActivityIndicator, FlatList } from 'react-native';

export default function App(){

  const URL = 'https://ftx-heroku.herokuapp.com/trades';
  const rblURL = 'https://ftx-heroku.herokuapp.com/rebalance';
  const openOrderUrl = 'https://ftx-heroku.herokuapp.com/tryRebalance';

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(async () => {
    await fetch(URL)
    .then((re) => re.json())
    .then((re) => setData(re)) //0th position's trade
    .catch((error) => alert(error));
  }, []);

  const handlePress = async () => {
    console.log(data)
  };

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleRebalance = async () => {
    await fetch(rblURL)
    .then((re) => re.json())
    .then((re) => {
      alert(re.log);
      console.log(re.log);
    })
    .catch((error) => alert(error));

    await sleep(10000);

    await fetch(openOrderUrl)
    .then((re) => re.json())
    .then((re) => {
      if(re.log != "") {
        alert(re.log);
        console.log(re.log);
      }
    })
    .catch((error) => alert(error));
  }

  // const id = data.wallet;

  return (
    <SafeAreaView style={styles.container}>

      <Text> Get Wallet </Text>
      <Pressable style={styles.button} onPress={() => handlePress()}>
        <Text style={styles.text}>click me</Text>
      </Pressable>

      <Text> Rebalance </Text>
      <Pressable style={styles.button} onPress={() => handleRebalance()}>
        <Text style={styles.text}>click me</Text>
      </Pressable>

      <StatusBar style="auto" />

      {/* <Text>id = {id}</Text> */}

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
