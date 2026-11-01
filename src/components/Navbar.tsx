
import Image from "next/image";
import logo from "../assets/logo-icon.png";
import Nablinks from "./Nablinks";

import { Suspense } from "react";
import CurrentDate from "./CurrentDate";

import UserInfo from "./UserInfo";



const Navbar = () => {
  return (
    <div className="container mx-auto rounded-xl bg-emerald-700">
    <div className="flex justify-between container mx-auto">
      <div className="flex ml-2 gap-2 mt-2">
        <Image
          className="w-10 h-10"
          src={logo}
          height={50}
          width={50}
          alt="Bazar Dor logo"
        />

        <div>
          বাজার দর
          <Suspense fallback={<div>তারিখ লোড হচ্ছে...</div>}>
            <CurrentDate/>
          </Suspense>
        </div>
      </div>

      <UserInfo/>
    </div>
       <Nablinks />
    </div>
  );
};

export default Navbar;
