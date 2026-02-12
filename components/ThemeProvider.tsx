"use client";
import { ThemeProvider as NextThemeProvider} from "next-themes";
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemeProvider>): React.JSX.Element {

  return <NextThemeProvider forcedTheme="light" {...props}>{children}</NextThemeProvider>;
}
