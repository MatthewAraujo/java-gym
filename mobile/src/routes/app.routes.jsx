import { Platform } from 'react-native'
import { useTheme } from 'native-base'
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'

import HomeSvg from '../assets/home.svg'
import HistorySvg from '../assets/history.svg'
import PersonalsSvg from '../assets/personal.svg'
import ProfileSvg from '../assets/profile.svg'
import GymSvg from '../assets/gym.svg'
import { Home } from '../screens/Home'
import { History } from '../screens/History'
import { Profile } from '../screens/Profile'
import { Exercise } from '../screens/Exercise'
import { Personals } from '../screens/Personals'
import { Gym } from '../screens/Gym'
import { GymDetails } from '../screens/GymDetails'
import {FormExercise} from '../screens/FormExercise'



const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  const { sizes, colors } = useTheme()

  const iconSize = sizes[6]

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: sizes[10],
          paddingTop: sizes[6]
        }
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />
      <Screen 
        name="personals"
        component={Personals}
        options={{
          tabBarIcon: ({ color }) => (
            <PersonalsSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

<Screen 
        name="gyms"
        component={Gym}
        options={{
          tabBarIcon: ({ color }) => (
            <GymSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />
      <Screen
        name="exercise"
        component={Exercise}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name="gym-details"
        component={GymDetails}
        options={{ tabBarButton: () => null }}
      />

<Screen
        name="formExercise"
        component={FormExercise}
        options={{ tabBarButton: () => null }}
      />
     
    </Navigator>
  )
}
