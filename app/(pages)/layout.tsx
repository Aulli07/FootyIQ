import Footer from "@/shared/components/footer";
import { Toaster } from "sonner";


export default function PagesLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Toaster 
        position="top-center" 
        richColors
        closeButton
        duration={4000}
        toastOptions={{
          className: "rounded-xl shadow-lg",
          style: { background: "#18181b", color: "#fff" }
        }}
      />
      {children}
      <Footer />
    </>
  )
}