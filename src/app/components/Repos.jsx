"use client";
import { Badge, Box, Button, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import React, { useMemo, useEffect, useState } from "react";
import { Link } from "@chakra-ui/next-js";

const USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
const DEFAULT_ERROR_MESSAGE = "Unable to load repositories right now.";

const Repos = ({ username }) => {
	const toast = useToast();
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showMore, setShowMore] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const numberFormatter = useMemo(() => new Intl.NumberFormat(), []);

	useEffect(() => {
		setShowMore(false);
	}, [username]);

	useEffect(() => {
		if (!username || !USERNAME_REGEX.test(username.trim())) {
			setRepos([]);
			setErrorMessage("Invalid GitHub username.");
			setLoading(false);
			return undefined;
		}

		const controller = new AbortController();

		const fetchRepos = async () => {
			try {
				setLoading(true);
				setErrorMessage("");
				const res = await fetch(`/api/github/repos?username=${encodeURIComponent(username.trim())}`, {
					signal: controller.signal,
				});

				let data = null;
				try {
					data = await res.json();
				} catch {
					data = null;
				}

				if (!res.ok) {
					throw new Error(data?.message || DEFAULT_ERROR_MESSAGE);
				}

				if (!Array.isArray(data)) {
					throw new Error("Unexpected repository payload.");
				}

				setRepos(data);
			} catch (error) {
				if (error?.name === "AbortError") {
					return;
				}

				const message = error?.message || DEFAULT_ERROR_MESSAGE;
				setErrorMessage(message);
				toast({
					title: "Error",
					description: message,
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			} finally {
				if (!controller.signal.aborted) {
					setLoading(false);
				}
			}
		};

		fetchRepos();
		return () => controller.abort();
	}, [username, toast]);

	const sortedRepos = useMemo(() => {
		return [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
	}, [repos]);

	const visibleRepos = showMore ? sortedRepos : sortedRepos.slice(0, 5);

	return (
		<>
			<Flex align='center' justify='space-between' mt={10} mb={4} gap={3} wrap='wrap'>
				<Text letterSpacing={1} fontSize={{ base: "2xl", md: "3xl" }} fontWeight={"800"} color={"accent.200"}>
					Top Repositories
				</Text>
				<Badge px={3} py={1} borderRadius='full' bg='whiteAlpha.200' color='orange.100' fontSize='0.72em'>
					Sorted by stars
				</Badge>
			</Flex>
			{loading && (
				<Flex justifyContent={"center"}>
					<Spinner size={"xl"} my={5} color='accent.400' thickness='4px' />
				</Flex>
			)}

			{!loading && sortedRepos.length === 0 && (
				<Text textAlign='center' mt={4} color='whiteAlpha.700'>
					{errorMessage || "No public repositories available."}
				</Text>
			)}

			{visibleRepos.map((repo, idx) => (
				<Box
					key={repo.id}
					p={{ base: 4, md: 5 }}
					bg='linear-gradient(145deg, rgba(255,255,255,0.13), rgba(255,255,255,0.05))'
					my={4}
					borderRadius='xl'
					border='1px solid'
					borderColor='whiteAlpha.400'
					boxShadow='0 14px 34px rgba(0, 0, 0, 0.3)'
					animation='repo-rise 0.45s ease both'
					style={{ animationDelay: `${idx * 90}ms` }}
					_hover={{ transform: "translateY(-3px)", boxShadow: "0 22px 38px rgba(0, 0, 0, 0.4)" }}
					transition='all 0.2s ease'
				>
					<Flex direction={{ base: "column", md: "row" }} justifyContent='space-between' gap={4} alignItems='start'>
						<Flex flex={1} direction={"column"} gap={1}>
							<Badge w='fit-content' mb={1} colorScheme='yellow'>{`#${idx + 1}`}</Badge>
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
							<Badge fontSize={"0.82em"} bg='orange.200' color='surface.900' textAlign={"center"} px={3} py={2}>
								Stars: {numberFormatter.format(repo.stargazers_count)}
							</Badge>
							<Badge fontSize={"0.82em"} bg='pink.200' color='surface.900' textAlign={"center"} px={3} py={2}>
								Forks: {numberFormatter.format(repo.forks_count)}
							</Badge>
							<Badge fontSize={"0.82em"} bg='cyan.200' color='surface.900' textAlign={"center"} px={3} py={2}>
								Watchers: {numberFormatter.format(repo.watchers_count)}
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
