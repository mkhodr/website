
import React, { useState, useEffect, useRef } from 'react'
import { Box, Flex, Avatar, Text, Button, IconButton, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack, useColorMode, Center, HStack, } from '@chakra-ui/react'
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'
import { MoonIcon, SunIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons'

// Defining the menu options
const Links = {'HOME':'/', 'ISS':'iss', 'SIM':'particles'}

const NavLink = ({name, href}) => {
  return (
      <Box
        as="a"
        px={2}
        py={1}
        height={'35px'}
        width={'100px'}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={`${href}`}>
        <Text fontWeight={600}>{name}</Text>
      </Box>
  );
};

export default function Navbar() {
  const MenuItems = Object.entries(Links).map(([name, href]) => (
    <NavLink key={name} name={name} href={href}></NavLink>
  ));

  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('gray.300', 'gray.900')
  const bglogo = useColorModeValue('cyan.900', 'blue.900')

  return (
    <>
      <Box w={"calc(100% + 2rem)"} ml="-1rem" px={'5vw'} bg={bg}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
            <Center zIndex={2000} fontWeight={500} rounded={5} bg={bglogo} boxSize={'80px'}><SunIcon />KHODR</Center>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {MenuItems}
            </HStack>
        </HStack>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={''}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'lg'}
                      src={''}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
        {isOpen ? (
          <HStack zIndex={1000} w={'53vw'} pl={0} roundedBottom={10} bg={bg} position={'absolute'} left={0} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={1} alignItems={'center'}>
              {MenuItems}
            </Stack>
          </HStack>
        ) : null}
      </Box>
    </>
  )
}