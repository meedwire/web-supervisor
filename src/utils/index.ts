import { CSSProperties } from 'react';

export type NamedStyles<T> = {
  [P in keyof T]: CSSProperties;
};

export class StyleSheet {
  static create<T extends NamedStyles<T> | NamedStyles<any>> (
    styles: T | NamedStyles<T>
  ): T {
    return styles;
  }
}

/**
 * Creates a StyleSheet style reference from the given object.
 */
