import { Box, Button, Container, Heading, Text } from "@/app/chakra";
import Link from "next/link";

export default function NotFound() {
	return (
		<Container maxW='container.md' py={14}>
			<Box
				p={{ base: 6, md: 8 }}
				bg='whiteAlpha.100'
				border='1px solid'
				borderColor='whiteAlpha.200'
				rounded='2xl'
				textAlign='center'
			>
				<Heading fontSize={{ base: "2xl", md: "3xl" }} color='accent.300'>
					Page not found
				</Heading>
				<Text mt={3} color='whiteAlpha.800'>
					The page you requested does not exist.
				</Text>
				<Button as={Link} href='/' mt={6} bg='accent.500' color='black' _hover={{ bg: "accent.400" }}>
					Back to Home
				</Button>
			</Box>
		</Container>
	);
}
