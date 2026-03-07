import { Box, Button, Flex, Text, useDisclosure } from "@/app/chakra";
import { Image } from "@/app/chakra-next";
import HistoryModal from "./HistoryModal";

const Navbar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex justifyContent={"space-between"} py={2} mb={6} alignItems={"center"} gap={4}>
			<Flex alignItems='center' gap={3}>
				<Box
					position={"relative"}
					aspectRatio={1}
					boxSize={{ base: "54px", md: "62px" }}
					bg='linear-gradient(145deg, #ff9f3f, #ff7a00)'
					borderRadius='xl'
					border='1px solid'
					borderColor='orange.100'
					boxShadow='0 14px 28px rgba(255, 122, 0, 0.35)'
					p={2}
				>
					<Image src={"/logo.png"} fill alt='GitHub logo' style={{ filter: "invert(1) contrast(1.2)" }} />
				</Box>
				<Box>
					<Text fontFamily='heading' fontWeight='700' letterSpacing='-0.02em' color='orange.100'>
						GitHub Lens
					</Text>
					<Text fontSize='sm' color='whiteAlpha.700'>
						Free Report Studio
					</Text>
				</Box>
			</Flex>
			<Box ml='auto'>
				<Button
					size='md'
					bg='accent.500'
					color='surface.900'
					_hover={{ bg: "accent.400", transform: "translateY(-1px)" }}
					_active={{ bg: "accent.600" }}
					transition='all 0.2s ease'
					onClick={onOpen}
				>
					Search History
				</Button>
			</Box>

			{isOpen && <HistoryModal isOpen={isOpen} onClose={onClose} />}
		</Flex>
	);
};

export default Navbar;
