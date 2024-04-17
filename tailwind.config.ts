import { nextui } from '@nextui-org/theme'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/components/(avatar|breadcrumbs|button|card|divider|dropdown|input|kbd|link|listbox|modal|navbar|toggle|table|tabs|user|ripple|spinner|menu|popover|checkbox|spacer).js',
  ],
  darkMode: 'class',
  plugins: [nextui()],
}

// eslint-disable-next-line import/no-default-export
export default config
