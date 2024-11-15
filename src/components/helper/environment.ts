"use client";

/**
 * Retrieves an environment variable's value and splits it into an array.
 *
 * @param key - The name of the environment variable to retrieve.
 * @param separator - The character(s) used to split the string into an array. Defaults to ',' if not provided.
 * @returns An array of strings derived from splitting the environment variable's value.
 *
 * @example
 * // Assuming process.env.MY_ENV_VAR is "value1,value2,value3"
 * const values = getEnvArrayValue("MY_ENV_VAR");
 * // values will be ["value1", "value2", "value3"]
 *
 * @example
 * // Assuming process.env.MY_ENV_VAR is "value1|value2|value3"
 * const values = getEnvArrayValue("MY_ENV_VAR", "|");
 * // values will be ["value1", "value2", "value3"]
 *
 * @remarks
 * If the environment variable is not set, the function will return an empty array.
 */
export const getEnvArrayValue = (key: unknown, separator?: string) => {
  return String(key).split(separator ?? ",") ?? [];
};
