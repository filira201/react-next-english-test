import Link from "next/link";
import MainLogo from "./ui/MainLogo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-[#2383e2] p-4 md:h-48">
        <MainLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-3 rounded-lg bg-slate-800 px-6 md:w-2/5 md:px-20">
          <h1 className="text-2xl text-[#ffffffcf] font-semibold md:text-4xl md:leading-tight">
            Учите английский по карточкам - шаг за шагом к цели.
          </h1>
          <h2 className="text-[#ffffffcf] text-lg font-normal md:text-xl">
            Wordflip помогает вам продуктивно работать в комфортном ритме
          </h2>
          <Link
            className="
            mt-5 bg-[#0582ff] flex items-center gap-5 self-start rounded-lg px-6 py-3 text-sm
          text-white transition-colors hover:bg-blue-700 font-medium md:text-base
            "
            href="/login"
          >
            <span>Войти</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Главное изображение для версии настольного компьютера"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Главное изображение для версии мобильного экрана"
          />
        </div>
      </div>
    </main>
  );
}
