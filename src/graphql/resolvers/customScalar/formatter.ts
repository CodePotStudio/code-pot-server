// Parses an RFC 3339 compliant date-string into a Date.
//
// Example:
// parseDate('2016-01-01') parses to a Date corresponding to
// 2016-01-01T00:00:00.000Z.
export const parseDate = (date: string): Date => {
	return new Date(date);
};

// Serializes a Date into a RFC 3339 compliant date-string
// in the format YYYY-MM-DD.
export const serializeDate = (date: Date): string => {
	return date.toISOString().split("T")[0];
};
