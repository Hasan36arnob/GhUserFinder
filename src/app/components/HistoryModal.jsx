"use client";
import { DeleteIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import {
	Avatar,
	Box,
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const HistoryModal = ({ isOpen, onClose }) => {
	const [searchHistory, setSearchHistory] = useState([]);
	const toast = useToast();

	useEffect(() => {
		const users = JSON.parse(localStorage.getItem("github-users")) || [];
		setSearchHistory(users);
	}, []);

	const handleDeleteUser = (userId) => {
		const users = JSON.parse(localStorage.getItem("github-users")) || [];
		const userToDelete = users.find((user) => user.id === userId);
		if (userToDelete) users.splice(users.indexOf(userToDelete), 1);

		localStorage.setItem("github-users", JSON.stringify(users));
		setSearchHistory(users);
		toast({
			title: "Success",
			description: "User deleted successfully",
			status: "success",
			duration: 3000,
			isClosable: true,
		});
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered size='xl'>
			<ModalOverlay bg='blackAlpha.500' backdropFilter='blur(4px)' />
			<ModalContent bg={"white"} borderRadius='2xl' border='1px solid' borderColor='blackAlpha.100'>
				<ModalHeader fontFamily='heading' fontWeight='800'>
					Recent Searches
				</ModalHeader>
				<ModalBody>
					<Text color='blackAlpha.700'>Users you searched for:</Text>
					<VStack gap={3} maxHeight={360} overflowY={"auto"} my={4} pr={1}>
						{searchHistory.length === 0 && (
							<Text color={"blackAlpha.500"} fontSize={"sm"} fontWeight={"bold"}>
								No users searched yet.
							</Text>
						)}

						{searchHistory.map((user) => (
							<Flex
								key={user.id}
								alignItems={"center"}
								bg={"blackAlpha.50"}
								w={"full"}
								_hover={{ bg: "blackAlpha.100" }}
								borderRadius='xl'
								p={3}
								cursor={"pointer"}
								justifyContent={"space-between"}
								border='1px solid'
								borderColor='blackAlpha.100'
							>
								<Flex gap={2} alignItems={"center"}>
									<Avatar display={"block"} size={"lg"} name={user.name} src={user.avatar_url} />
									<Box>
										<Text fontWeight={"700"}>{user.name || "User"}</Text>
										<Text fontSize={"sm"} color={"blackAlpha.600"}>
											{user.id}
										</Text>
									</Box>
								</Flex>

								<Flex alignItems={"center"} gap={4}>
									<Link
										href={user.url}
										isExternal
										size={"sm"}
										color='white'
										bg='brand.500'
										px={3}
										py={1}
										borderRadius='full'
										_hover={{ textDecoration: "none", bg: "brand.600" }}
									>
										Visit
									</Link>
									<DeleteIcon color='red.500' onClick={() => handleDeleteUser(user.id)} />
								</Flex>
							</Flex>
						))}
					</VStack>
				</ModalBody>
				<ModalFooter>
					<Button onClick={onClose} bg='ink.800' color='white' _hover={{ bg: "ink.700" }}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default HistoryModal;
