import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import moment from 'moment';
import 'moment/locale/fr';

export default function AgendaPro() {
  const calendar = <FontAwesome name={"calendar"} size={40} style={styles.calendarIcon} />;

  // Take appointment's information from mongoDB 
  const [rdvData, setRdvData] = useState([]);

  // Using today's date 
  const [currentDate, setCurrentDate] = useState(moment().locale('fr'));

  const previousDayClick = () => {
    setCurrentDate(moment(currentDate).subtract(1, "days"));
  };

  const nextDayClick = () => {
    setCurrentDate(moment(currentDate).add(1, "days"));
  };


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/appointments");
      const data = await response.json();

      // Same Date format
      const currentDateFormatted = currentDate.format("YYYY-MM-DD");

      // Filter on good date
      const filteredAppointments = data.Overview.filter(element => {
        const appointmentDate = moment(element.appointmentDate, "DD MMMM YYYY", 'fr').format("YYYY-MM-DD");
        return appointmentDate === currentDateFormatted;
      });

      setRdvData(filteredAppointments);
    };

    fetchData();
  }, [currentDate]);


  // Display the RDV's container
  const infoContainer = rdvData.map((element, index) => {
    return (
      <View style={styles.cardContainer} key={index}>
        <View style={styles.hoursContainer}>
          <Text style={styles.hours}>{element.appointmentHour}</Text>
        </View>
        <View style={styles.information}>
          <Text style={styles.reasonConsultation}>{element.reason}</Text>
          <Text style={styles.profesionnalName}>{element.userName}</Text>
        </View>
      </View>
    )
  });

  return (
    <View style={styles.mainDiv} >
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <View style={styles.profilPicture}>
            <Image source={require('../assets/vetoImg.png')} alt="imageVeto" style={styles.vetoImg} />
          </View>
          <View style={styles.agenda}>
            <View style={styles.topAgenda}>
              <Text style={styles.topAgendaTxt}>Mon agenda</Text>
            </View>
            <View style={styles.bottomAgenda}>
              {calendar}
              <View style={styles.dateContainer}>
                <Text style={styles.profilDate}>{currentDate.format('LL')}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomHeader}>
          <TouchableOpacity style={styles.previousBtn}>
            <Text style={styles.previousBtnTxt} onPress={() => previousDayClick()}>{'<'}  Précédent</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextBtn}>
            <Text style={styles.nextBtnTxt} onPress={() => nextDayClick()} >Suivant  {'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <ScrollView style={styles.viewContainer}>
          {infoContainer}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
    fontFamily: "Arial, sans-serif",
  },

  // HEADER PART
  header: {
    height: "35%",
    alignItems: 'center'
  },
  topHeader: {
    height: "70%",
    flexDirection: 'row',
  },
  profilPicture: {
    height: "100%",
    width: "40%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  vetoImg: {
    height: 130,
    width: 130,
    borderRadius: 100,
  },
  agenda: {
    height: "100%",
    width: "60%",
  },
  topAgenda: {
    height: "50%",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  topAgendaTxt: {
    fontSize: 20,
    fontFamily: 'Poppins'
  },
  bottomAgenda: {
    height: "50%",
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
  },
  calendarIcon: {
    color: "#0D2C56",
    marginLeft: 20
  },
  profilDate: {
    backgroundColor: 'lightgray',
    padding: 7,
    borderRadius: 10,
    fontSize: 20,
    marginRight: 20
  },
  bottomHeader: {
    height: "30%",
    width: "70%",
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  previousBtn: {
    backgroundColor: "#0D2C56",
    padding: 8,
    borderRadius: 10,
    fontWeight: "800",
  },
  nextBtn: {
    backgroundColor: "#0D2C56",
    padding: 8,
    borderRadius: 10,
  },
  previousBtnTxt: {
    fontSize: 16,
    color: 'white',
    fontWeight: "600",
  },
  nextBtnTxt: {
    fontSize: 16,
    color: 'white',
    fontWeight: "600",
  },


  // BODY PART
  body: {
    height: "65%",
    alignItems: 'center',

  },
  viewContainer: {
    width: 270,
  },
  cardContainer: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 5
  },
  hoursContainer: {
    height: "64%",
    width: "19%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#1472AE",
    borderRadius: 100,
  },
  hours: {
    color: "white"
  },
  information: {
    height: "60%",
    width: "70%",
    borderWidth: 1,
    borderColor: "#1472AE",
    borderRadius: 11,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  reasonConsultation: {
    marginLeft: 15
  },
  profesionnalName: {
    marginLeft: 15
  },
});
