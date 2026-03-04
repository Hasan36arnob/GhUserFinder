"use client";
import { Badge, Box, Button, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import React, { useMemo, useEffect, useState } from "react";
import { Link } from "@chakra-ui/next-js";

const Repos = ({ reposUrl }) => {
	const toast = useToast();
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showMore, setShowMore] = useState(false);

	useEffect(() => {
		const fetchRepos = async () => {
			try {
				setLoading(true);
				const res = await fetch(reposUrl);
				const data = await res.json();
				if (data.message) throw new Error(data.message);
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
	}, [reposUrl, toast]);

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
				color={"ink.900"}
				mt={10}
			>
				Top Repositories
			</Text>
			{loading && (
				<Flex justifyContent={"center"}>
					<Spinner size={"xl"} my={5} color='brand.600' thickness='4px' />
				</Flex>
			)}

			{visibleRepos.map((repo, idx) => (
				<Box
					key={repo.id}
					p={{ base: 4, md: 5 }}
					bg={"whiteAlpha.700"}
					my={4}
					borderRadius='xl'
					border='1px solid'
					borderColor='blackAlpha.100'
					boxShadow='0 12px 28px rgba(17, 24, 39, 0.07)'
					animation='repo-rise 0.45s ease both'
					style={{ animationDelay: `${idx * 90}ms` }}
					_hover={{ transform: "translateY(-2px)", boxShadow: "0 18px 32px rgba(17, 24, 39, 0.1)" }}
					transition='all 0.2s ease'
				>
					<Flex direction={{ base: "column", md: "row" }} justifyContent='space-between' gap={4} alignItems='start'>
						<Flex flex={1} direction={"column"} gap={1}>
							<Link href={repo.html_url} fontSize={{ base: "lg", md: "xl" }} fontWeight={"700"} color='ink.900'>
								{repo.name}
							</Link>
							<Text color='blackAlpha.700' noOfLines={2} fontSize='sm'>
								{repo.description || "No description provided for this repository."}
							</Text>
							<Badge fontSize={"0.75em"} colorScheme={"green"} w={"fit-content"} px={2} py={1} mt={1}>
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
					<Button size='md' bg='ink.800' color='white' _hover={{ bg: "ink.700" }} onClick={() => setShowMore(false)}>
						Show Less
					</Button>
				</Flex>
			)}

			{!showMore && sortedRepos.length > 5 && (
				<Flex justifyContent={"center"} my={4}>
					<Button size='md' bg='ink.800' color='white' _hover={{ bg: "ink.700" }} onClick={() => setShowMore(true)}>
						Show More
					</Button>
				</Flex>
			)}
		</>
	);
};

export default Repos;
