"use client";
import { Button, Flex, Input, InputGroup, InputLeftElement, Text, useToast } from "@/app/chakra";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Search = ({ setUserData, setLoading }) => {
	const [query, setQuery] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const toast = useToast();

	const getStoredUsers = () => {
		try {
			const parsed = JSON.parse(localStorage.getItem("github-users"));
			return Array.isArray(parsed) ? parsed : [];
		} catch {
			return [];
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const normalizedQuery = query.trim();
		if (!normalizedQuery) return;

		if (!/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(normalizedQuery)) {
			toast({
				title: "Invalid username",
				description: "Use a valid GitHub username format.",
				status: "warning",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		setIsSubmitting(true);
		setLoading(true);
		setUserData(null);

		try {
			const res = await fetch(`/api/github/users/${encodeURIComponent(normalizedQuery)}`);
			const data = await res.json();

			if (!res.ok || data.message) {
				return toast({
					title: "Error",
					description: data.message === "Not Found" ? "User not found" : data.message,
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			}
			setUserData(data);
			addUserToLocalStorage(data, normalizedQuery);
			setQuery("");
		} catch (error) {
			toast({
				title: "Error",
				description: error.message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} finally {
			setIsSubmitting(false);
			setLoading(false);
		}
	};

	const addUserToLocalStorage = (data, username) => {
		const users = getStoredUsers();
		const userExists = users.find((user) => user.id === username);

		if (userExists) {
			users.splice(users.indexOf(userExists), 1);
		}
		users.unshift({
			id: username,
			avatar_url: data.avatar_url,
			name: data.name,
			url: data.html_url,
		});

		const trimmedUsers = users.slice(0, 20);
		localStorage.setItem("github-users", JSON.stringify(trimmedUsers));
	};

	return (
		<form onSubmit={handleSubmit}>
			<Flex direction={{ base: "column", md: "row" }} gap={3} align='stretch'>
				<InputGroup size='lg'>
					<InputLeftElement pointerEvents='none'>
						<SearchIcon color='accent.300' />
					</InputLeftElement>
					<Input
						variant='filled'
						placeholder='Type a username (example: torvalds)'
						focusBorderColor='accent.500'
						bg='whiteAlpha.100'
						color='white'
						_hover={{ bg: "whiteAlpha.200" }}
						_placeholder={{ color: "whiteAlpha.500" }}
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						border='1px solid'
						borderColor='whiteAlpha.300'
						rounded='full'
						aria-label='GitHub username input'
					/>
				</InputGroup>
				<Button
					size='lg'
					type='submit'
					bg='accent.500'
					color='surface.900'
					_hover={{ bg: "accent.400", transform: "translateY(-1px)" }}
					_active={{ bg: "accent.600" }}
					isDisabled={!query.trim()}
					isLoading={isSubmitting}
					loadingText='Searching'
					px={8}
				>
					Search Profile
				</Button>
			</Flex>
			<Text mt={3} color='whiteAlpha.700' fontSize='sm'>
				Press Enter to search. Results are fetched through secure server routes for production usage.
			</Text>
		</form>
	);
};

export default Search;
