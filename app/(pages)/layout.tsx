import Footer from "@/shared/components/footer";

export default function PagesLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}