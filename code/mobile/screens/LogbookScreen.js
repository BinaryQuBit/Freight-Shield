// React Import
import { ScrollView } from "react-native";
import React from "react";

// Custom Import
import PastDaysLogBooks from "../components/logBook/pastDaysLogBooks";

// Start of the Build
export default function LogbookScreen() {
  return (
    <ScrollView>
      <PastDaysLogBooks />
    </ScrollView>
  );
}
