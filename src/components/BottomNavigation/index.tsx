import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { HomePageLogedIn, ResultListPage, ProfilePage } from '../../pages';
import {View, Image} from 'react-native';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  let HomeSelectedIcon = require('../../../assets/icons/icon_Home_selected.png');
  let HomeUnselectedIcon = require('../../../assets/icons/icon_Home.png');
  let ResultSelectedIcon = require('../../../assets/icons/icon_Result_selected.png');
  let ResultUnselectedIcon = require('../../../assets/icons/icon_Result.png');
  let ProfileSelectedIcon = require('../../../assets/icons/icon_Profile_selected.png');
  let ProfileUnselectedIcon = require('../../../assets/icons/icon_Profile.png');

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: '#CC3663',
          height: 75,
        },
      }}>
      
      <Tab.Screen
        name="Home"
        component={HomePageLogedIn}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={focused ? HomeSelectedIcon : HomeUnselectedIcon}
                style={{width: 30, height: 30}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ResultList"
        component={ResultListPage}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={focused ? ResultSelectedIcon : ResultUnselectedIcon}
                style={{width: 30, height: 30}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={focused ? ProfileSelectedIcon : ProfileUnselectedIcon}
                style={{width: 30, height: 30}}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
