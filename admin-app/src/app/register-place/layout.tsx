import Header from "../components/Header";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <section className="flex w-full min-h-full flex-col px-6">
        {children}
      </section>
    </>
  );
}
