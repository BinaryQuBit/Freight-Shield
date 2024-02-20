import React, { useState } from 'react';
import { Alert ,View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
//import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const activities = ["OFF-DUTY", "SLEEPER BERTH", "DRIVING", "ON-DUTY NOT DRIVING"];

const CheckBox = ({ isSelected, onPress }) => (
    <TouchableOpacity
        style={[styles.checkBox, isSelected && styles.checkBoxSelected]}
        onPress={onPress}>
        {isSelected && <View style={styles.checkMark} />}
    </TouchableOpacity>
  );

const LogBookForm = () => {
    const currentDate = new Date();
    const navigation = useNavigation();
    
    const [logBook, setLogBook] = useState(Array.from({ length: 24 }, () => 'OFF-DUTY'));
    const [totals, setTotals] = useState({
        "OFF-DUTY": 24,
        "SLEEPER BERTH": 0,
        "DRIVING": 0,
        "ON-DUTY NOT DRIVING": 0,
    });

    const [formValues, setFormValues] = useState({
        startOdometer: '',
        endOdometer: '',
        totalDistance: '',
        date: currentDate,
        truckNumber: '',
        trailerNumber: '',
        driverFirstName: '',
        driverLastName: '',
        coDriverFullName: '',
    });

    const handleSubmit = async () => {
        try {
            const activityHours = {
                offDutyHours: totals["OFF-DUTY"],
                sleeperHours: totals["SLEEPER BERTH"],
                drivingHours: totals["DRIVING"],
                onDutyNotDrivingHours: totals["ON-DUTY NOT DRIVING"],
            };

            const submissionData = {
                startingOdometer: parseInt(formValues.startOdometer),
                endingOdometer: parseInt(formValues.endOdometer),
                totalDistanceDrivenToday: parseInt(formValues.totalDistance),
                date: formValues.date.toISOString(),
                truckNumber: formValues.truckNumber,
                trailerNumber: formValues.trailerNumber,
                driverFirstName: formValues.driverFirstName,
                driverLastName: formValues.driverLastName,
                coDriverFullName: formValues.coDriverFullName,
                ...activityHours,
            };

            const response = await axios.post("http://142.3.84.67:8080/api/users/createlogbook", submissionData);

            if (response.status === 201) {
                Alert.alert("LogBook Submission Successful", "Your logbook has been saved.");
                navigation.navigate('Drawer', { screen: 'LogBook' });
                //navigation.navigate('Drawer', { screen: 'Home'
            }
        } catch (error) {
            console.error("LogBook Submission Failed", error);
            Alert.alert("LogBook Submission Failed", "Please check your details and try again.");
        }
    };

    const handleActivityChange = (hour, activity) => {
        const updatedLogBook = [...logBook];
        const oldActivity = updatedLogBook[hour];
        updatedLogBook[hour] = activity;

        // Update the totals
        const updatedTotals = { ...totals };
        updatedTotals[oldActivity]--;
        updatedTotals[activity]++;
        setTotals(updatedTotals);

        setLogBook(updatedLogBook);
    };

    const handleInputChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };


    return (
        <ScrollView style={styles.formContainer}>
            {/* Date Display */}
            <View style={styles.dateDisplay}>
                <Text style={styles.dateText}>Date: {formValues.date.toDateString()}</Text>
            </View>
            
            {/* Odometer Inputs and Total Distance */}
            <View style={styles.inputRow}>
                <View style={styles.odometerContainer}>
                <TextInput
                    style={[styles.input, styles.odometerInput]}
                    placeholder="Starting Odometer"
                    keyboardType="numeric"
                    value={formValues.startOdometer}
                    onChangeText={(text) => handleInputChange('startOdometer', text)}
                />
                <TextInput
                    style={[styles.input, styles.odometerInput]}
                    placeholder="Ending Odometer"
                    keyboardType="numeric"
                    value={formValues.endOdometer}
                    onChangeText={(text) => handleInputChange('endOdometer', text)}
                />
                </View>
                <TextInput
                style={[styles.input, styles.totalDistanceInput]}
                placeholder="Total Distance"
                keyboardType="numeric"
                value={formValues.totalDistance}
                onChangeText={(text) => handleInputChange('totalDistance', text)}
                />
            </View>

            {/* Truck and Driver Details */}
            <TextInput
                style={styles.input}
                placeholder="Truck Number"
                value={formValues.truckNumber}
                onChangeText={(text) => handleInputChange('truckNumber', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Trailer Number"
                value={formValues.trailerNumber}
                onChangeText={(text) => handleInputChange('trailerNumber', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Driver's First Name"
                value={formValues.driverFirstName}
                onChangeText={(text) => handleInputChange('driverFirstName', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Driver's Last Name"
                value={formValues.driverLastName}
                onChangeText={(text) => handleInputChange('driverLastName', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Co-Driver's Full Name"
                value={formValues.coDriverFullName}
                onChangeText={(text) => handleInputChange('coDriverFullName', text)}
            />

            

            {/* Heading for Hours and Activity Selection */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>Time Schedule</Text>
            </View>

            {/* Hourly Activities Table */}
            <View style={styles.activitiesTable}>
                {/* Table Header */}
                <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Hours</Text>
                {activities.map((activity) => (
                    <Text key={activity} style={styles.activityHeaderText}>{activity}</Text>
                ))}
                </View>

                {/* Rows of Activities */}
                {logBook.map((currentActivity, hour) => (
                <View key={hour} style={styles.activityRow}>
                    <Text style={styles.hourText}>{`${hour}:00`}</Text>
                    {activities.map((activity, index) => (
                    <View key={activity} style={styles.activityColumn}>
                        <CheckBox
                        isSelected={currentActivity === activity}
                        onPress={() => handleActivityChange(hour, activity)}
                        />
                    </View>
                    ))}
                </View>
                ))}
            </View>

            {/* Totals Display */}
            <View style={styles.totalsDisplay}>
                {Object.entries(totals).map(([activity, totalHours]) => (
                    <Text key={activity} style={styles.totalHoursText}>
                        {activity}: {totalHours} hrs
                    </Text>
                ))}
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit LogBook</Text>
            </TouchableOpacity>

            
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff', // Consider using your brand's color
        
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#f7f7f7', // Light gray for input background
        fontSize: 16, // Increase font size for better readability
    },
    dateDisplay: {
        paddingVertical: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
        marginBottom: 20,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333', // Dark gray for text for better contrast
    },
    timeline: {
        marginBottom: 20,
        backgroundColor: '#f2f2f2', // Light background for the timeline area
        borderRadius: 5,
        padding: 10,
    },
    hourBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
    },
    
    activitiesRow: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-evenly',
        padding: 10,
    },
    
    
    activityText: {
        textAlign: 'center',
    },
    totalsDisplay: {
        marginTop: 20,
    },
    totalHoursText: {
        fontSize: 16,
        paddingVertical: 4,
    },
    submitButton: {
        backgroundColor: '#1E90FF', // Use a color that stands out for the submit button
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 30,
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
      },
      odometerContainer: {
        // Assuming you want the starting and ending odometer inputs to take up
        // half the width of the screen minus some margin/padding
        flex: 1,
        marginRight: 10, // Add some space between this container and the total distance input
      },
      odometerInput: {
        // Style for each odometer input
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10, // Space between starting and ending odometer inputs
        borderRadius: 5,
        backgroundColor: '#f7f7f7', // Light gray background for input
        fontSize: 16, // Increase font size for better readability
      },
      totalDistanceInput: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f7f7f7', // Light gray background for input
        fontSize: 16, // Increase font size for better readability
        height: (22 * 2)+ 40, // Match the height of the odometer inputs
      },
    submitButtonText: {
        fontSize: 18,
        color: '#fff', // White text for the button
        fontWeight: 'bold',
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around', // This will distribute space evenly around the items
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: '#f7f7f7', // Light gray background for the header
        borderTopWidth: 1,
        borderTopColor: '#e1e1e1',
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
    },
    sectionHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333', // Dark text for better readability
    },
    activitiesTable: {
        marginTop: 10,
        marginBottom: 10,
      },
      tableHeader: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: '#f8f9fa', // Light background color for the header
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6', // Border color for separation
      },
      tableHeaderText: {
        width: 50, // Ensure this matches the hourText width for alignment
        fontWeight: 'bold',
        textAlign: 'center',
      },
      activityHeaderContainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      activityHeaderText: {
        flex: 3, // This flex value should match with activityColumn to ensure alignment
        fontWeight: 'bold',
        textAlign: 'center',
      },
      hourRow: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      hourLabel: {
        flex: 1,
        textAlign: 'center',
      },
      activityColumn: {
        flex: 1, // This ensures that the checkbox aligns under the activity header
        alignItems: 'center', // Center the checkbox horizontally
        // ... (add any other style properties you wish for activityColumn)
      },
      activityButtonsContainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      activityButton: {
        flex: 1,
        padding: 10,
        margin: 2,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
      },
      activityButtonSelected: {
        backgroundColor: '#d0e0fb',
      },
      activityButtonText: {
        textAlign: 'center',
      },
      activityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#ccc',
      },
      hourText: {
        width: 50, // Set a fixed width for the hour label for alignment
        textAlign: 'center',
        marginRight: 8, // Add some margin between the hour label and checkboxes
      },
      checkBoxContainer: {
        flexDirection: 'row', // This will lay out the checkboxes horizontally
        alignItems: 'center',
        justifyContent: 'flex-start', // Align checkboxes to the start of the row
      },
      checkBox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4, // Add horizontal margin between checkboxes
        backgroundColor: '#fff', // Set the default background color
      },
      checkBoxSelected: {
        backgroundColor: '#007bff', // A nice blue color for when the checkbox is selected
      },
      

  // ... other styles as needed
});

export default LogBookForm;
