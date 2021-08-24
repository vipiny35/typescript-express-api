/**
 * This function allows us to extract the extention from the filename.
 *
 * @param {string} filename
 * @returns {string | undefined}
 * @author Vipin Yadav
 */
export function extractFileExtention(filename: string): string | undefined {
  if (!filename) {
    return undefined;
  }
  const regex: RegExp = /(?:\.([^.]+))?$/;
  const extractedFilename = regex.exec(filename);
  if (extractedFilename) {
    return extractedFilename[1].toLowerCase();
  }
  return undefined;
}