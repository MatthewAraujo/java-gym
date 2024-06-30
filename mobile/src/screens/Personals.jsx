import { useCallback, useState } from 'react'
import {useFocusEffect } from '@react-navigation/native'
import { VStack, FlatList, HStack, Heading, Text, useToast } from 'native-base'
import { api } from '../services/api'
import { AppError } from '../utils/AppError'
import { HomeHeader } from '../components/HomeHeader'
import { Loading } from '../components/Loading'
import { PersonalCard } from '../components/PersonalCard'


export function Personals() {
  const [isLoading, setIsLoading] = useState(true)
  const [personal, setPersonals] = useState([])

  const toast = useToast()

  async function fetchPersonals() {
    try {
      const response = await api.get('/personal')

      setPersonals(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os personais.'

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
      fetchPersonals()
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
            <Heading color="gray.200" fontSize="md" fontFamily="heading">
              Personais
            </Heading>
            
            <Text color="gray.200" fontSize="sm">
              {personal.length} personal(s) cadastrado(s)
            </Text>
          </HStack>

          <FlatList
            data={personal}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <PersonalCard data={item} />}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
          />
        </VStack>
      )}
    </VStack>
  )
}

