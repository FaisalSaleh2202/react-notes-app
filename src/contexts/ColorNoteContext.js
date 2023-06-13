import React from 'react';

const ColorNoteContext = React.createContext();

export const LocaleProvider = ColorNoteContext.Provider;
export const LocaleConsumer = ColorNoteContext.Consumer;

export default ColorNoteContext;
