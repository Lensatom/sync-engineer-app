import { SvgProps } from "react-native-svg"
import { View } from "tamagui"
import * as icons from "@/assets/icons"

export type IIcon = keyof typeof icons

interface Props extends SvgProps {
  name: IIcon
  size?: number
  width?: number
  height?: number
  padding?: number
  bg?: boolean | string
}

export const Icon = ({
  name,
  size = 16,
  width,
  height,
  padding = 20,
  bg,
  ...rest
}:Props) => {
  const CustomIcon = icons[name]

  return (
    <View
      width={width ? width + padding : size + padding}
      height={height ? height + padding : size + padding}
      bg={!bg ? null : bg === true ? "#F8F8FA" : bg}
      br={99}
      jc="center"
      ai="center"
    >
      <CustomIcon {...rest} width={width || size} height={height || size} />
    </View>
  )
}