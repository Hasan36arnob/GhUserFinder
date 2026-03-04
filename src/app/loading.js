import { Box, Container, Flex, Skeleton, SkeletonText } from "@/app/chakra";

export default function Loading() {
	return (
		<Container maxW='container.xl' py={8}>
			<Box
				p={{ base: 6, md: 8 }}
				bg='whiteAlpha.100'
				border='1px solid'
				borderColor='whiteAlpha.200'
				rounded='2xl'
			>
				<Skeleton h='36px' w={{ base: "80%", md: "56%" }} startColor='surface.700' endColor='surface.500' />
				<SkeletonText mt='6' noOfLines={3} spacing='4' skeletonHeight='3' startColor='surface.700' endColor='surface.500' />
				<Flex mt={6} gap={3}>
					<Skeleton h='48px' flex={1} rounded='full' startColor='surface.700' endColor='surface.500' />
					<Skeleton h='48px' w='180px' rounded='full' startColor='surface.700' endColor='surface.500' />
				</Flex>
			</Box>
		</Container>
	);
}
