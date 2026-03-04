"use client";
import { Button, Flex, Input, InputGroup, InputLeftElement, Text, useToast } from "@/app/chakra";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Search = ({ setUserData, setLoading }) => {
	const [query, setQuery] = useState("");
	const toast = useToast();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!query) return;
		setLoading(true);
		setUserData(null);
		try {
			const res = await fetch(`https://api.github.com/users/${query}`);
			const data = await res.json();

			if (data.message) {
				return toast({
					title: "Error",
					description: data.message === "Not Found" ? "User not found" : data.message,
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			}
			setUserData(data);
			addUserToLocalStorage(data, query);
		} catch (error) {
			toast({
				title: "Error",
				description: error.message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} finally {
			setLoading(false);
		}
	};

	const addUserToLocalStorage = (data, username) => {
		const users = JSON.parse(localStorage.getItem("github-users")) || [];
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

		localStorage.setItem("github-users", JSON.stringify(users));
	};

	return (
		<form onSubmit={handleSubmit}>
			<Flex direction={{ base: "column", md: "row" }} gap={3} align='stretch'>
				<InputGroup size='lg'>
					<InputLeftElement pointerEvents='none'>
						<SearchIcon color='blackAlpha.500' />
					</InputLeftElement>
					<Input
						variant='filled'
						placeholder='Type a username (example: torvalds)'
						focusBorderColor='brand.500'
						bg='whiteAlpha.900'
						_hover={{ bg: "white" }}
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						border='1px solid'
						borderColor='blackAlpha.100'
						rounded='full'
					/>
				</InputGroup>
				<Button
					size='lg'
					type='submit'
					bg='ink.800'
					color='white'
					_hover={{ bg: "ink.700", transform: "translateY(-1px)" }}
					_active={{ bg: "ink.900" }}
					disabled={!query}
					px={8}
				>
					Search Profile
				</Button>
			</Flex>
			<Text mt={3} color='blackAlpha.700' fontSize='sm'>
				Press Enter or click Search Profile to load user details and repositories.
			</Text>
		</form>
	);
};

export default Search;
