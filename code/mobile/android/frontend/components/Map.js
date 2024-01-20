import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'

export default function Map({ region }) {
    return (
        <MapView
        style={{ flex: 1 }}
        region={region}
        />
    )   
}

const styles = StyleSheet.create({})