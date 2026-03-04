"use client";
import { Box, Button, Container, Heading, Text } from "@/app/chakra";

export default function Error({ error, reset }) {
	return (
		<Container maxW='container.md' py={14}>
			<Box
				p={{ base: 6, md: 8 }}
				bg='whiteAlpha.100'
				border='1px solid'
				borderColor='whiteAlpha.200'
				rounded='2xl'
			>
				<Heading fontSize={{ base: "2xl", md: "3xl" }} color='accent.300'>
					Something went wrong
				</Heading>
				<Text mt={3} color='whiteAlpha.800'>
					{error?.message || "An unexpected error occurred."}
				</Text>
				<Button mt={6} onClick={reset} bg='accent.500' color='black' _hover={{ bg: "accent.400" }}>
					Try Again
				</Button>
			</Box>
		</Container>
	);
}
