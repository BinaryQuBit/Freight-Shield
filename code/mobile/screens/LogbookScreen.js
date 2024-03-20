import { ScrollView } from 'react-native'
import React from 'react'
// Custom Imports
import PastDaysLogBooks from '../components/logBook/pastDaysLogBooks'

export default function LogbookScreen() {
  return (
    <ScrollView>
      <PastDaysLogBooks/>
    </ScrollView>
  )
}