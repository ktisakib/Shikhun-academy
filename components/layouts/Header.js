/* This example requires Tailwind CSS v2.0+ */
import { Disclosure, Transition } from "@headlessui/react";
import { MinusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Logo from "../icons/Logo";
import { useSession, signOut } from "next-auth/react";
import s from "./Header.module.css";
const navigation = [
  { name: "Blog", href: "#", current: true },
  { name: "Courses", href: "#", current: false },
  { name: "Notes", href: "#", current: false },
  { name: "Quize", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { data: session ,status} = useSession();
  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    console.log(session);
  };
  return (
    <Disclosure as='header' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <div>
                <Link href='/'>
                  <a className='flex gap-x-4'>
                    <Logo />
                    <h1 className='text-white font-bold'>SHIKHUN ACADEMY</h1>
                  </a>
                </Link>{" "}
              </div>

              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-end'>
                <div className='hidden sm:ml-6 md:flex gap-x-3'>
                  <ul as='nav' className='flex space-x-4'>
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href}>
                          <a
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm md:text-lg font-medium",
                            )}
                            aria-current={item.current ? "page" : undefined}>
                            {item.name}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {status=='authenticated' ? (
                    <button onClick={handleSignOut} className={s.btnYellow}>
                      Log out
                    </button>
                  ) : (
                    <Link href={"/auth/signup"}>
                      <a>
                        <button className={s.btnYellow}>Log In</button>
                      </a>
                    </Link>
                  )}
                </div>
              </div>
              <div className=' inset-y-0  flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0 md:hidden'>
                <div className='inset-y-0 p-2 flex items-center '>
                  {/* Mobile menu button*/}
                  <Disclosure.Button className='w-10 inline-flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-700  hover:text-white focus:outline-none '>
                    <span className='sr-only'>Open main menu</span>
                    <icon className='cursor-pointer   text-black dark:text-white sm:hidden'>
                      <MinusIcon
                        className={` transition-full w-6 ${
                          open ? "translate-y-3 -rotate-45" : ""
                        } scale-x-150 duration-700 `}
                      />
                      <MinusIcon
                        className={` transition-full w-6 ${
                          open ? "-translate-y-3 rotate-45" : ""
                        } scale-x-150 duration-700`}
                      />
                    </icon>
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>
          <Transition
            enter='transition duration-500 ease-in-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-500 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0 '>
            <Disclosure.Panel as='nav' className='md:hidden'>
              <div className='space-y-1 px-2 pt-2 pb-3'>
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as='a'
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium",
                    )}
                    aria-current={item.current ? "page" : undefined}>
                    {item.name}
                  </Disclosure.Button>
                ))}
                <Link href={"/auth/signup"}>
                  <a>
                    {" "}
                    <button className={s.btnYellow}>Log In</button>
                  </a>
                </Link>
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
