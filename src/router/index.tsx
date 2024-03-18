import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomePage,
  Splash,
  AddStudentDataPage,
  CameraPage,
  GroupListPage,
  LoginPage,
  ReminderPage,
  RegistName,
  RegistRole,
  RegistInstitutionBK,
  RegistInstitutionWK,
  RegistAccount,
  ResultPage,
  CheckPhotoPage, 
  Tabs
} from '../pages';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddStudentDataPage"
        component={AddStudentDataPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CameraPage"
        component={CameraPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GroupListPage"
        component={GroupListPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReminderPage"
        component={ReminderPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegistName"
        component={RegistName}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegistRole"
        component={RegistRole}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegistInstitutionBK"
        component={RegistInstitutionBK}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegistInstitutionWK"
        component={RegistInstitutionWK}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegistAccount"
        component={RegistAccount}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResultPage"
        component={ResultPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CheckPhotoPage"
        component={CheckPhotoPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
