import { REDUX } from "@/redux/constant/slice";
import { CSwal } from "../swal/CSwal";

type FormObject = Record<string, IValue>;

/**
 * Trim all string fields in an object.
 * @param obj Form object.
 */
export const formatFormObject = (obj: FormObject): FormObject => {
  const trimmedObject: FormObject = {};

  for (const key in obj) {
    if (typeof obj[key] === "string") {
      trimmedObject[key] = obj[key].trim();
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      trimmedObject[key] = formatFormObject(obj[key]) as unknown as IValue;
    } else {
      trimmedObject[key] = obj[key];
    }
  }

  return trimmedObject;
};

/**
 * Checks if two values are deeply equal, disregarding `null` and `undefined` values.
 * @param value1 - The first value to compare.
 * @param value2 - The second value to compare.
 * @returns `true` if the values are deeply equal, `false` otherwise.
 */
export const isDeepEqual = (value1: unknown, value2: unknown): boolean => {
  if (value1 === value2) {
    return true;
  }

  if (typeof value1 !== "object" || value1 === null) {
    return false;
  }

  return isFormObjectEqual(value1 as Record<string, unknown>, value2 as Record<string, unknown>);
};

/**
 * Checks if two form objects are deeply equal, disregarding `null` and `undefined` values.
 * @param obj1st - The first object to compare.
 * @param obj2nd - The second object to compare.
 * @returns `true` if the objects are deeply equal, `false` otherwise.
 */
export const isFormObjectEqual = (obj1st: Record<string, unknown>, obj2nd: Record<string, unknown>): boolean => {
  if (typeof obj1st !== "object" || obj1st === null || typeof obj2nd !== "object" || obj2nd === null) {
    return false;
  }

  // Deconstruct and leave unnecessary keys `[REDUX.FIELD.KEY]` | `error` | `id`
  const { [REDUX.FIELD.KEY]: lastKey1, error: e1, id: id1, ...obj1 } = obj1st;
  const { [REDUX.FIELD.KEY]: lastKey2, error: e2, id: id2, ...obj2 } = obj2nd;

  // Get keys from obj1 (active form) and filter out keys with `null` or `undefined` values
  const keys1 = Object.keys(obj1).filter((key) => obj1[key] !== undefined && obj1[key] !== null);

  for (const key of keys1) {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if ((value1 === undefined || value1 === null) && (value2 !== null || value2 !== undefined)) {
      continue; // Ignore undefined and null values
    }

    if (value1 === "" && (value2 === null || value2 === undefined)) {
      continue; // For instances of create, where value is undefined initially and deleted
    }

    if (!isDeepEqual(value1, value2)) {
      return false;
    }
  }

  return true;
};

const UNSAVED_PROMPT = {
  TEXT: {
    TITLE: "Are you sure?",
    MESSAGE: "Any unsaved changes will be lost. Do you want to leave this page?",
    CONFIRM: "Yes",
    CANCEL: "Cancel",
  },
} as const;

/**
 * Template prompt confirmation for leaving a page or form.
 * @returns `true` if confirm, `false` otherwise.
 */
export const confirmUnsavedChanges = async () => {
  const { isConfirmed } = await CSwal({
    title: UNSAVED_PROMPT.TEXT.TITLE,
    text: UNSAVED_PROMPT.TEXT.MESSAGE,
    showCancelButton: true,
    confirmButtonText: UNSAVED_PROMPT.TEXT.CONFIRM,
    cancelButtonText: UNSAVED_PROMPT.TEXT.CANCEL,
  });

  return isConfirmed;
};
