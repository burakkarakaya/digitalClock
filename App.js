import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Animated, Slider, TouchableOpacity } from 'react-native';
import { PinchGestureHandler, State, PanGestureHandler } from 'react-native-gesture-handler';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import HsvColorPicker from 'react-native-hsv-color-picker';
import chroma from 'chroma-js';

function Draggable(props) {

  let _touchX = new Animated.Value(0),
    _touchY = new Animated.Value(0),
    _lastTouchX = 0,
    _lastTouchY = 0,
    _onPanGestureEvent = Animated.event([{ nativeEvent: { translationX: _touchX, translationY: _touchY } }], { useNativeDriver: true }),
    _PanHandlerStateChange = event => {
      if (event.nativeEvent.oldState === State.ACTIVE) {

        _lastTouchX += event.nativeEvent.translationX;
        _lastTouchY += event.nativeEvent.translationY;

        _touchX.setOffset(_lastTouchX);
        _touchX.setValue(0);

        _touchY.setOffset(_lastTouchY);
        _touchY.setValue(0);

      }
    };

  return (
    <PanGestureHandler
      onGestureEvent={_onPanGestureEvent}
      onHandlerStateChange={_PanHandlerStateChange}
    >
      <Animated.View style={{ transform: [{ translateX: _touchX }, { translateY: _touchY }] }}>
        {props.children}
      </Animated.View>

    </PanGestureHandler>
  );
}


function Clock(props) {

  const _getTime = () => {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";

    if (h == 0) {
      h = 12;
    }

    if (h > 12) {
      h = h - 12;
      session = "PM";
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    return h + ":" + m + ":" + s + " " + session;
  };

  const [time, setTime] = useState(_getTime());

  useEffect(() => {
    const stm = setInterval(function () {
      setTime(_getTime());
    }, 1000);

    return () => {
      clearInterval(stm);
    }
  });



  // https://medium.com/@ysfzrn/react-native-panresponder-%C3%B6rne%C4%9Fi-ef00702d0758
  // https://github.com/software-mansion/react-native-gesture-handler/issues/110  ( offset sorunu )
  // https://stackoverflow.com/questions/57600291/how-do-i-set-the-initial-offset-in-a-pangesturehandler-from-react-native-gesture
  // https://software-mansion.github.io/react-native-gesture-handler/docs/handler-rotation.html

  /*const [_touchX, setTouchX] = useState(new Animated.Value(0));
  const [_touchY, setTouchY] = useState(new Animated.Value(0));
  const _onPanGestureEvent = Animated.event([{ nativeEvent: { translationX: _touchX, translationY: _touchY } }], {
    useNativeDriver: true, listener: event => {
      setTouchX(event.nativeEvent.translationX);
      setTouchY(event.nativeEvent.translationY);

      console.log( event.nativeEvent.translationX, event.nativeEvent.translationY )
    }
  });*/

  return <Text style={[styles.clock, props.style]}>{time}</Text>;


  let _touchX = new Animated.Value(0),
    _touchY = new Animated.Value(0),
    _lastTouchX = 0,
    _lastTouchY = 0,
    _onPanGestureEvent = Animated.event([{ nativeEvent: { translationX: _touchX, translationY: _touchY } }], { useNativeDriver: true }),
    _PanHandlerStateChange = event => {
      if (event.nativeEvent.oldState === State.ACTIVE) {

        _lastTouchX += event.nativeEvent.translationX;
        _lastTouchY += event.nativeEvent.translationY;

        _touchX.setOffset(_lastTouchX);
        _touchX.setValue(0);

        _touchY.setOffset(_lastTouchY);
        _touchY.setValue(0);


      }
    };


  return (

    <PanGestureHandler
      onGestureEvent={_onPanGestureEvent}
      onHandlerStateChange={_PanHandlerStateChange}
    >
      <Animated.View style={{ transform: [{ translateX: _touchX }, { translateY: _touchY }] }}>
        <Text style={[styles.clock, props.style]}>{time}</Text>
      </Animated.View>

    </PanGestureHandler>
  )


  scale = new Animated.Value(1)

  onZoomEvent = Animated.event(
    [
      {
        nativeEvent: { scale: this.scale }
      }
    ],
    {
      useNativeDriver: false
    }
  )

  onZoomStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(this.scale, {
        toValue: 1,
        useNativeDriver: false
      }).start()
    }
  }

  const fontSize = this.scale.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 50],
  });


  return (
    <PinchGestureHandler
      onGestureEvent={this.onZoomEvent}
      onHandlerStateChange={this.onZoomStateChange}>
      <Animated.Text style={[styles.clock, { fontSize: fontSize }]}>{time}</Animated.Text>
    </PinchGestureHandler>

  )
}

export default function App() {

  let drawerLayout = null;

  const minFontSize = 20;
  const maxFontSize = 70 - minFontSize;
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


      <Draggable><Clock style={{ fontSize: fontSize, color: chroma.hsv(hue, sat, val).hex() /*hslToRgb(hue, sat, val)*/ }} /></Draggable>

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
  },
  clock: {
    color: '#FFFFFF',
    fontSize: 15
  }
});
