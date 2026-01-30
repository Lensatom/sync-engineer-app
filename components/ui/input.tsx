import { ComponentProps, forwardRef, useState } from "react";
import { Input as TMInput, View, YStack, styled } from "tamagui";
import { Button, Text } from ".";

const BaseInput = styled(TMInput, {
  w: "100%",
  h: 40,
  fontSize: 14,
  px: 20,
  // py: "$4",
  br: "$6",
  color: "$dark.80",
  fontWeight: "600",
  variants: {
    type: {
      outline: {
        backgroundColor: "$backgroundTransparent",
        borderColor: "$gray8",
        borderWidth: 1,
      },
      line: {
        backgroundColor: "$backgroundTransparent",
        borderColor: "#3A3A3A44",
        borderWidth: 0,
        borderBottomWidth: 1,
        borderRadius: 0,
        py: 0,
        h: 40,
        px: 0,
        focusStyle: {
          borderColor: "$primary",
        },
      },
      ghost: {
        backgroundColor: "$colorTransparent",
        borderColor: "$backgroundTransparent",
        focusStyle: {
          borderColor: "$primary.1",
        },
      },
    },
    rounded: {
      full: {
        br: 99,
      },
    },
  } as const,
  defaultVariants: {
    type: "outline",
  },
});

type BaseInputType = ComponentProps<typeof BaseInput>;
interface Props extends BaseInputType {
  label?: string;
  error?: string;
  hash?: boolean;
  phone?: boolean;
}

export const Input = forwardRef<any, Props>(
  ({ label, error, phone, hash: h, onChangeText, ...props }, ref) => {
    const [hash, setHash] = useState<boolean | null>(h ? h : null);

    const toggleHash = () => {
      setHash((prev) => !prev);
    };

    const onChangePhone = (value: string) => {
      if (!onChangeText) return;

      if (value.length === 1 && value !== "0") {
        onChangeText(`0${value}`);
      } else {
        onChangeText(value);
      }
    };

    return (
      <YStack
        onTouchStart={(e) => e.stopPropagation()}
        w="$full"
        gap="$1.5"
        jc="center"
      >
        {label && (
          <Text fos="$3" fow="500" mb="$0.5">
            {label}
          </Text>
        )}

        {phone && (
          <View
            position="absolute"
            top={43}
            borderColor="$input.border"
            borderRightWidth={2}
            px="$3"
          >
            <Text fow="500" fos="$3">
              +234
            </Text>
          </View>
        )}

        <View>
          <BaseInput
            ref={ref}
            secureTextEntry={!!hash}
            cursorColor={"black"}
            paddingLeft={phone ? 74 : 20}
            onChangeText={
              phone ? (value) => onChangePhone(value) : onChangeText
            }
            keyboardType={phone ? "phone-pad" : props.keyboardType}
            {...props}
            borderColor={error ? "$danger" : props.borderColor}
            placeholderTextColor="$gray8"
          />

          {hash !== null && (
            <View position="absolute" right="$2" top={44} bg="$white" px="$2">
              <Button type="ghost" onPress={toggleHash}>
                {hash ? <Text>See</Text> : <Text>Hide</Text>}
              </Button>
            </View>
          )}
        </View>

        {error && (
          <Text fontSize="$2" fow="400" color="$danger">
            {error}
          </Text>
        )}
      </YStack>
    );
  },
);
