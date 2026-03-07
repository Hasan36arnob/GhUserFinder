"use client";
import { Badge, Box, Button, Container, Flex, Heading, Spinner, Text } from "@/app/chakra";
import Script from "next/script";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { useState } from "react";
import UserProfile from "./components/UserProfile";

const BKASH_NUMBER = "01915215080";
const WHATSAPP_NUMBER = "01943739336";
const WHATSAPP_LINK = `https://wa.me/8801943739336?text=${encodeURIComponent("Hi, I want the GitHub Lens premium audit package.")}`;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function Home() {
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(false);

	const serviceJsonLd = {
		"@context": "https://schema.org",
		"@type": "Service",
		name: "GitHub Lens Premium Audit",
		serviceType: "GitHub profile analysis",
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
			price: "299",
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
					Use GitHub data to close your first paying client.
				</Heading>
				<Text mt={4} color='whiteAlpha.800' maxW='60ch' fontSize={{ base: "md", md: "lg" }}>
					Analyze developers in seconds, then offer premium GitHub audits for hiring teams, agencies, and founders.
				</Text>
				<Flex mt={5} gap={3} wrap='wrap'>
					<Badge px={3} py={1} borderRadius='full' bg='whiteAlpha.200' color='orange.100'>
						SEO Friendly
					</Badge>
					<Badge px={3} py={1} borderRadius='full' bg='whiteAlpha.200' color='orange.100'>
						Conversion Ready
					</Badge>
					<Badge px={3} py={1} borderRadius='full' bg='whiteAlpha.200' color='orange.100'>
						Clear Offer
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
							Launch Offer: Premium Audit (BDT 299)
						</Text>
						<Text color='orange.50' fontSize='sm'>
							Promise a clear deliverable: profile score, repo quality notes, and hiring recommendation.
						</Text>
					</Box>
					<Flex gap={3} direction={{ base: "column", sm: "row" }} w={{ base: "full", md: "auto" }}>
						<Button as='a' href={WHATSAPP_LINK} target='_blank' rel='noopener noreferrer' bg='orange.300' color='surface.900' _hover={{ bg: "orange.200", textDecoration: "none" }}>
							Book on WhatsApp
						</Button>
						<Button as='a' href={`tel:${BKASH_NUMBER}`} bg='orange.100' color='surface.900' _hover={{ bg: "orange.200", textDecoration: "none" }}>
							Pay via bKash
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

			<Flex mt={10} mb={20} direction={{ base: "column", lg: "row" }} gap={5} align='stretch'>
				<Box flex={1} p={5} borderRadius='xl' border='1px solid' borderColor='whiteAlpha.300' bg='whiteAlpha.100'>
					<Text fontSize='xl' fontWeight='800' color='accent.200'>Why buyers pay</Text>
					<Text mt={2} color='whiteAlpha.800'>
						They want faster technical screening with less risk. Your audit gives them a decision-ready summary.
					</Text>
				</Box>
				<Box flex={1} p={5} borderRadius='xl' border='1px solid' borderColor='whiteAlpha.300' bg='whiteAlpha.100'>
					<Text fontSize='xl' fontWeight='800' color='accent.200'>Simple pricing ladder</Text>
					<Text mt={2} color='whiteAlpha.800'>
						Start with BDT 299, then upsell deeper reports and shortlist packages for teams.
					</Text>
				</Box>
				<Box flex={1} p={5} borderRadius='xl' border='1px solid' borderColor='whiteAlpha.300' bg='whiteAlpha.100'>
					<Text fontSize='xl' fontWeight='800' color='accent.200'>One-step conversion</Text>
					<Text mt={2} color='whiteAlpha.800'>
						User sees value, taps WhatsApp, and pays by bKash. Low friction gets you your first revenue faster.
					</Text>
				</Box>
			</Flex>

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
					SUPPORT / CONTACT
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
