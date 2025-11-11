import { statusColors } from '@/constants/ui';
import React from 'react';
import { Text } from '../ui';

interface StatusPillProps extends React.ComponentProps<typeof Text> {
  status: keyof typeof statusColors
}

export function StatusPill({
  status,
  ...rest
}: StatusPillProps) {

  const statusColor = statusColors[status];

  return (
    <Text
      fos={11}
      fow="500"
      color={statusColor.fg}
      bg={statusColor.bg}
      br="$full"
      tt="capitalize"
      py={1}
      px="$2"
      {...rest}
    >{status}</Text>
  )
}