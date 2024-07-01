import { useCallback, useEffect, useState } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { VStack, FlatList, HStack, Heading, Text, useToast } from 'native-base'
import { api } from '../services/api'
import { AppError } from '../utils/AppError'
import { HomeHeader } from '../components/HomeHeader'
import { Group } from '../components/Group'
import { Loading } from '../components/Loading'
import { ExerciseCard } from '../components/ExerciseCard'
import { Button } from '../components/Button'

import { useAuth } from '../hooks/useAuth'


export function Home() {

  const { user, signOut } = useAuth()
  
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGrous] = useState([])
  const [exercises, setExercises] = useState([])
  const [groupSelected, setGroupSetected] = useState('')
  const [Personals, setPersonals] = useState([])

  const toast = useToast()
  const navigation = useNavigation()

  function handleOpenExerciseDetails(exerciseId) {
    navigation.navigate('exercise', { exerciseId })
  }

  function handleOpenFormExercise(){
    navigation.navigate('formExercise')
  }

  async function fetchGroups() {
    try {
      const responde = await api.get('/groups')

      setGrous(responde.data)
      setGroupSetected(responde.data[0])
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os grupos musculares.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true)
      const response = await api.get(`/exercises/bygroup/${groupSelected}`)

      setExercises(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os exercicios.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup()
    }, [groupSelected])
  )

  return (
    <VStack flex={1}>
      <HomeHeader />
     
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toUpperCase() === item.toUpperCase()}
            onPress={() => setGroupSetected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={8}>
          <HStack justifyContent="space-between" mb={5}>
            <Heading color="gray.200" fontSize="md" fontFamily="heading">
              Exercícios
            </Heading>
            
            <Text color="gray.200" fontSize="sm">
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                onPress={() => handleOpenExerciseDetails(item.id)}
                data={item}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
          />
          {user.email == "joaodorea300@gmail.com" ?(
          <Button
              title="Adicionar exercício"
              variant="outline"
              onPress = {() => handleOpenFormExercise()}
              mb = {5}
              
            />) : (<></>)}
        </VStack>
      )}
    </VStack>
  )
}
