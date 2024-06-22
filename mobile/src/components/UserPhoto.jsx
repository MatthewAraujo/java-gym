import { Image, IImageProps } from 'native-base'


export function UserPhoto({ size, ...rest }) {
  return (
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...rest}
    />
  )
}
