export const metadata = {
  title: "MockMate — AI Interview Coach",
  description: "Practice interviews with AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
