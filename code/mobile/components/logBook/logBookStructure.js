// React Import
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

// Start of the Build
export default function LogBookStructure({ fetchedLogbook }) {
  // Constants
  const minutes = 1440;
  const hrs = 24;
  const labels = ["OFF", "SB", "D", "ON"];
  const numbers = Array.from({ length: 24 }, (_, i) => i);
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth - 50;
  const cellWidth = containerWidth / hrs;
  const rowHeight = cellWidth;

  // Function for Horizontal Lines
  const renderLines = (label) => {
    return (fetchedLogbook[label] || []).map((time, index) => {
      const startTime = parseInt(time.start);
      const endTime = parseInt(time.end);
      const width = ((endTime - startTime) / minutes) * containerWidth;
      return (
        <View
          key={`${label}-${index}`}
          style={[
            styles[`horizontalLine${label}`],
            {
              left: 20 + (containerWidth / minutes) * startTime,
              width: Math.max(0, width),
            },
          ]}
        ></View>
      );
    });
  };

  // Function to calculate total hours from times array
  const calculateTotalHoursDecimal = (times) => {
    const totalMinutes = times.reduce((acc, time) => {
      const startTime = parseInt(time.start);
      const endTime = parseInt(time.end);
      return acc + (endTime - startTime);
    }, 0);
    return (totalMinutes / 60).toFixed(2);
  };

  // Function to Render Vertical Lines
  const renderVerticalLines = () => {
    let lines = [];
    labels.forEach((label, labelIndex) => {
      const startY = labelIndex * rowHeight;
      (fetchedLogbook[label] || []).forEach((time) => {
        const timeEnd = parseInt(time.end);
        labels.forEach((innerLabel, innerLabelIndex) => {
          const endY = innerLabelIndex * rowHeight;
          if (innerLabel !== label) {
            (fetchedLogbook[innerLabel] || []).forEach((innerTime) => {
              const innerTimeStart = parseInt(innerTime.start);
              if (timeEnd === innerTimeStart) {
                const leftPosition = 20 + (containerWidth / minutes) * timeEnd;
                const lineHeight = Math.abs(endY - startY);
                lines.push(
                  <View
                    key={`${label}-${innerLabel}-${timeEnd}`}
                    style={[
                      styles.verticalLine,
                      {
                        left: leftPosition,
                        height: lineHeight,
                        top: Math.min(startY, endY),
                      },
                    ]}
                  ></View>
                );
              }
            });
          }
        });
      });
    });
    return lines;
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {renderVerticalLines()}
        <View style={[styles.row, { paddingLeft: cellWidth }]}>
          {numbers.map((number) => (
            <View
              key={number}
              style={{
                width: cellWidth,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.cellText}>{number}</Text>
            </View>
          ))}
          <View
            style={{
              width: cellWidth,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.cellText}>24</Text>
          </View>
        </View>
        {labels.map((label) => (
          <View key={label} style={styles.row}>
            {renderLines(label)}
            <Text style={[styles.cellText, styles.labelText]}>{label}</Text>
            {numbers.map((number) => (
              <View
                key={`${label}-${number}`}
                style={[styles.cell, { width: cellWidth, height: cellWidth }]}
              >
                <View style={styles.lineContainer}>
                  <View style={[styles.line, styles.centerLine]}></View>
                  <View style={[styles.line, styles.leftLine]}></View>
                  <View style={[styles.line, styles.rightLine]}></View>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
      <View>
        <Text>
          {labels.map((label) => (
            <Text key={label} style={styles.labelTexts}>
              {label}: {calculateTotalHoursDecimal(fetchedLogbook[label] || [])}{" "}
              hrs{" "}
            </Text>
          ))}
          <Text style={styles.labelTexts}>
            Total:{" "}
            {labels
              .reduce(
                (total, label) =>
                  total +
                  parseFloat(
                    calculateTotalHoursDecimal(fetchedLogbook[label] || [])
                  ),
                0
              )
              .toFixed(2)}{" "}
            hrs
          </Text>
        </Text>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    paddingBottom: 20,
  },
  grid: {
    flexDirection: "column",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  cell: {
    borderWidth: 0.2,
    borderColor: "grey",
  },
  labelText: {
    width: 20,
  },
  labelTexts: {
    fontFamily: "Lora-SemiBold",
    fontSize: 9,
    color: "grey",
    justifyContent: "space-between",
  },
  cellText: {
    textAlign: "center",
    fontSize: 8,
  },
  lineContainer: {
    height: "100%",
  },
  line: {
    position: "absolute",
    left: "50%",
    bottom: 0,
    borderWidth: 0.2,
    borderColor: "grey",
  },
  centerLine: {
    height: "50%",
  },
  leftLine: {
    left: "25%",
    height: "25%",
  },
  rightLine: {
    left: "75%",
    height: "25%",
  },
  horizontalLineOFF: {
    position: "absolute",
    height: 1,
    backgroundColor: "#0866FF",
  },
  horizontalLineSB: {
    position: "absolute",
    height: 1,
    backgroundColor: "#0866FF",
  },
  horizontalLineD: {
    position: "absolute",
    height: 1,
    backgroundColor: "#0866FF",
  },
  horizontalLineON: {
    position: "absolute",
    height: 1,
    backgroundColor: "#0866FF",
  },
  verticalLine: {
    position: "absolute",
    width: 1,
    backgroundColor: "#0866FF",
    transform: [{ translateY: 17 }],
  },
});
