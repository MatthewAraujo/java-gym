import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
  ScrollView,
  useToast
} from 'native-base'
import { Feather } from '@expo/vector-icons'


import BodySvg from '../assets/body.svg'
import SeriesSvg from '../assets/series.svg'
import RepetitionsSvg from '../assets/repetitions.svg'
import { api } from '../services/api'
import { AppError } from '../utils/AppError'
import { Loading } from '../components/Loading'
import { Button } from '../components/Button'

export function GymDetails() {
  const [sendingRegister, setSendingRegister] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [gym, setGyms] = useState({})
  const navigation = useNavigation()

  const route = useRoute()
  const toast = useToast()

  const { gymId } = route.params

  function handleGoBack() {
    navigation.goBack()
  }

  async function fetchGymDetails() {
    try {
      setIsLoading(true)

      const response = await api.get(`/gym/${gymId}`)

      setGyms(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os detalhes do exercício.'

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
    fetchGymDetails()
  }, [gymId])

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading
            color="gray.100"
            fontSize="lg"
            flexShrink={1}
            fontFamily="heading"
          >
            {gym.gym_name}
          </Heading>

          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              {gym.address}
            </Text>
          </HStack>
        </HStack>
      </VStack>

    </VStack>
  )
}
