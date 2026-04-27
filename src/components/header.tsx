import { AuthNav } from "./auth-nav"
import { Nav } from "./nav"
import { INav } from "@/types/nav-t"

const menu: INav[] = [
  { title: "Page1", slug: "Page1" },
  { title: "Page2", slug: "Page2" },
  { title: "Page3", slug: "Page3" },
]

export async function Header() {
  return (
    <header className="border-b border-gray-400 p-1 mb-5 grid grid-flow-col gap-x-4 justify-between items-center">
      <Nav menu={menu} />
      <AuthNav />
    </header>
  )
}
