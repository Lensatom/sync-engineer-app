const fontSize = {
  1: 12,
  2: 14,
  3: 16,
  4: 18,
  5: 20,
  6: 24,
  7: 30,
}

const lineHeight = {
  1: 16,
  2: 18,
  3: 20,
  4: 22,
  5: 24,
  6: 30,
  7: 36,
}

const letterSpacing = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
}

export const fonts = {
  body: {
    family: 'Inter_400Regular',
    size: fontSize,
    lineHeight,
    letterSpacing,
    weight: {
      4: '400',
    },
  },
  inter400: {
    family: 'Inter_400Regular',
    size: fontSize,
    lineHeight,
    letterSpacing,
    weight: {
      4: '400',
    },
  },
  inter500: {
    family: 'Inter_500Medium',
    size: fontSize,
    lineHeight,
    letterSpacing,
    weight: {
      5: '500',
    },
  },
  inter600: {
    family: 'Inter_600SemiBold',
    size: fontSize,
    lineHeight,
    letterSpacing,
    weight: {
      6: '600',
    },
  },
  inter700: {
    family: 'Inter_700Bold',
    size: fontSize,
    lineHeight,
    letterSpacing,
    weight: {
      7: '700',
    },
  },
  heading: {
    family: 'Fredoka_400Regular',
    size: fontSize,
    lineHeight,
    letterSpacing,
    weight: {
      4: '400',
    },
  },
  fredoka400: {
    family: 'Fredoka_400Regular',
    size: fontSize,
    lineHeight,
    letterSpacing,
    weight: {
      4: '400',
    },
  },
  fredoka500: {
    family: 'Fredoka_500Medium',
    size: fontSize,
    lineHeight,
    letterSpacing,
    weight: {
      5: '500',
    },
  },
  fredoka600: {
    family: 'Fredoka_600SemiBold',
    size: fontSize,
    lineHeight,
    letterSpacing,
    weight: {
      6: '600',
    },
  },
  fredoka700: {
    family: 'Fredoka_700Bold',
    size: fontSize,
    lineHeight,
    letterSpacing,
    weight: {
      7: '700',
    },
  },
  firacode400: {
    family: 'FiraCode_400Regular',
    size: fontSize,
    lineHeight,
    letterSpacing,
    weight: {
      4: '400',
    },
  },
  firacode500: {
    family: 'FiraCode_500Medium',
    size: fontSize,
    lineHeight,
    letterSpacing,
    weight: {
      5: '500',
    },
  },
  firacode600: {
    family: 'FiraCode_600SemiBold',
    size: fontSize,
    lineHeight,
    letterSpacing,
    weight: {
      6: '600',
    },
  },
  firacode700: {
    family: 'FiraCode_700Bold',
    size: fontSize,
    lineHeight,
    letterSpacing,
    weight: {
      7: '700',
    },
  },
}

export type SizeKey =
  | '0.5' | '1' | '1.5' | '2' | '2.5' | '3' | '3.5' | '4' | '4.5'
  | '5' | '5.5' | '6' | '6.5' | '7' | '7.5' | '8' | '8.5' | '9'
  |'9.5' | '10' | '10.5' | '11' | '11.5' | '12'

export const generateSizeTokens = (): Record<SizeKey, number> => {
  const sizeTokens = {} as Record<SizeKey, number>
  for (let i = 1; i <= 12; i++) {
    const half = (i - 0.5).toString() as SizeKey
    const whole = i.toString() as SizeKey
    sizeTokens[half] = (i - 0.5) * 4
    sizeTokens[whole] = i * 4
  }
  return sizeTokens
}