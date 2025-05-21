import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

export default function FaqScreen() {
  const questionFAQ = "Mon animal s'est fait mordre"
  return (
    <View style={styles.mainDiv}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.title}>FAQ</Text>
        </View>
        <View style={styles.questionsContainer}>
          <View style={styles.cardContainer}>
            <Text style={styles.cardContainerTxt}>
                {questionFAQ}
            </Text>
          </View>
        </View>
        <View style={styles.linkSeeMore}>
          <View style={styles.seeMoreQuestionsContainer}>
            <Text style={styles.seeMoreQuestions}>Voir plus</Text>
          </View>

        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.informationContainer}>
          <TextInput style={styles.inpuText} placeholder='Que recherchez-vous ?'></TextInput>
          <TouchableOpacity style={styles.searchBtn}>
            <Text style={styles.searchBtnTxt}>Rechercher</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
    fontFamily: 'Arial, sans-serif',
    backgroundColor: "#C2E7F7",
    alignItems: 'center',
    fontFamily: 'Arial, Sans-Serif'
  },
  header: {
    height: "75%",
    width: "90%",
  },
  headerTitle: {
    height: "20%",
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  title: {
    fontSize: 26,
    color: "#1472AE",
    fontWeight: 700,
    marginBottom: 20,
  },
  questionsContainer: {
    height: "70%",
  },
  cardContainer: {
    backgroundColor: "white",
    padding: 10,
    height: '13%',
    borderBottomWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  cardContainerTxt: {
    fontSize: 16,
  },
  linkSeeMore: {
    height: "10%",
    width: "100%",
  },
  seeMoreQuestionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seeMoreQuestions: {
    fontSize: 16,
    color: '#0D2C56',
    fontWeight: '600',
  },


  // BODY PART
  body: {
    height: "25%",
    width: "90%",
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
  informationContainer: {
    height: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  inpuText: {
    backgroundColor: 'white',
    height: '23%',
    width: '87%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#3884BB",
    textAlign: 'center',
  },
  searchBtn: {
    borderWidth: 1,
    height: '23%',
    width: '87%',
    borderRadius: 10,
  },
  searchBtnTxt: {
    height: '100%',
    padding: 10,
    textAlign: 'center',
    color: 'white',
    backgroundColor: "#0D2C56",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 16,
  }
})