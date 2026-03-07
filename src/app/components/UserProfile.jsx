import { Avatar, Badge, Box, Button, Divider, Flex, HStack, Link, Text, VStack } from "@/app/chakra";
import PremiumReport from "./PremiumReport";
import Repos from "./Repos";

const normalizeExternalUrl = (value) => {
	if (!value || typeof value !== "string") {
		return null;
	}

	const trimmed = value.trim();
	if (!trimmed) {
		return null;
	}

	if (/^https?:\/\//i.test(trimmed)) {
		return trimmed;
	}

	return `https://${trimmed}`;
};

const UserProfile = ({ userData }) => {
	const blogHref = normalizeExternalUrl(userData.blog);
	const memberSince = Number.isNaN(new Date(userData.created_at).getTime())
		? "Not available"
		: new Date(userData.created_at).toLocaleDateString();

	const infoRows = [
		{ label: "Company", value: userData.company || "Not specified" },
		{ label: "Location", value: userData.location || "Not specified" },
		{ label: "Blog / Website", value: userData.blog || "Not specified", href: blogHref },
		{ label: "Member Since", value: memberSince },
	];

	return (
		<>
			<Flex
				direction={{ base: "column", lg: "row" }}
				gap={{ base: 8, lg: 12 }}
				mt={{ base: 8, md: 12 }}
				bg='whiteAlpha.100'
				backdropFilter='blur(10px)'
				border='1px solid'
				borderColor='whiteAlpha.300'
				borderRadius='2xl'
				p={{ base: 5, md: 8 }}
				boxShadow='0 18px 60px rgba(0, 0, 0, 0.35)'
			>
				<VStack gap={5} alignItems='center' minW={{ lg: "220px" }}>
					<Avatar
						size={"2xl"}
						name={userData.name}
						src={userData.avatar_url}
						border='4px solid'
						borderColor='accent.300'
						boxShadow='0 0 0 6px rgba(255, 122, 0, 0.18)'
					/>
					<Button
						as='a'
						href={userData.html_url}
						target='_blank'
						rel='noreferrer'
						bg='accent.500'
						color='surface.900'
						_hover={{ bg: "accent.400" }}
					>
						View Profile
					</Button>
				</VStack>

				<VStack alignItems={"self-start"} spacing={4} flex={1}>
					<Flex wrap='wrap' gap={3}>
						<Badge fontSize={"0.85em"} colorScheme='orange' px={2} py={1}>
							Public Repos: {userData.public_repos}
						</Badge>
						<Badge fontSize={"0.85em"} colorScheme='pink' px={2} py={1}>
							Public Gists: {userData.public_gists}
						</Badge>
						<Badge fontSize={"0.85em"} colorScheme='cyan' px={2} py={1}>
							Followers: {userData.followers}
						</Badge>
						<Badge fontSize={"0.85em"} colorScheme='teal' px={2} py={1}>
							Following: {userData.following}
						</Badge>
					</Flex>

					<HStack alignItems='center' spacing={3} pt={1}>
						<Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight={"800"} lineHeight={1} letterSpacing='-0.03em'>
							{userData.name || userData.login}
						</Text>
						<Text fontSize='md' color='whiteAlpha.700'>
							@{userData.login}
						</Text>
					</HStack>
					<Text fontSize={"md"} color={"whiteAlpha.900"} maxW='70ch'>
						{userData.bio || "No bio available."}
					</Text>

					<Divider borderColor='whiteAlpha.300' />

					<Box w='full'>
						{infoRows.map((item) => (
							<Flex key={item.label} py={2} gap={2} align='center' wrap='wrap'>
								<Text fontWeight={"700"} color={"accent.200"} minW='120px'>
									{item.label}:
								</Text>
								{item.href ? (
									<Link href={item.href} isExternal color='orange.100' textDecoration='underline'>
										{item.value}
									</Link>
								) : (
									<Text color='whiteAlpha.900'>{item.value}</Text>
								)}
							</Flex>
						))}
					</Box>
				</VStack>
			</Flex>

			<PremiumReport username={userData.login} />

			<Repos username={userData.login} />
		</>
	);
};

export default UserProfile;
