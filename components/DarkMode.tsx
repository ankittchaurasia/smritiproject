"use client"
import { useMantineColorScheme, ActionIcon } from '@mantine/core';
import { MoonStars, Sun } from 'tabler-icons-react';

export default function DarkMode(){
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
  
    return (
      <ActionIcon
        variant="outline"
        color={dark ? 'yellow' : 'teal'}
        onClick={toggleColorScheme}
        title="Toggle color scheme"
        size="md"
      >
        <Sun className='lighticon' size="1.1rem" />
        <MoonStars className='darkicon' size="1.1rem" />
      </ActionIcon>
    );
  }