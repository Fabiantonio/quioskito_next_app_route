
import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 mt-5 ml-5">
        <div className="relative w-8 h-8">
            <Image src="/logo.svg" alt="FlavorFuel Logo" fill className="object-contain" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-orange-500">Flavor</span>
            <span className="text-red-600">Fuel</span>
        </h1>
    </div>
  )
}
