export const MUTATION_HANDLER_SCRIPT = `
class MutationHandler {
  static debug = false;

  static getData = async (
    selector,
    indexes = [],
    minElements = 1,
    timeout = 3000
  ) => {
    const elements = await MutationHandler.getElement(
      selector,
      indexes,
      minElements,
      timeout
    );
    if (elements.length)
      return await MutationHandler.getElementTexts(elements, indexes, timeout);
    else return [];
  };

  static getElement = async (
    selector,
    indexes = [],
    minElements = 1,
    timeout = 3000
  ) => {
    let elements = MutationHandler.getElements(selector);
    if (!MutationHandler.hasElements(elements, indexes, minElements)) {
      elements = await MutationHandler.checkElementsMutations(
        selector,
        indexes,
        minElements,
        timeout
      );
    }
    return MutationHandler.hasElements(elements, indexes, minElements)
      ? elements
      : document.createDocumentFragment().childNodes;
  };

  static getElementTexts = async (elements, indexes = [], timeout = 3000) => {
    let results = MutationHandler.getTextData(elements, indexes);
    if (!MutationHandler.hasTextData(results)) {
      results = await MutationHandler.checkTextDataMutations(
        elements,
        indexes,
        timeout
      );
    }
    return MutationHandler.hasTextData(results) ? results : [];
  };

  static getElements = (selector) => {
    if (MutationHandler.debug)
      console.log("[getElements] Looking for:", selector);
    return document.querySelectorAll(selector);
  };

  static hasElements = (elements, indexes, minElements) => {
    if (elements.length < minElements) return false;
    if (indexes.length) {
      const maxIndex = Math.max(...indexes);
      return maxIndex < elements.length;
    }
    return true;
  };

  static checkElementsMutations = (selector, indexes, minElements, timeout) => {
    return new Promise((resolve) => {
      const observer = new MutationObserver((_, obs) => {
        const elements = MutationHandler.getElements(selector);
        if (MutationHandler.hasElements(elements, indexes, minElements)) {
          obs.disconnect();
          resolve(elements);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });

      setTimeout(() => {
        observer.disconnect();
        resolve(MutationHandler.getElements(selector));
      }, timeout);
    });
  };

  static getTextData = (elements, indexes) => {
    const result = [];
    if (indexes.length) {
      for (const i of indexes) {
        result.push(elements[i]?.textContent?.trim() ?? "");
      }
    } else {
      for (let i = 0; i < elements.length; i++) {
        result.push(elements[i]?.textContent?.trim() ?? "");
      }
    }
    return result;
  };

  static hasTextData = (results) => {
    return results.every((text) => text.trim().length > 0);
  };

  static checkTextDataMutations = (elements, indexes, timeout) => {
    return new Promise((resolve) => {
      const observer = new MutationObserver((_, obs) => {
        const results = MutationHandler.getTextData(elements, indexes);
        if (MutationHandler.hasTextData(results)) {
          obs.disconnect();
          resolve(results);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });

      setTimeout(() => {
        observer.disconnect();
        resolve(MutationHandler.getTextData(elements, indexes));
      }, timeout);
    });
  };
}

window.MutationHandler = MutationHandler;
`;

// MutationHandler.ts
/**
 * MutationHandler is a utility class for querying dynamic DOM elements and text content.
 * It uses MutationObserver to wait for elements or their text content to appear asynchronously.
 * Especially useful for scraping, automation, or tests involving SPA-like pages.
 */

export class MutationHandler {
  /** Enable this flag for internal debug logging */
  static debug = false;

  /**
   * Waits for DOM elements matching the selector to appear, then extracts their text content.
   * @param selector CSS selector to query elements.
   * @param indexes Optional list of element indexes to extract.
   * @param minElements Minimum number of matching elements required.
   * @param timeout Maximum time to wait for elements and their text (in milliseconds).
   * @returns Array of text content from selected elements, or empty array if not found or timed out.
   */
  static getData = async <T extends Element = Element>(
    selector: string,
    indexes: number[] = [],
    minElements: number = 1,
    timeout: number = 3000
  ): Promise<string[]> => {
    const elements = await MutationHandler.getElement<T>(
      selector,
      indexes,
      minElements,
      timeout
    );

    if (elements.length)
      return await MutationHandler.getElementTexts<T>(
        elements,
        indexes,
        timeout
      );
    else return [];
  };

