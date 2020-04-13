import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import { Constant } from '../helper';

const _width = Dimensions.get('window').width;

function Clock(props) {

    const _months = ["ocak", "şubat", "mart", "nisan", "mayıs", "haziran", "temmuz", "ağustos", "eylül", "ekim", "kasım", "aralık"];

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


        // tarih
        //const months = _months[date.getMonth()],
        const months = date.getMonth(),
            year = date.getFullYear(),
            day = date.getDate();

        return {
            clock: h + ":" + m + ":" + s,
            date: day + '.' + (months < 10 ? ('0' + months) : months ) + '.' + year
        };
    };


    const [time, setTime] = useState(_getTime());

    useEffect(() => {
        const stm = setInterval(function () {
            setTime(_getTime());
        }, 1000);

        return () => {
            clearInterval(stm);
        }
    }, []);

    return (
        <View style={{ alignItems: 'center', width: _width }}>
            <Text style={[styles.time, props.time]}>{time.clock}</Text>
            <Text style={[styles.date, props.date]}>{time.date}</Text>
        </View>
    );
}

export { Clock };

const styles = StyleSheet.create({
    time: {
        color: '#FFFFFF',
        fontSize: Constant.minFontSize,
        fontWeight: 'bold',
        fontFamily: 'bold'
    },
    date: {
        color: '#FFFFFF',
        fontSize: Constant.minFontSize * Constant.dateFontSizeRate,
        fontFamily: 'regular'
    }
});