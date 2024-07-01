import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { api } from '../services/api';

import {
  VStack,
  Center,
  Heading,
  ScrollView,
  KeyboardAvoidingView,
  useToast,
  Select,
  CheckIcon,
  FormControl,
  Box,
} from 'native-base';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { AppError } from '../utils/AppError'; // Certifique-se de que esta importação está correta

const exerciseSchema = yup.object({
  name: yup.string().required('Informe o nome do exercício.'),
  series: yup.number().required('Informe a quantidade de séries.').positive().integer(),
  repetitions: yup.number().required('Informe a quantidade de repetições.').positive().integer(),
  group: yup.string().required('Informe o grupo muscular.'),
});

export function FormExercise() {
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const toast = useToast();
  const navigation = useNavigation();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(exerciseSchema)
  });

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await api.get('/groups');
        setGroups(response.data);
        console.log('Groups fetched:', response.data);
      } catch (error) {
        const isAppError = error instanceof AppError;
        const title = isAppError
          ? error.message
          : 'Não foi possível carregar os grupos musculares.';

        toast.show({
          title,
          placement: 'top',
          bgColor: 'red.500'
        });
      }
    }

    fetchGroups();
  }, []);

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      
      console.log('Form data:', data);
      await api.post('/exercises', data);

      toast.show({
        title: 'Exercício cadastrado com sucesso',
        placement: 'top',
        bgColor: 'green.700'
      });

      navigation.navigate('home');
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível cadastrar o exercício. Tente novamente mais tarde.';

      console.error('Error submitting form:', error);
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack flex={1} px={10}>
          <Center>
            <Heading color="gray.100" fontSize="xl" mt={5} mb={5} fontFamily="heading">
              Novo Exercício
            </Heading>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="series"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Quantidade de Séries"
                  keyboardType="numeric"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.series?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="repetitions"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Quantidade de Repetições"
                  keyboardType="numeric"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.repetitions?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="group"
              render={({ field: { onChange, value } }) => (
                <FormControl isInvalid={errors.group}>
                  <Box mb={4}>
                    <Select
                      selectedValue={value}
                      minWidth="200"
                      accessibilityLabel="Escolha o grupo muscular"
                      placeholder="Escolha o grupo muscular"
                      _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />
                      }}
                      mt={1}
                      onValueChange={onChange}
                    >
                      {groups.map((group) => (
                        <Select.Item key={group} label={group} value={group} />
                      ))}
                    </Select>
                    <FormControl.ErrorMessage>
                      {errors.group?.message}
                    </FormControl.ErrorMessage>
                  </Box>
                </FormControl>
              )}
            />

            <Button
              title="Enviar"
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoading}
            />
          </Center>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