  /**
   * Waits for elements matching a selector to be present in the DOM.
   * If not initially found, watches the DOM until they appear or timeout is reached.
   * @param selector CSS selector.
   * @param indexes Optional indexes to ensure specific elements exist.
   * @param minElements Minimum number of elements required.
   * @param timeout Maximum wait time in milliseconds.
   * @returns Matching NodeList or empty NodeList if not found in time.
   */
  static getElement = async <T extends Element = Element>(
    selector: string,
    indexes: number[] = [],
    minElements: number = 1,
    timeout: number = 3000
  ): Promise<NodeListOf<T>> => {
    let elements = MutationHandler.getElements<T>(selector);

    if (!MutationHandler.hasElements(elements, indexes, minElements)) {
      elements = await MutationHandler.checkElementsMutations<T>(
        selector,
        indexes,
        minElements,
        timeout
      );
    }

    return MutationHandler.hasElements(elements, indexes, minElements)
      ? elements
      : (document.createDocumentFragment().childNodes as NodeListOf<T>);
  };

  /**
   * Extracts trimmed text content from a list of elements.
   * Watches the DOM if content is missing or empty.
   * @param elements NodeList to extract from.
   * @param indexes Optional indexes to extract specific entries.
   * @param timeout Maximum wait time in milliseconds.
   * @returns Array of text content or empty array if not available.
   */
  static getElementTexts = async <T extends Element = Element>(
    elements: NodeListOf<T>,
    indexes: number[] = [],
    timeout: number = 3000
  ): Promise<string[]> => {
    let results = MutationHandler.getTextData(elements, indexes);

    if (!MutationHandler.hasTextData(results)) {
      results = await MutationHandler.checkTextDataMutations<T>(
        elements,
        indexes,
        timeout
      );
    }

    return MutationHandler.hasTextData(results) ? results : [];
  };

  /** Wrapper for document.querySelectorAll */
  private static getElements = <T extends Element>(
    selector: string
  ): NodeListOf<T> => {
    if (this.debug) console.log(`[getElements] Looking for: ${selector}`);
    return document.querySelectorAll<T>(selector);
  };

  /** Validates if required elements are present in the NodeList */
  private static hasElements = <T extends Element>(
    elements: NodeListOf<T>,
    indexes: number[],
    minElements: number
  ): boolean => {
    if (elements.length < minElements) return false;

    if (indexes.length) {
      const maxIndex = Math.max(...indexes);
      return maxIndex < elements.length;
    }

    return true;
  };

  /** Observes the DOM until the required elements appear or timeout is reached */
  private static checkElementsMutations = <T extends Element>(
    selector: string,
    indexes: number[],
    minElements: number,
    timeout: number
  ): Promise<NodeListOf<T>> => {
    return new Promise((resolve) => {
      const observer = new MutationObserver((_, obs) => {
        const elements = MutationHandler.getElements<T>(selector);
        if (MutationHandler.hasElements(elements, indexes, minElements)) {
          obs.disconnect();
          resolve(elements);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });

      setTimeout(() => {
        observer.disconnect();
        resolve(MutationHandler.getElements<T>(selector));
      }, timeout);
    });
  };

  /** Extracts and trims text from the elements, optionally at specific indexes */
  private static getTextData = <T extends Element>(
    elements: NodeListOf<T>,
    indexes: number[]
  ): string[] => {
    const result: string[] = [];

    if (indexes.length) {
      for (const i of indexes) {
        result.push(elements[i]?.textContent?.trim() ?? "");
      }
    } else {
      for (let i = 0; i < elements.length; i++) {
        result.push(elements[i]?.textContent?.trim() ?? "");
      }
    }

    return result;
  };

  /** Checks if all entries in the text array are non-empty */
  private static hasTextData = (results: string[]): boolean =>
    results.every((text) => text.trim().length > 0);

  /** Observes the DOM until text content is filled in elements or timeout is reached */
  private static checkTextDataMutations = <T extends Element>(
    elements: NodeListOf<T>,
    indexes: number[],
    timeout: number
  ): Promise<string[]> => {
    return new Promise((resolve) => {
      const observer = new MutationObserver((_, obs) => {
        const results = MutationHandler.getTextData(elements, indexes);
        if (MutationHandler.hasTextData(results)) {
          obs.disconnect();
          resolve(results);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });

      setTimeout(() => {
        observer.disconnect();
        resolve(MutationHandler.getTextData(elements, indexes));
      }, timeout);
    });
  };
}
