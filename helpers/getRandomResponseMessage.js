const responses = [
  "Tell me what brings you here",
  "How can I help you today?",
  "Can you tell me a bit more about that?",
];

const getRandomResponseMessage = () => {
  const index = Math.floor(Math.random() * responses.length);
  return responses[index];
};

module.exports = { getRandomResponseMessage };
