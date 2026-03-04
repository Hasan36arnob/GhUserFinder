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

	const getStoredUsers = () => {
		try {
			const parsed = JSON.parse(localStorage.getItem("github-users"));
			return Array.isArray(parsed) ? parsed : [];
		} catch {
			return [];
		}
	};

	useEffect(() => {
		try {
			const parsed = JSON.parse(localStorage.getItem("github-users"));
			setSearchHistory(Array.isArray(parsed) ? parsed : []);
		} catch {
			setSearchHistory([]);
		}
	}, []);

	const handleDeleteUser = (userId) => {
		const users = getStoredUsers();
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
			<ModalContent bg={"surface.900"} borderRadius='2xl' border='1px solid' borderColor='whiteAlpha.300'>
				<ModalHeader fontFamily='heading' fontWeight='800' color='accent.200'>
					Recent Searches
				</ModalHeader>
				<ModalBody>
					<Text color='whiteAlpha.800'>Users you searched for:</Text>
					<VStack gap={3} maxHeight={360} overflowY={"auto"} my={4} pr={1}>
						{searchHistory.length === 0 && (
							<Text color={"whiteAlpha.600"} fontSize={"sm"} fontWeight={"bold"}>
								No users searched yet.
							</Text>
						)}

						{searchHistory.map((user) => (
							<Flex
								key={user.id}
								alignItems={"center"}
								bg={"whiteAlpha.100"}
								w={"full"}
								_hover={{ bg: "whiteAlpha.200" }}
								borderRadius='xl'
								p={3}
								cursor={"pointer"}
								justifyContent={"space-between"}
								border='1px solid'
								borderColor='whiteAlpha.300'
							>
								<Flex gap={2} alignItems={"center"}>
									<Avatar display={"block"} size={"lg"} name={user.name} src={user.avatar_url} />
									<Box>
										<Text fontWeight={"700"}>{user.name || "User"}</Text>
										<Text fontSize={"sm"} color={"whiteAlpha.700"}>
											{user.id}
										</Text>
									</Box>
								</Flex>

								<Flex alignItems={"center"} gap={4}>
									<Link
										href={user.url}
										isExternal
										size={"sm"}
										color='surface.900'
										bg='accent.500'
										px={3}
										py={1}
										borderRadius='full'
										_hover={{ textDecoration: "none", bg: "accent.400" }}
									>
										Visit
									</Link>
									<Button
										size='sm'
										variant='ghost'
										colorScheme='red'
										onClick={() => handleDeleteUser(user.id)}
										aria-label={`Delete ${user.id} from history`}
									>
										<DeleteIcon />
									</Button>
								</Flex>
							</Flex>
						))}
					</VStack>
				</ModalBody>
				<ModalFooter>
					<Button onClick={onClose} bg='accent.500' color='surface.900' _hover={{ bg: "accent.400" }}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default HistoryModal;
