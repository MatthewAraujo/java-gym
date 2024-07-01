import { useCallback, useState } from 'react'
import {useNavigation,useFocusEffect } from '@react-navigation/native'
import { VStack, FlatList, HStack, Heading, Text, useToast } from 'native-base'
import { api } from '../services/api'
import { AppError } from '../utils/AppError'
import { HomeHeader } from '../components/HomeHeader'
import { Loading } from '../components/Loading'
import { GymCard } from '../components/GymCard'


export function Gym() {
  const [isLoading, setIsLoading] = useState(true)
  const [gym, setGyms] = useState([])

  const navigation = useNavigation()

  function handleOpenGymDetails(gymId) {
    navigation.navigate('gym-details', { gymId })
  }

  const toast = useToast()

  async function fetchGyms() {
    try {
      const response = await api.get('/gym')

      setGyms(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar as academias.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  useFocusEffect(
    useCallback(() => {
      fetchGyms()
    }, [])
  )


  return (
    <VStack flex={1}>
      <HomeHeader />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={8}>
          <HStack justifyContent="space-between" mb={5}>
            <Heading color="gray.200" fontSize="md" mt={5} fontFamily="heading">
              Academias
            </Heading>
            
            <Text color="gray.200" fontSize="sm">
              {gym.length} Academias disponível(is)
            </Text>
          </HStack>

          <FlatList
            data={gym}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <GymCard onPress={() => handleOpenGymDetails(item.id)} data={item} />}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
          />
        </VStack>
      )}
    </VStack>
  )
}

