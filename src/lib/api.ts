export async function sendMessageToAI(message: string): Promise<string> {
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }), 
    });
  
    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data.response;
  }
  