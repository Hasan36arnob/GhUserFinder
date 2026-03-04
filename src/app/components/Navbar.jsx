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
					boxSize={{ base: "48px", md: "56px" }}
					bg='white'
					borderRadius='xl'
					border='1px solid'
					borderColor='blackAlpha.100'
					boxShadow='0 10px 24px rgba(31, 41, 55, 0.08)'
					p={2}
				>
					<Image src={"/logo.png"} fill alt='github logo' />
				</Box>
				<Box>
					<Text fontFamily='heading' fontWeight='700' letterSpacing='-0.02em'>
						GitHub Lens
					</Text>
					<Text fontSize='sm' color='blackAlpha.700'>
						Developer Explorer
					</Text>
				</Box>
			</Flex>
			<Box ml='auto'>
				<Button
					size='md'
					bg='brand.500'
					color='white'
					_hover={{ bg: "brand.600", transform: "translateY(-1px)" }}
					_active={{ bg: "brand.700" }}
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
