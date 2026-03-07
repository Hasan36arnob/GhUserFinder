"use client";
import { Badge, Box, Button, Container, Flex, Heading, Spinner, Text } from "@/app/chakra";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { useState } from "react";
import UserProfile from "./components/UserProfile";

export default function Home() {
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(false);

	return (
		<Container maxW='container.xl' py={{ base: 5, md: 8 }} px={{ base: 4, md: 8 }}>
			<Navbar />
			<Box
				bg='linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))'
				backdropFilter='blur(16px)'
				border='1px solid'
				borderColor='whiteAlpha.400'
				boxShadow='0 36px 96px rgba(0, 0, 0, 0.55)'
				borderRadius='2xl'
				px={{ base: 5, md: 10 }}
				py={{ base: 8, md: 12 }}
				position='relative'
				overflow='hidden'
			>
				<Box
					position='absolute'
					top='-80px'
					right='-60px'
					w='260px'
					h='260px'
					borderRadius='full'
					bg='radial-gradient(circle, rgba(255,190,110,0.35), rgba(255,190,110,0))'
					pointerEvents='none'
				/>
				<Heading
					as='h1'
					fontSize={{ base: "3xl", md: "5xl" }}
					letterSpacing='-0.04em'
					lineHeight={{ base: "1.15", md: "1.02" }}
					maxW='13ch'
					bgGradient='linear(to-r, orange.200, accent.300, orange.100)'
					bgClip='text'
				>
					GitHub discovery with a premium studio finish.
				</Heading>
				<Text mt={4} color='whiteAlpha.800' maxW='58ch' fontSize={{ base: "md", md: "lg" }}>
					Search developers instantly with refined UI, robust API handling, and high-signal repository insights.
				</Text>
				<Flex mt={5} gap={3} wrap='wrap'>
					<Badge px={3} py={1} borderRadius='full' bg='whiteAlpha.200' color='orange.100'>
						Fast Search
					</Badge>
					<Badge px={3} py={1} borderRadius='full' bg='whiteAlpha.200' color='orange.100'>
						Resilient API
					</Badge>
					<Badge px={3} py={1} borderRadius='full' bg='whiteAlpha.200' color='orange.100'>
						Premium Visuals
					</Badge>
				</Flex>
				<Box mt={{ base: 6, md: 8 }}>
					<Search setUserData={(res) => setUserData(res)} setLoading={setLoading} />
				</Box>

				<Flex
					mt={7}
					p={{ base: 4, md: 5 }}
					bg='linear-gradient(135deg, rgba(255,170,85,0.25), rgba(255,122,0,0.06))'
					border='1px solid'
					borderColor='orange.200'
					borderRadius='xl'
					direction={{ base: "column", md: "row" }}
					justify='space-between'
					align={{ base: "start", md: "center" }}
					gap={4}
				>
					<Box>
						<Text fontFamily='heading' fontSize='lg' fontWeight='700' color='orange.100'>
							Built for standout portfolios
						</Text>
						<Text color='orange.50' fontSize='sm'>
							No donation prompts, no noise. Just clean discovery, strong performance, and elite presentation.
						</Text>
					</Box>
					<Flex gap={3} direction={{ base: "column", sm: "row" }} w={{ base: "full", md: "auto" }}>
						<Button as='a' href='https://github.com' target='_blank' rel='noopener noreferrer' bg='orange.300' color='surface.900' _hover={{ bg: "orange.200", textDecoration: "none" }}>
							Open GitHub
						</Button>
						<Button as='a' href='https://docs.github.com/en/rest' target='_blank' rel='noopener noreferrer' bg='orange.100' color='surface.900' _hover={{ bg: "orange.200", textDecoration: "none" }}>
							API Docs
						</Button>
					</Flex>
				</Flex>
			</Box>

			{loading && !userData && (
				<Flex justify='center' mt={8}>
					<Spinner size='xl' thickness='4px' color='accent.400' />
				</Flex>
			)}

			{userData && <UserProfile userData={userData} />}
		</Container>
	);
}
