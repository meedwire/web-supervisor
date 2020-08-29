import React from 'react';

import { render } from 'react-dom';
import { Keyboard } from '../../components/Keyboard';

export class KeyboardTouch {
  static open(
    e: React.FocusEvent<HTMLInputElement>,
    type: 'numeric' | 'qwrt'
  ): void {
    e.persist();
    e.preventDefault();
    const mainElement = document.createElement('div');
    const root = document.getElementById('root');
    mainElement.setAttribute('id', 'keyboard');
    root && root.appendChild(mainElement);
    return render(<Keyboard type={type} e={e} />, mainElement);
  }
}
