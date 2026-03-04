"use client";
import { Box, Container, Heading, Text } from "@/app/chakra";
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
				bg='whiteAlpha.700'
				backdropFilter='blur(12px)'
				border='1px solid'
				borderColor='blackAlpha.100'
				boxShadow='0 18px 60px rgba(39, 63, 49, 0.14)'
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
				>
					Find any GitHub developer profile instantly.
				</Heading>
				<Text mt={4} color='blackAlpha.800' maxW='58ch' fontSize={{ base: "md", md: "lg" }}>
					Search by username to inspect reputation, activity stats, and top repositories in a clean and focused
					dashboard.
				</Text>
				<Box mt={{ base: 6, md: 8 }}>
					<Search setUserData={(res) => setUserData(res)} setLoading={setLoading} />
				</Box>
			</Box>

			{userData && <UserProfile userData={userData} />}
		</Container>
	);
}
