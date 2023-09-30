import PocketBase from "pocketbase";
const governorContractAddress = "0x7c062060A03965a2aDC7dBbbcaf61fE51fA38102";
const daoDealClientAddress = "0xaAbd5B5f9241933F384B83CE114985fc0d70EAba";
const movieDaoAddress = "0x651e9bd6f86f50d228Db7FEBc6b50156697B3D8f";
const tokenAddress = "0x936445C25057F80A3C9C2e2e6C50369D1Fa38D52";
const timelockAddress = "0xe5f3888D0557D7Aa9A21cB926EE910B48D16D3D8";
const chainId = "314159";
const pb = new PocketBase("http://127.0.0.1:8090");
pb.autoCancellation(false);

function truncateString(inputString, maxLength) {
  if (inputString.length <= maxLength) {
    // If the input string is already shorter than or equal to the maxLength, return it as is
    return inputString;
  } else {
    // If the input string is longer than the maxLength, truncate it and add "..."
    return inputString.slice(0, maxLength - 3) + "...";
  }
}
function displayFirstLast(inputString, maxLength) {
  if (inputString.length <= maxLength) {
    // If the input string is already shorter than or equal to the maxLength, return it as is
    return inputString;
  } else {
    const firstCharacters = inputString.slice(0, maxLength / 2);
    const lastCharacters = inputString.slice(-maxLength / 2);
    return `${firstCharacters}...${lastCharacters}`;
  }
}
function detectLinks(inputString) {
  // Regular expression pattern to detect links (URLs)
  const urlPattern = /(https?:\/\/[^\s]+)/g;

  // Use the `match` method with the pattern to find all links in the input string
  const links = inputString.match(urlPattern);

  // Return an array of detected links (or an empty array if no links were found)
  return links || [];
}
function removeLinks(inputString) {
  // Regular expression pattern to detect links (URLs)
  const urlPattern = /(https?:\/\/[^\s]+)/g;

  console.log(inputString);
  // Use the `replace` method with the pattern to remove links from the input string
  const stringWithoutLinks = inputString.replace(urlPattern, "");

  return stringWithoutLinks;
}
export {
  governorContractAddress,
  daoDealClientAddress,
  movieDaoAddress,
  tokenAddress,
  timelockAddress,
  pb,
  chainId,
  truncateString,
  displayFirstLast,
  detectLinks,
  removeLinks,
};
