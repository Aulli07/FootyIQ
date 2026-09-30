import Footer from "@/shared/components/footer";
import { Toaster } from "sonner";


export default function PagesLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Toaster position="top-center" />
      {children}
      <Footer />
    </>
  )
}