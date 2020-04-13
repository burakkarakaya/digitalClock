import React from 'react';
import { Animated } from 'react-native';
import { State, PanGestureHandler } from 'react-native-gesture-handler';

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

export { Draggable };