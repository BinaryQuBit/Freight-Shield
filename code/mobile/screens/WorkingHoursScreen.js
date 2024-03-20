import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { VictoryPie } from 'victory-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function LoadWorking() {
  const data = [
    { x: "OFF", y: 720 },
    { x: "SB", y: 360 },
    { x: "D", y: 360 },
    { x: "ON", y: 480 },
  ];

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.title}>Working Hours</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <VictoryPie
          data={data}
          colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
          radius={({ datum }) => (datum.y > 90 ? 160 : 160)}
          innerRadius={50}
          labelRadius={({ innerRadius }) => (innerRadius + 5)}
          style={{ labels: { fontSize: 20, fill: "white" } }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 26,
    fontFamily: "Lora-SemiBold",
    color: "#0866FF",
    marginBottom: 20,
  },
});

// import React, { useState, useEffect } from 'react';
// import { View } from 'react-native';
// import { VictoryPie } from 'victory-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import axios from 'axios';

// export default function LoadWorking() {
//   const [data, setData] = useState([]);
//   const backend = process.env.REACT_IP_CONFIG

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${backend}/api/workinghrs`);
//       const logbookData = response.data;
  
//       // Process the data to calculate the differences between end and start values
//       const processedData = logbookData.map(entry => {
//         // Initialize an empty array to store processed data for each entry
//         const processedEntryData = [];
  
//         // Iterate over the status entries in the entry.status object
//         for (const status in entry.status) {
//           // Iterate over each start-end pair in the status array
//           for (const { start, end } of entry.status[status]) {
//             // Calculate the difference between end and start and add it to the processed data array
//             processedEntryData.push({ x: status, y: parseInt(end) - parseInt(start) });
//           }
//         }
  
//         return processedEntryData;
//       });
  
//       // Flatten the processed data array
//       const flattenedData = processedData.flat();
  
//       // Set the flattened data in the state
//       setData(flattenedData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
  