// React Imports
import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

// Pi Chart Import
import { VictoryPie } from "victory-native";

// Custom Import
import { useTheme } from "../components/themeContext.js";

// Start of the Build
export default function WorkingHoursScreen() {
  const { isDarkMode } = useTheme();
  const route = useRoute();
  const weekHours = route.params.weekHours;
  const styles = getDynamicStyles(isDarkMode);

  // Data
  const data = weekHours
    ? Object.keys(weekHours).map((status) => ({
        x: status,
        y: weekHours[status],
      }))
    : [];

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      style={styles.scrollView}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Weekly Working Hours</Text>
        <VictoryPie
          data={data}
          colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
          radius={({ datum }) => (datum.y > 0 ? 160 : 160)}
          innerRadius={50}
          labelRadius={({ innerRadius }) => innerRadius + 40}
          style={{ labels: { fontSize: 12, fill: "white" } }}
          labels={({ datum }) =>
            datum.y > 0 ? `${datum.x}: ${datum.y} hrs` : ""
          }
          padding={{ top: 50, bottom: 50, left: 50, right: 50 }}
        />
      </View>
    </ScrollView>
  );
}

// Style sheet dark mode
const getDynamicStyles = (isDarkMode) =>
  StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: isDarkMode ? "#222" : "#FFF",
    },
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    container: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDarkMode ? "#222" : "#FFF",
      flex: 1,
    },
    title: {
      fontSize: 26,
      fontFamily: "Lora-SemiBold",
      marginBottom: 20,
      color: isDarkMode ? "white" : "#0866FF",
    },
  });
