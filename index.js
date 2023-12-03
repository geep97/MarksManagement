import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const StudentInput = ({ onChange, index }) => {
  return (
    <View style={styles.studentContainer}>
      <Text style={styles.label}>{`Student ${index + 1}`}</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => onChange(index, 'name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Class Exercise (out of 10)"
        keyboardType="numeric"
        onChangeText={(text) => onChange(index, 'classExercise', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mid-Term (out of 10)"
        keyboardType="numeric"
        onChangeText={(text) => onChange(index, 'midTerm', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Class Test (out of 10)"
        keyboardType="numeric"
        onChangeText={(text) => onChange(index, 'classTest', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Exams (out of 100)"
        keyboardType="numeric"
        onChangeText={(text) => onChange(index, 'exam', text)}
      />
    </View>
  );
};

export default function App() {
  const [students, setStudents] = useState([{ name: '', classExercise: '', midTerm: '', classTest: '', exam: '' }]);

  const addStudent = () => {
    // Add a new student object to the students array
    setStudents([...students, { name: '', classExercise: '', midTerm: '', classTest: '', exam: '' }]);
  };

  const handleInputChange = (studentIndex, field, value) => {
    const updatedStudents = [...students];
    updatedStudents[studentIndex][field] = value;
    setStudents(updatedStudents);
  };

  const submitMarks = () => {
    // You can handle the logic to calculate and submit marks to the database here
    const processedStudents = students.map((student) => ({
      ...student,
      totalMarks:
        (parseInt(student.classExercise) +
          parseInt(student.midTerm) +
          parseInt(student.classTest) +
          parseInt(student.exam / 100)) *
        (70),
    }));
    console.log('Submitting marks:', processedStudents);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.text}>Welcome Teacher!</Text>
      </View>

      <ScrollView style={styles.content}>
        {students.map((student, index) => (
          <StudentInput key={index} onChange={handleInputChange} index={index} />
        ))}
      </ScrollView>

      <Button title="Add Student" onPress={addStudent} />
      <Button title="Submit Marks" onPress={submitMarks} />

      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontStyle: 'italic',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  content: {
    flex: 3,
    width: '80%',
  },
  studentContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
