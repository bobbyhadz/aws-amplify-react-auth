export const isValidEmail = (email?: string): boolean => {
  if (!email) {
    return false;
  }

  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );
};

export const isMinimumLength = (field: string, length: number): boolean =>
  field.trim().length >= length;

export function getUniqueTimestamp(): number {
  return Date.now() + Math.random();
}

// date format: "2021-02-05"
export function getCurrentDate(): string {
  const date = new Date();
  const dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
  return dateString;
}
