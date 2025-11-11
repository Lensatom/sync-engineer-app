import { styled, Text as TMText } from "tamagui"

const BaseText = styled(TMText, {
  variants: {
    type: {
      h1: {
        fontSize: 18,
        fontWeight: '600'
      },
      h2: {
        fontSize: 16,
        fontWeight: '500'
      },
      sub1: {
        fontSize: 12,
        fontWeight: '400',
        color: "$gray11"
      }
    } as const
  }
})

interface Props extends React.ComponentProps<typeof BaseText> {

}

export const Text = (props: Props) => {
  return <BaseText color="$gray13" {...props} />
}