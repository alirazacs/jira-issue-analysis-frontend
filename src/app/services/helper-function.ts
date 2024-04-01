export function validateEmail(email: string): boolean {
  const pattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

export function validateUrl(url: string): boolean {
  // Regular expression pattern for validating URLs without a trailing slash
  const pattern: RegExp = /^(ftp|http|https):\/\/[^ "]+\/?$/;

  // Test the URL against the pattern and return true if it matches, false otherwise
  return pattern.test(url);
}
