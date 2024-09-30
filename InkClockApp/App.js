import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

import Config from 'react-native-config';


const authorization='Bearer '+Config.API_KEY

const quotes = [
  "生命不息,奋斗不止。 - 雷锋",
  "路漫漫其修远兮,吾将上下而求索。 - 屈原",
  "天行健,君子以自强不息。 - 《周易》",
  "不以物喜,不以己悲。 - 范仲淹",
  "业精于勤,荒于嬉;行成于思,毁于随。 - 韩愈"
];

const backgrounds = [
  require('./assets/splash.png'),
];

// 存储数据
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Data stored successfully');
  } catch (e) {
    console.error('Failed to save the data to the storage', e);
  }
};

// 读取数据
const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('Data retrieved successfully:', value);
      return value;
    }
  } catch (e) {
    console.error('Failed to fetch the data from storage', e);
  }
  return null;
};

export default function App() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [quote, setQuote] = useState('');
  const [bgIndex, setBgIndex] = useState(0);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const [bgImg,setBgImg]= useState(null);

  useEffect(() => {
    loadFonts();
    updateDateTime();
    // getRandomQuote()
    // changeBackground()

    // 示例：读取字符串
    getData('bgImg').then((value) => {
      console.log('Retrieved value:', value);
      setBgImg({uri:value})
    });
    getData('quote').then((value) => {
      console.log('Retrieved value:', value);
      setQuote(value)
    });

    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      'ink-free': require('./assets/fonts/摄图摩登小方体.ttf'),
    });
    setFontsLoaded(true);
  };

  const updateDateTime = () => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }));
    setCurrentDate(now.toLocaleDateString('zh-CN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  };

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  const createText=async t=>{
    try {
      const options = {
        method: 'POST',
        headers: { Authorization: authorization, 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {"model":"Qwen/Qwen2.5-7B-Instruct",
          "messages":[{"role":"user","content":t}],
          "stream":false,"max_tokens":1012,
          "stop":["<string>"],
          "temperature":0.7,
          "response_format":{"type":"json_object"}
        }
        )
      };
  
      const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', options);
      const data = await response.json();
      console.log(data)
      if (data && data.choices && data.choices.length > 0) {
          let text = data.choices[0].message.content;
          return text
      }
    } catch (error) {
      console.log(error)
    }
    return "{}"
  }
  
  const getRandomQuote = async() => {
    let text = quotes[Math.floor(Math.random() * quotes.length)];
    let en=""
    let prompt = `根据示例：${text}，写出1条新的名言名句给我，中英文双语，不需要解释,英文用于创建图像需要详细的描述，输出格式:{zh:"中文",en:"英文"}`;

        let res=await createText(prompt)
        console.log(res);
        res= JSON.parse(res)
        text=res.zh;
        en=res.en;
    setQuote(text);
    storeData('quote', text);
    return en
  };



  const changeBackground =async () => {
    // setBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    
    let text=await getRandomQuote()
    await sleep(2000)
    // let text=await createText(`${t},写一句英文的封面图文字描述，20字以内`)
    // console.log(text)
    // await sleep(2000)
    const options = {
      method: 'POST',
      headers: {
          Authorization: authorization, 
      'Content-Type': 'application/json'},
      body: `{"model":"black-forest-labs/FLUX.1-schnell","prompt":"${text||"rainbow"}","image_size":"576x1024"}`
    };
    
    fetch('https://api.siliconflow.cn/v1/image/generations', options)
      .then(response => response.json())
      .then(response => {
          try {
              let imgurl=response.images[0].url
              console.log(imgurl)
              setBgImg({uri:imgurl})
              storeData('bgImg', imgurl);
          } catch (error) {
            console.log(error)
          }
      })
      .catch(err => console.error(err));

  };

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }
 
  return (
    <ImageBackground
      source={bgImg||backgrounds[bgIndex]}
      style={styles.container}
      // blurRadius={2}
    >
      <StatusBar hidden={true} />
      <View style={styles.overlay}>
      <TouchableOpacity onPress={changeBackground}>
        <Text style={styles.time}>{currentTime}</Text>
        <Text style={styles.date}>{currentDate}</Text>
        
          <Text style={styles.quote}>{quote}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'start',
    justifyContent: 'start',
  },
  overlay: {
    // backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 20,
    borderRadius: 10,
    width:'70%',
    marginTop:48,
  
  },
  time: {
    fontFamily: 'ink-free',
    fontSize: 60,
    color: '#fff',
    textAlign: 'left',
    textShadowColor: '#585858', // 阴影颜色
    textShadowOffset: { width: 1, height: 1 }, // 阴影偏移
    textShadowRadius: 1, // 阴影模糊半径
  },
  date: {
    fontFamily: 'ink-free',
    fontSize: 18,
    color: '#fff',
    textAlign: 'left',
    marginTop: 10,
    textShadowColor: '#585858', // 阴影颜色
    textShadowOffset: { width: 1, height: 1 }, // 阴影偏移
    textShadowRadius: 1, // 阴影模糊半径
  },
  quote: {
    fontFamily: 'ink-free',
    fontSize: 18,
    color: '#fff',
    textAlign: 'left',
    marginTop: 20,
    fontStyle: 'italic',
    textShadowColor: '#585858', // 阴影颜色
    textShadowOffset: { width: 1, height: 1 }, // 阴影偏移
    textShadowRadius: 1, // 阴影模糊半径
  },
});