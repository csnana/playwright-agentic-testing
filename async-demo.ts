async function getMessage(): Promise<string> {
  return "Playwright is ready";
}
async function main(): Promise<void> {
  const message = await getMessage();
  console.log(message);
}
main();