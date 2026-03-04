"use client";
import { Badge, Box, Button, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import React, { useMemo, useEffect, useState } from "react";
import { Link } from "@chakra-ui/next-js";

const Repos = ({ username }) => {
	const toast = useToast();
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showMore, setShowMore] = useState(false);

	useEffect(() => {
		const fetchRepos = async () => {
			try {
				setLoading(true);
				const res = await fetch(`/api/github/repos?username=${encodeURIComponent(username)}`);
				const data = await res.json();
				if (!res.ok || data.message) throw new Error(data.message);
				setRepos(data);
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

		fetchRepos();
	}, [username, toast]);

	const sortedRepos = useMemo(() => {
		return [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
	}, [repos]);

	const visibleRepos = showMore ? sortedRepos : sortedRepos.slice(0, 5);

	return (
		<>
			<Text
				textAlign={"center"}
				letterSpacing={1}
				fontSize={{ base: "2xl", md: "3xl" }}
				fontWeight={"800"}
				color={"accent.200"}
				mt={10}
			>
				Top Repositories
			</Text>
			{loading && (
				<Flex justifyContent={"center"}>
					<Spinner size={"xl"} my={5} color='accent.400' thickness='4px' />
				</Flex>
			)}

			{!loading && sortedRepos.length === 0 && (
				<Text textAlign='center' mt={4} color='whiteAlpha.700'>
					No public repositories available.
				</Text>
			)}

			{visibleRepos.map((repo, idx) => (
				<Box
					key={repo.id}
					p={{ base: 4, md: 5 }}
					bg={"whiteAlpha.100"}
					my={4}
					borderRadius='xl'
					border='1px solid'
					borderColor='whiteAlpha.300'
					boxShadow='0 12px 28px rgba(0, 0, 0, 0.25)'
					animation='repo-rise 0.45s ease both'
					style={{ animationDelay: `${idx * 90}ms` }}
					_hover={{ transform: "translateY(-2px)", boxShadow: "0 18px 32px rgba(0, 0, 0, 0.35)" }}
					transition='all 0.2s ease'
				>
					<Flex direction={{ base: "column", md: "row" }} justifyContent='space-between' gap={4} alignItems='start'>
						<Flex flex={1} direction={"column"} gap={1}>
							<Link href={repo.html_url} isExternal fontSize={{ base: "lg", md: "xl" }} fontWeight={"700"} color='orange.100'>
								{repo.name}
							</Link>
							<Text color='whiteAlpha.800' noOfLines={2} fontSize='sm'>
								{repo.description || "No description provided for this repository."}
							</Text>
							<Badge fontSize={"0.75em"} colorScheme={"orange"} w={"fit-content"} px={2} py={1} mt={1}>
								Language: {repo.language || "None"}
							</Badge>
						</Flex>

						<Flex gap={3} w={{ base: "full", md: "auto" }} flexWrap='wrap'>
							<Badge fontSize={"0.82em"} colorScheme='orange' textAlign={"center"} px={3} py={2}>
								Stars: {repo.stargazers_count}
							</Badge>
							<Badge fontSize={"0.82em"} colorScheme='pink' textAlign={"center"} px={3} py={2}>
								Forks: {repo.forks_count}
							</Badge>
							<Badge fontSize={"0.82em"} colorScheme='cyan' textAlign={"center"} px={3} py={2}>
								Watchers: {repo.watchers_count}
							</Badge>
						</Flex>
					</Flex>
				</Box>
			))}

			{showMore && (
				<Flex justifyContent={"center"} my={4}>
					<Button
						size='md'
						bg='accent.500'
						color='surface.900'
						_hover={{ bg: "accent.400" }}
						onClick={() => setShowMore(false)}
					>
						Show Less
					</Button>
				</Flex>
			)}

			{!showMore && sortedRepos.length > 5 && (
				<Flex justifyContent={"center"} my={4}>
					<Button
						size='md'
						bg='accent.500'
						color='surface.900'
						_hover={{ bg: "accent.400" }}
						onClick={() => setShowMore(true)}
					>
						Show More
					</Button>
				</Flex>
			)}
		</>
	);
};

export default Repos;
