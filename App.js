import React, { useState } from 'react';
import { StyleSheet, Text, View, Slider, TouchableOpacity, } from 'react-native';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import HsvColorPicker from 'react-native-hsv-color-picker';
import chroma from 'chroma-js';
import { Draggable, Clock } from './app/components';
import { Constant } from './app/helper';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';


function useFonts(fontMap) {
  let [fontsLoaded, setFontsLoaded] = useState(false);
  (async () => {
    await Font.loadAsync(fontMap);
    setFontsLoaded(true);
  })();
  return [fontsLoaded];
}


export default function App() {

  let drawerLayout = null;


  const { minFontSize, maxFontSize, dateFontSizeRate } = Constant;
  const [fontSize, setFontSize] = useState(minFontSize);

  const [hue, setHue] = useState(0);
  const [sat, setSat] = useState(0);
  const [val, setVal] = useState(1);
  const _onSatValPickerChange = ({ saturation, value }) => {
    setSat(saturation);
    setVal(value);
  };
  const _onHuePickerChange = ({ hue }) => {
    setHue(hue);
  }

  const [drawerLockMode, setDrawerLockMode] = useState('unlocked');
  const renderDrawer = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <TouchableOpacity style={{ marginBottom: 100 }} onPress={() => { drawerLayout.closeDrawer(); }}><Text>Kapat</Text></TouchableOpacity>

        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          onValueChange={(k) => setFontSize(Math.round((k * maxFontSize) + minFontSize))}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#FFFFFF"
        />

        <HsvColorPicker
          huePickerHue={hue}
          onHuePickerDragMove={_onHuePickerChange}
          onHuePickerPress={_onHuePickerChange}
          satValPickerHue={hue}
          satValPickerSaturation={sat}
          satValPickerValue={val}
          onSatValPickerDragMove={_onSatValPickerChange}
          onSatValPickerPress={_onSatValPickerChange}
        />
      </View>
    );
  };

  // https://github.com/yuanfux/react-native-hsv-color-picker


  let [fontsLoaded] = useFonts({
    'regular': require('./assets/fonts/DS-DIGI.ttf'),
    'bold': require('./assets/fonts/DS-DIGIB.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return (
      <DrawerLayout
        ref={(ref) => drawerLayout = ref}
        drawerWidth={300}
        drawerPosition={DrawerLayout.positions.Right}
        drawerType='slide'
        drawerBackgroundColor="#ddd"
        drawerLockMode={drawerLockMode}
        onDrawerStateChanged={(newState, drawerWillShow) => {
          if (drawerWillShow)
            setDrawerLockMode('locked-open');
          else
            setDrawerLockMode('unlocked');
        }}
        renderNavigationView={renderDrawer}>
        <View style={styles.container}>


          <Draggable>
            <Clock
              time={{ fontSize: fontSize, color: chroma.hsv(hue, sat, val).hex() }}
              date={{ fontSize: fontSize * dateFontSizeRate, color: chroma.hsv(hue, sat, val).hex() }}
            />
          </Draggable>

        </View>
      </DrawerLayout>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
