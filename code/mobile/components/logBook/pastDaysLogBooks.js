import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown, faChevronUp, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import moment from "moment-timezone";
import CustomButton from "../customs/customButton";
import LogBookStructure from "./logBookStructure";
import { useTheme } from "../themeContext";

const generatePastDates = (days) => {
  const dates = [];
  for (let i = days; i > 0; i--) {
    const date = moment().tz("America/Regina").subtract(i, "days");
    dates.push(date.toDate());
  }
  return dates;
};

export default function PastDaysLogBooks() {
  const [expandedDay, setExpandedDay] = useState(null);
  const [approvedLogbooks, setApprovedLogbooks] = useState([]);
  const pastDates = generatePastDates(15);
  const ipConfig = process.env.REACT_IP_CONFIG;
  const [fetchedLogbook, setFetchedLogbook] = useState(null);
  const currentTimeInMinutes = moment().tz("America/Regina").hours() * 60 + moment().tz("America/Regina").minutes();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();

  const style = getDynamicStyles(isDarkMode);

  useEffect(() => {
    if (!isFocused) return;

    const fetchLogbook = async () => {
      try {
        const response = await axios.get(`${ipConfig}/api/getlogbook1`);
        setFetchedLogbook(response.data);
      } catch (error) {
        console.error("Failed to fetch logbook:", error);
      }
    };

    fetchLogbook();
  }, [isFocused]);

  const formatDate = (date) => {
    return moment(date).tz("America/Regina").format("YYYY-MM-DD");
  };

  const today = moment().tz("America/Regina").toDate();
  const todayFormatted = formatDate(today);
  let todayLog = fetchedLogbook?.logbook.find(
    (log) => formatDate(moment(log.date).tz("America/Regina").toDate()) === todayFormatted
  );

  return (
    <View style={style.pageContainer}>
      <View style={style.container}>
        <Text style={style.title}>Logbooks</Text>
      </View>
      <Text style={style.subtitle}>{moment().tz("America/Regina").format("YYYY-MM-DD")}</Text>
      {todayLog ? (
        <View style={style.accordionContent}>
          <LogBookStructure fetchedLogbook={todayLog.status} currentTime={currentTimeInMinutes} />
        </View>
      ) : (
        <></>
      )}
      <Text style={style.subtitle}>Previous Logs</Text>
      {[...pastDates].reverse().map((date, index) => (
        <View key={index} style={style.accordionSection}>
          <TouchableOpacity
            style={style.accordionHeader}
            onPress={() => setExpandedDay(expandedDay === index ? null : index)}
          >
            <View style={style.headerContent}>
              <Text style={style.accordionHeaderText}>
                {formatDate(date)} ({moment(date).tz("America/Regina").format("dddd")})
              </Text>
              <View style={style.iconsContainer}>
                {!approvedLogbooks.includes(formatDate(date)) && (
                  <FontAwesomeIcon icon={faCircleExclamation} size={16} color="red" style={{ marginRight: 10 }} />
                )}
                <FontAwesomeIcon icon={expandedDay === index ? faChevronUp : faChevronDown} size={16} color="#0866FF" />
              </View>
            </View>
          </TouchableOpacity>
          {expandedDay === index && fetchedLogbook && (
            <View>
              <LogBookStructure
                fetchedLogbook={
                  fetchedLogbook.logbook.find(
                    (log) => formatDate(moment(log.date).tz("America/Regina").toDate()) === formatDate(date)
                  )?.status || { OFF: [{ start: "0", end: "1440" }], SB: [], D: [], ON: [] }
                }
                currentTime={currentTimeInMinutes}
              />
              <View style={style.buttons}>
                <CustomButton
                  children={"Edit"}
                  pH={25}
                  fs={10}
                  onPress={() => {
                    const logEntry = fetchedLogbook.logbook.find(
                      (log) => formatDate(moment(log.date).tz("America/Regina").toDate()) === formatDate(date)
                    );
                    navigation.navigate("EditLogBookScreen", { logEntry: logEntry });
                  }}
                />
                <CustomButton
                  children={"Approve"}
                  pH={20}
                  fs={10}
                  onPress={() => {
                    setApprovedLogbooks([...approvedLogbooks, formatDate(date)]);
                  }}
                />
              </View>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const getDynamicStyles = (isDarkMode) => StyleSheet.create({
  pageContainer: {
    backgroundColor: isDarkMode ? "#333" : "#FFFFFF",
    flex: 1,
    marginBottom: 60,
  },
  container: {
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    color: isDarkMode ? "#FFF" : "#0866FF",
    marginBottom: 20,
    fontFamily: "Lora-SemiBold",
  },
  subtitle: {
    fontFamily: "Lora-Bold",
    fontSize: 18,
    padding: 10,
    color: isDarkMode ? "#FFF" : "#0866FF",
  },
  accordionSection: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: isDarkMode ? "#555" : "lightgrey",
    backgroundColor: isDarkMode ? "#222" : "#f7f7f7",
  },
  accordionHeader: {
    padding: 15,
    backgroundColor: isDarkMode ? "#444" : "#f7f7f7",
  },
  accordionHeaderText: {
    fontFamily: "Lora-Bold",
    color: isDarkMode ? "#FFF" : "#000", 
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttons: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
  },
});

