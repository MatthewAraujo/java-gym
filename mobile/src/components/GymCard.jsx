import { TouchableOpacity } from 'react-native'
import { HStack, Heading, Image, Text, VStack, Icon } from 'native-base'
import { Entypo } from '@expo/vector-icons'
import { api } from '../services/api'

export function GymCard({data}){
  console.log(data)
  return (
    <TouchableOpacity>
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
        mb={3}
      >

        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily="heading">
            {data.gym_name}
          </Heading>

          

          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            {data.city}
          </Text>

        
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  )
  
}