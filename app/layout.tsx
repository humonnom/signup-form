import ".././styles/global.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen w-screen flex justify-center items-center">
        {children}
      </body>
    </html>
  );
}
