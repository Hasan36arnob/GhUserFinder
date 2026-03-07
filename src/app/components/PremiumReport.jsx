"use client";
import { Badge, Box, Button, Flex, ListItem, Text, UnorderedList, useToast } from "@/app/chakra";
import { useState } from "react";

const PremiumReport = ({ username }) => {
	const toast = useToast();
	const [loading, setLoading] = useState(false);
	const [report, setReport] = useState(null);

	const generateReport = async () => {
		try {
			setLoading(true);
			const res = await fetch(`/api/github/premium-report?username=${encodeURIComponent(username)}`);
			const data = await res.json();
			if (!res.ok) throw new Error(data?.message || "Failed to generate report.");
			setReport(data);
		} catch (error) {
			toast({
				title: "Error",
				description: error?.message || "Failed to generate report.",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} finally {
			setLoading(false);
		}
	};

	const copyReport = async () => {
		if (!report) return;
		const text = [
			`Premium Report for @${report.username}`,
			`Score: ${report.score}/100 (${report.tier})`,
			`Decision: ${report.decision}`,
			`Summary: ${report.summary}`,
			`Strengths: ${report.strengths.join(" | ")}`,
			`Risks: ${report.risks.join(" | ")}`,
			`Next Steps: ${report.nextSteps.join(" | ")}`,
		].join("\n");

		try {
			await navigator.clipboard.writeText(text);
			toast({
				title: "Copied",
				description: "Premium report copied to clipboard.",
				status: "success",
				duration: 2500,
				isClosable: true,
			});
		} catch {
			toast({
				title: "Copy failed",
				description: "Could not copy report text.",
				status: "warning",
				duration: 2500,
				isClosable: true,
			});
		}
	};

	return (
		<Box mt={6} p={{ base: 4, md: 5 }} borderRadius='xl' border='1px solid' borderColor='whiteAlpha.300' bg='whiteAlpha.100'>
			<Flex justify='space-between' align={{ base: "start", md: "center" }} direction={{ base: "column", md: "row" }} gap={3}>
				<Box>
					<Text fontSize='xl' fontWeight='800' color='accent.200'>
						Premium Report
					</Text>
					<Text color='whiteAlpha.800' fontSize='sm'>
						Click once to get a clear hiring report for this profile.
					</Text>
				</Box>
				<Flex gap={2} w={{ base: "full", md: "auto" }}>
					<Button onClick={generateReport} isLoading={loading} loadingText='Generating' bg='accent.500' color='surface.900' _hover={{ bg: "accent.400" }}>
						Generate Premium Report
					</Button>
					{report && (
						<Button onClick={copyReport} bg='orange.100' color='surface.900' _hover={{ bg: "orange.200" }}>
							Copy
						</Button>
					)}
				</Flex>
			</Flex>

			{report && (
				<Box mt={4}>
					<Flex gap={2} wrap='wrap'>
						<Badge bg='orange.200' color='surface.900' px={3} py={1}>
							Score {report.score}/100
						</Badge>
						<Badge bg='pink.200' color='surface.900' px={3} py={1}>
							Tier {report.tier}
						</Badge>
						<Badge bg='cyan.200' color='surface.900' px={3} py={1}>
							Decision: {report.decision}
						</Badge>
					</Flex>

					<Text mt={3} color='whiteAlpha.900'>
						{report.summary}
					</Text>

					<Flex mt={4} direction={{ base: "column", md: "row" }} gap={4}>
						<Box flex={1}>
							<Text fontWeight='700' color='orange.100'>Strengths</Text>
							<UnorderedList mt={2} color='whiteAlpha.900' spacing={1}>
								{report.strengths.map((item) => (
									<ListItem key={item}>{item}</ListItem>
								))}
							</UnorderedList>
						</Box>
						<Box flex={1}>
							<Text fontWeight='700' color='orange.100'>Risks</Text>
							<UnorderedList mt={2} color='whiteAlpha.900' spacing={1}>
								{report.risks.map((item) => (
									<ListItem key={item}>{item}</ListItem>
								))}
							</UnorderedList>
						</Box>
					</Flex>
				</Box>
			)}
		</Box>
	);
};

export default PremiumReport;

