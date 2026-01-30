import * as icons from "@/assets/icons";
import { PADDING_X } from "@/constants/theme";
import React, { ComponentProps, forwardRef } from "react";
import { ActivityIndicator } from "react-native";
import { styled, TamaguiElement, Button as TMButton } from "tamagui";
import { Icon } from "./icon";

const BaseButton = styled(TMButton, {
  px: 32,
  h: 40,
  fontSize: 16,
  flexDirection: "row",
  ai: "center",
  jc: "center",
  color: "$white",
  variants: {
    type: {
      primary: {
        bg: "$main",
        borderColor: "$colorTransparent",
        borderWidth: 0,
        width: "auto",
        pressStyle: {
          bg: "$primary1",
          borderColor: "$colorTransparent",
          opacity: 0.8,
        },
      },
      secondary: {
        bg: "$primary2",
        borderColor: "$colorTransparent",
        color: "$primary2",
        width: "auto",
        pressStyle: {
          bg: "$primary2",
          borderColor: "$colorTransparent",
          opacity: 0.8,
        },
      },
      outline: {
        bg: "$colorTransparent",
        borderColor: "$main",
        color: "$main",
        width: "auto",
        pressStyle: {
          bg: "$colorTransparent",
          borderColor: "$colorTransparent",
          opacity: 0.8,
        },
      },
      outlineGray: {
        bg: "$colorTransparent",
        borderColor: "$gray7",
        color: "$gray13",
        width: "auto",
        pressStyle: {
          bg: "$colorTransparent",
          borderColor: "$colorTransparent",
          opacity: 0.8,
        },
      },
      disabled: {
        bg: "$gray4",
        borderColor: "$colorTransparent",
        borderWidth: 0,
        color: "$gray3",
        width: "auto",
        pressStyle: {
          bg: "$gray4",
          borderColor: "$colorTransparent",
          opacity: 0.8,
        },
      },
      light: {
        bg: "$white",
        borderColor: "$colorTransparent",
        color: "$main",
        width: "auto",
        pressStyle: {
          bg: "$white",
          borderColor: "$colorTransparent",
          opacity: 0.8,
        },
      },
      dark: {
        bg: "$black",
        borderColor: "$colorTransparent",
        color: "$white",
        width: "auto",
        pressStyle: {
          bg: "$black",
          borderColor: "$colorTransparent",
          opacity: 0.8,
        },
      },
      ghost: {
        bg: "$colorTransparent",
        borderColor: "$colorTransparent",
        color: "$black",
        width: "auto",
        px: 0,
        py: 0,
        pressStyle: {
          bg: "$transparent",
          borderColor: "$colorTransparent",
          opacity: 0.5,
        },
      },
    },
    size: {
      md: {},
      sm: {
        px: PADDING_X,
        h: 32,
        fontSize: 12,
        fontWeight: "600",
      },
    },
    full: {
      true: {
        width: "100%",
      },
    },
    pill: {
      true: {
        br: "$full",
      },
    },
  } as const,
  defaultVariants: {
    type: "primary",
  },
});

type BaseButtonType = Omit<ComponentProps<typeof BaseButton>, "loading">;
interface Props extends BaseButtonType {
  children?: React.ReactNode;
  text?: string;
  iconName?: keyof typeof icons;
  isLoading?: boolean;
}

export const Button = forwardRef<TamaguiElement, Props>(
  (
    { children, isLoading, text, type = "primary", iconName, ...props },
    ref,
  ) => {
    return (
      <BaseButton
        type={type}
        opacity={props.disabled || isLoading ? 0.6 : 1}
        disabled={isLoading ? true : props.disabled}
        {...props}
        ref={ref}
      >
        {iconName && <Icon name={iconName} padding={0} size={20} />}
        {text ? (
          isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            text
          )
        ) : isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          children
        )}
      </BaseButton>
    );
  },
);
