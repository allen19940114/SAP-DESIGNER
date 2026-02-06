export const SAPHorizonTokens = {
  // Core colors
  brandColor: '#0070f2',
  highlightColor: '#0064d9',
  baseColor: '#ffffff',
  shellColor: '#ffffff',
  backgroundColor: '#f5f6f7',
  textColor: '#1d2d3e',
  linkColor: '#0064d9',

  // Status colors
  positiveColor: '#256f3a',
  negativeColor: '#aa0808',
  criticalColor: '#e76500',
  informativeColor: '#0070f2',
  neutralColor: '#788fa6',

  // Accent colors
  accentColor1: '#e76500',
  accentColor2: '#0070f2',
  accentColor3: '#c35500',
  accentColor4: '#0057d2',
  accentColor5: '#047f76',
  accentColor6: '#256f3a',
  accentColor7: '#6c32a9',
  accentColor8: '#a100c2',
  accentColor9: '#d20a0a',
  accentColor10: '#5d36ff',

  // Surface colors
  groupContentBackground: '#ffffff',
  listBackground: '#ffffff',
  listHoverBackground: '#eaecee',
  listActiveBackground: '#dee2e5',

  // Shadows
  shadow0: '0 0 2px 0 rgba(34, 53, 72, 0.2)',
  shadow1: '0 1px 4px 0 rgba(34, 53, 72, 0.2)',
  shadow2: '0 2px 8px 0 rgba(34, 53, 72, 0.2)',

  // Typography
  fontFamily: '"72", "72full", Arial, Helvetica, sans-serif',
  fontSize: '14px',
  fontSizeSmall: '12px',
  fontSizeHeader1: '36px',
  fontSizeHeader2: '24px',
  fontSizeHeader3: '20px',
  fontSizeHeader4: '18px',
  fontSizeHeader5: '16px',
  fontSizeHeader6: '14px',

  // Spacing
  contentGridSize: '16px',
  elementHeight: '36px',

  // Border radius
  elementBorderRadius: '12px',
  buttonBorderRadius: '8px',
  fieldBorderRadius: '4px',
  cardBorderRadius: '12px',

  // Buttons
  buttonBackground: '#ffffff',
  buttonBorderColor: '#bcc3ca',
  buttonTextColor: '#1d2d3e',
  buttonEmphasizedBackground: '#0070f2',
  buttonEmphasizedTextColor: '#ffffff',
  buttonHoverBackground: '#eaecee',

  // Fields
  fieldBackground: '#ffffff',
  fieldBorderColor: '#89919a',
  fieldTextColor: '#1d2d3e',
  fieldPlaceholderColor: '#788fa6',
  fieldFocusBorderColor: '#0070f2',
  fieldReadOnlyBackground: '#eaecee',

  // Toolbar
  toolbarBackground: '#ffffff',
  toolbarSeparatorColor: '#d9d9d9',

  // Table
  tableHeaderBackground: '#f5f6f7',
  tableHeaderColor: '#556b82',
  tableBorderColor: '#e5e5e5',
  tableRowHoverBackground: '#eaecee',

  // Card
  cardBackground: '#ffffff',
  cardBorderColor: '#e5e5e5',
  cardShadow: '0 1px 4px 0 rgba(34, 53, 72, 0.12)'
} as const

export const canvasBackgrounds = {
  white: '#ffffff',
  sapLightBlue: '#f0f4f8',
  black: '#1a1a2e',
  lightBlue: '#e8f0fe',
  blueGreenGradient: 'linear-gradient(135deg, #e8f4fd 0%, #e0f7f0 100%)'
} as const

export type CanvasBackgroundKey = keyof typeof canvasBackgrounds

export const textPresets = {
  title: { fontSize: 20, fontWeight: '700' as const, fontColor: '#1d2d3e' },
  section: { fontSize: 16, fontWeight: '700' as const, fontColor: '#1d2d3e' },
  label: { fontSize: 14, fontWeight: '400' as const, fontColor: '#556b82' },
  body: { fontSize: 14, fontWeight: '400' as const, fontColor: '#1d2d3e' }
} as const
