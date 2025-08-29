"use client";

import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import { motion as M } from "motion/react";
import { Menu, Search, X } from "lucide-react";
import { useStateProvider } from "../utils/Reducer/StateProvider";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenu, setIsMenu] = useState<boolean>(false);

  return (
    <>
      <nav className={twMerge("py-1.5 border-b text-lg", "px-5 md:px-10")}>
        {/* Mobile */}
        <div
          className={twMerge(
            "w-full flex flex-row justify-between",
            "lg:hidden",
          )}
        >
          <h1 className="text-2xl text-purple-500">AEON</h1>

          <div className="flex flex-row gap-3 items-center">
            <button
              className={twMerge("[&_svg]:size-7")}
              onClick={() => setIsMenu(true)}
            >
              <Menu />
            </button>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex flex-row gap-4 items-center text-base">
          <h1 className="pr-10 text-2xl text-purple-500">AEON</h1>
          <Links onClose={() => setIsMenu(false)} />
          <input
            className={twMerge(
              "hidden",
              "lg:block ml-auto px-2 py-1 text-base rounded-lg bg-gray-300",
            )}
            type="text"
            name="search"
            placeholder="Search documentation..."
          />
        </div>
      </nav>

      {isMenu &&
        createPortal(
          <M.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-gray-50"
          >
            <div className="px-5 py-1.5 border-b flex flex-row justify-between">
              <h1 className="text-2xl text-purple-500">AEON</h1>
              <div className="flex flex-row gap-3 items-center">
                {/* <input
                  className={twMerge(
                    "px-2 py-1 text-base rounded-lg bg-gray-300",
                    "max-w-52",
                  )}
                  type="text"
                  name="search"
                  placeholder="Search documentation..."
                /> */}
                <button>
                  <Search className="size-7" />
                </button>
                <button onClick={() => setIsMenu(!isMenu)}>
                  <X className="size-7" />
                </button>{" "}
              </div>
            </div>

            <div className={twMerge("px-5 py-3 text-lg", "flex flex-col gap-3")}>
              <Links onClose={() => setIsMenu(false)} />
            </div>
          </M.div>,
          document.body,
        )}
    </>
  );
};

export default Navbar;

const Links = ({ onClose }: { onClose: () => void }) => {
  const currentPathname = usePathname();
  const { state } = useStateProvider()
  const { login } = state

  return (
    <>
      <Link href="/showcase" onClick={onClose}>
        Showcase
      </Link>
      <Link href="/docs" onClick={onClose}>
        Docs
      </Link>
      <Link href="/blog" onClick={onClose}>
        Blog
      </Link>
      <Link href="/analytics" onClick={onClose}>
        Analytics
      </Link>
      <Link href="/templates" onClick={onClose}>
        Templates
      </Link>
      <Link href="/enterprise" onClick={onClose}>
        Enterprise
      </Link>
      {!login.success ? <Link href="/login" onClick={onClose}>
        Login
      </Link> : <></>}
    </>
  );
};
