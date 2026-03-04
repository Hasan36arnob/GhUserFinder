"use client";
import { Box, Button, Container, Flex, Heading, Link, Spinner, Text, useToast } from "@/app/chakra";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { useState } from "react";
import UserProfile from "./components/UserProfile";
import { CopyIcon } from "@chakra-ui/icons";

export default function Home() {
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const handleCopyNumber = async () => {
		try {
			await navigator.clipboard.writeText("01915215080");
			toast({
				title: "Copied",
				description: "bKash number copied: 01915215080",
				status: "success",
				duration: 2500,
				isClosable: true,
			});
		} catch (error) {
			toast({
				title: "Copy failed",
				description: "Please copy manually: 01915215080",
				status: "warning",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Container maxW='container.xl' py={{ base: 5, md: 8 }} px={{ base: 4, md: 8 }}>
			<Navbar />
			<Box
				bg='whiteAlpha.100'
				backdropFilter='blur(12px)'
				border='1px solid'
				borderColor='whiteAlpha.300'
				boxShadow='0 28px 80px rgba(0, 0, 0, 0.45)'
				borderRadius='2xl'
				px={{ base: 5, md: 10 }}
				py={{ base: 8, md: 12 }}
			>
				<Heading
					as='h1'
					fontSize={{ base: "3xl", md: "5xl" }}
					letterSpacing='-0.04em'
					lineHeight={{ base: "1.15", md: "1.02" }}
					maxW='12ch'
					bgGradient='linear(to-r, orange.200, accent.300, orange.100)'
					bgClip='text'
				>
					Find any GitHub developer profile instantly.
				</Heading>
				<Text mt={4} color='whiteAlpha.800' maxW='58ch' fontSize={{ base: "md", md: "lg" }}>
					Production-grade GitHub search experience with secure APIs, resilient states, and premium dark visuals.
				</Text>
				<Box mt={{ base: 6, md: 8 }}>
					<Search setUserData={(res) => setUserData(res)} setLoading={setLoading} />
				</Box>

				<Flex
					mt={7}
					p={{ base: 4, md: 5 }}
					bg='linear-gradient(135deg, rgba(255,122,0,0.24), rgba(255,122,0,0.1))'
					border='1px solid'
					borderColor='orange.300'
					borderRadius='xl'
					direction={{ base: "column", md: "row" }}
					justify='space-between'
					align={{ base: "start", md: "center" }}
					gap={4}
				>
					<Box>
						<Text fontFamily='heading' fontSize='lg' fontWeight='700' color='orange.100'>
							Support the work
						</Text>
						<Text color='orange.50' fontSize='sm'>
							If you like this design, donate via bKash: <Text as='span' fontWeight='700'>01915215080</Text>
						</Text>
					</Box>
					<Flex gap={3} direction={{ base: "column", sm: "row" }} w={{ base: "full", md: "auto" }}>
						<Button
							as={Link}
							href='tel:01915215080'
							leftIcon={<CopyIcon />}
							bg='orange.300'
							color='surface.900'
							_hover={{ bg: "orange.200", textDecoration: "none" }}
						>
							Donate Link
						</Button>
						<Button leftIcon={<CopyIcon />} onClick={handleCopyNumber} bg='orange.100' color='surface.900' _hover={{ bg: "orange.200" }}>
							Copy Number
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
