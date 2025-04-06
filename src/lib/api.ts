export async function sendMessageToAI(message: string): Promise<string> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/chat`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send message: ${response.statusText}`);
  }

  const data = await response.json();
  return data.response;
}
