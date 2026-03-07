"use client";
import { Badge, Box, Button, Container, Flex, Heading, Spinner, Text } from "@/app/chakra";
import Script from "next/script";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { useState } from "react";
import UserProfile from "./components/UserProfile";

const BKASH_NUMBER = "01915215080";
const WHATSAPP_NUMBER = "01943739336";
const WHATSAPP_LINK = `https://wa.me/8801943739336?text=${encodeURIComponent("Hi, I want the free premium report.")}`;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function Home() {
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(false);

	const serviceJsonLd = {
		"@context": "https://schema.org",
		"@type": "Service",
		name: "GitHub Lens Hiring Report",
		serviceType: "Simple GitHub profile review report",
		provider: {
			"@type": "Organization",
			name: "GitHub Lens",
			url: SITE_URL,
		},
		areaServed: "Worldwide",
		url: SITE_URL,
		offers: {
			"@type": "Offer",
			priceCurrency: "BDT",
			price: "0",
			availability: "https://schema.org/InStock",
		},
	};

	return (
		<Container maxW='container.xl' py={{ base: 5, md: 8 }} px={{ base: 4, md: 8 }}>
			<Script id='service-jsonld' type='application/ld+json'>
				{JSON.stringify(serviceJsonLd)}
			</Script>
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
					maxW='14ch'
					bgGradient='linear(to-r, orange.200, accent.300, orange.100)'
					bgClip='text'
				>
					Check any GitHub profile in seconds.
				</Heading>
				<Text mt={4} color='whiteAlpha.800' maxW='60ch' fontSize={{ base: "md", md: "lg" }}>
					Get a clear report with strengths, risks, and a simple hiring recommendation.
				</Text>
				<Flex mt={5} gap={3} wrap='wrap'>
					<Badge px={3} py={1} borderRadius='full' bg='whiteAlpha.200' color='orange.100'>
						Easy to use
					</Badge>
					<Badge px={3} py={1} borderRadius='full' bg='whiteAlpha.200' color='orange.100'>
						Clear report
					</Badge>
					<Badge px={3} py={1} borderRadius='full' bg='whiteAlpha.200' color='orange.100'>
						Fast results
					</Badge>
				</Flex>
				<Box mt={{ base: 6, md: 8 }}>
					<Search setUserData={(res) => setUserData(res)} setLoading={setLoading} />
				</Box>
				<Flex mt={6} gap={3} wrap='wrap'>
					<Badge bg='orange.200' color='surface.900' px={3} py={1}>
						1,000+ profiles analyzed
					</Badge>
					<Badge bg='pink.200' color='surface.900' px={3} py={1}>
						Free report in under 1 minute
					</Badge>
					<Badge bg='cyan.200' color='surface.900' px={3} py={1}>
						Direct WhatsApp support
					</Badge>
				</Flex>

				<Flex
					mt={6}
					p={{ base: 4, md: 5 }}
					borderRadius='xl'
					border='1px solid'
					borderColor='orange.200'
					bg='linear-gradient(135deg, rgba(255,170,85,0.22), rgba(255,122,0,0.07))'
					direction={{ base: "column", md: "row" }}
					align={{ base: "start", md: "center" }}
					justify='space-between'
					gap={3}
				>
					<Box>
						<Text color='orange.100' fontWeight='700'>Get your free report now</Text>
						<Text color='whiteAlpha.800' fontSize='sm'>
							Send username on WhatsApp and get a plain-language profile decision quickly.
						</Text>
					</Box>
					<Flex gap={2} w={{ base: "full", md: "auto" }} direction={{ base: "column", sm: "row" }}>
						<Button as='a' href={WHATSAPP_LINK} target='_blank' rel='noopener noreferrer' bg='orange.300' color='surface.900' _hover={{ bg: "orange.200", textDecoration: "none" }}>
							Get Free Report
						</Button>
						<Button as='a' href={`tel:${BKASH_NUMBER}`} bg='orange.100' color='surface.900' _hover={{ bg: "orange.200", textDecoration: "none" }}>
							Donate on bKash
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

			<Box
				position='fixed'
				right={{ base: 3, md: 6 }}
				bottom={{ base: 3, md: 6 }}
				zIndex={20}
				bg='linear-gradient(145deg, rgba(255,255,255,0.16), rgba(255,255,255,0.08))'
				backdropFilter='blur(12px)'
				border='1px solid'
				borderColor='whiteAlpha.400'
				borderRadius='xl'
				p={3}
				w={{ base: "220px", md: "250px" }}
				boxShadow='0 14px 34px rgba(0,0,0,0.35)'
			>
				<Text fontSize='xs' color='orange.100' letterSpacing={0.6} fontWeight='700'>
					DONATE VIA BKASH
				</Text>
				<Text mt={1} fontSize='sm' color='whiteAlpha.900'>
					bKash: {BKASH_NUMBER}
				</Text>
				<Text fontSize='sm' color='whiteAlpha.900'>
					WhatsApp: {WHATSAPP_NUMBER}
				</Text>
				<Flex mt={2} gap={2}>
					<Button as='a' href={`tel:${BKASH_NUMBER}`} size='xs' bg='orange.300' color='surface.900' _hover={{ bg: "orange.200", textDecoration: "none" }}>
						bKash
					</Button>
					<Button as='a' href={WHATSAPP_LINK} target='_blank' rel='noopener noreferrer' size='xs' bg='orange.100' color='surface.900' _hover={{ bg: "orange.200", textDecoration: "none" }}>
						WhatsApp
					</Button>
				</Flex>
			</Box>
		</Container>
	);
}
