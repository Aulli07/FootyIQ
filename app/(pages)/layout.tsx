import Footer from "@/shared/components/footer";
import { Toaster } from "sonner";

<Toaster position="top-center" />

export default function PagesLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}