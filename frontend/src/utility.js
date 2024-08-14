const timeAgo = (timestamp) => {
  const now = new Date();
  const createdDate = new Date(timestamp);
  const diff = now - createdDate;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else {
    return "just now";
  }
};

const truncateTo100Chars = (text) => {
  return text.length <= 250 ? text : text.substring(0, 250);
};

export { timeAgo, truncateTo100Chars };
