import { randomPrompts } from "../assets/prompts";

export function getRandomPrompts(prompt) {
  const randomIndex = Math.floor(Math.random() * randomPrompts.length);
  const randomPrompt = randomPrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompts();

  return randomPrompt;
}
