"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";

type ChatMsg = { role: "user" | "assistant"; content: string };

export default function Home() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;

    const userMsg: ChatMsg = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    setMessages((m) => [
      ...m,
      { role: "assistant", content: data.reply ?? "No response." },
    ]);

    setLoading(false);
  }

  return (
    <Container maxW="3xl" py={10}>
      <Stack gap={4}>
        <Text fontSize="2xl" fontWeight="bold">
          MOM Chat POC (Local)
        </Text>

        <Box borderWidth="1px" borderRadius="lg" p={4} h="60vh" overflowY="auto">
          <VStack align="stretch" gap={3}>
            {messages.map((m, i) => (
              <Box
                key={i}
                alignSelf={m.role === "user" ? "flex-end" : "flex-start"}
                bg={m.role === "user" ? "blue.500" : "gray.100"}
                color={m.role === "user" ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                maxW="80%"
              >
                <Text whiteSpace="pre-wrap">{m.content}</Text>
              </Box>
            ))}
            {loading && (
              <HStack>
                <Spinner size="sm" />
                <Text>Thinking...</Text>
              </HStack>
            )}
          </VStack>
        </Box>

        <HStack>
          <Input
            placeholder='Try: "How many washing orders are preparing?"'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <Button onClick={send} disabled={loading}>
            Send
          </Button>
        </HStack>
      </Stack>
    </Container>
  );
}