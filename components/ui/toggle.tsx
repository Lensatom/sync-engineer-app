import React, { useMemo, useState } from 'react'
import { Pressable } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

type PresetSize = 'sm' | 'md' | 'lg'

interface Props extends Omit<React.ComponentProps<typeof XStack>, 'onPress'> {
  size?: PresetSize | number
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
  label?: string
}

export function Toggle({
  size = 'md',
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  ...rest
}: Props) {
  const [internal, setInternal] = useState<boolean>(defaultChecked)
  const isControlled = typeof checked === 'boolean'
  const value = isControlled ? (checked as boolean) : internal

  const { width, height, knob } = useMemo(() => {
    if (typeof size === 'number') {
      const w = size
      const h = Math.round(w / 2.5)
      return { width: w, height: h, knob: Math.max(12, Math.round(h - 4)) }
    }
    const map: Record<PresetSize, { width: number; height: number; knob: number }> = {
      sm: { width: 36, height: 20, knob: 16 },
      md: { width: 40, height: 16, knob: 24 },
      lg: { width: 64, height: 34, knob: 30 },
    }
    return map[size]
  }, [size])

  const knobMargin = value ? width - knob : 0

  const handleToggle = () => {
    if (disabled) return
    const next = !value
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }

  return (
    <Pressable
      onPress={handleToggle}
      accessibilityRole="switch"
      accessibilityState={{ disabled, checked: value }}
      disabled={disabled}
    >
      <XStack
        width={width}
        height={height}
        borderRadius="$full"
        alignItems="center"
        justifyContent="flex-start"
        bg={value ? '$primary4' : '$gray6'}
        opacity={disabled ? 0.5 : 1}
        {...rest}
      >
        <YStack
          width={knob}
          height={knob}
          borderRadius="$full"
          bg={value ? "$main" : "$gray3"}
          style={{ marginLeft: knobMargin }}
        />
      </XStack>

      {label ? (
        <Text marginTop={6} color="$gray11">
          {label}
        </Text>
      ) : null}
    </Pressable>
  )
}