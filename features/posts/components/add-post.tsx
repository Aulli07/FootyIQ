import Link from "next/link"

export default function AddPost() {
  return (
    <Link href="/add-post">
      <div className="fixed right-10 bottom-30 flex justify-center items-center rounded-full bg-emerald-600 hover:bg-emerald-700 p-4">
        <img src="/images/add.png" alt="add-post" className="object-cover w-8 h-8" />
      </div>  
    </Link>
  )
}