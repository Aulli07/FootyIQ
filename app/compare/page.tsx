import { poppins } from "../fonts";
import Image from "next/image";

const Compare = () => {
  return (
    <main className="flex justify-items items-center flex-col w-full h-full p-10">
      <div className="gap-3 flex px-3 flex-col">
        <div className="relative flex justify-center items-center">
          <p
            className={`text-white ${poppins.className} text-lg font-semibold`}
          >
            Compare Players
          </p>
          <img
            src="/images/swap-fields.png"
            alt="no pic"
            className="absolute right-0 top-1/2 object-cover -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div className="text-white/70 flex flex-col text-center gap-3">
          <div className="flex justify-evenly gap-2 p-2 w-full">
            <div className="flex flex-col justify-center items-center">
              <div className="relative h-14 w-14 rounded-full overflow-hidden ring-2 ring-white/10 flex justify-center items-center">
                <Image
                  src="/images/add.png"
                  alt="no-pic"
                  sizes="32px"
                  fill
                  className="relative object-cover"
                />
              </div>
              <p>Search a player</p>
              <div className="flex items-center p-2 justify-center">
                {/* <input placeholder="toggle seasons" className="outline-none border border-white" /> */}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center text-white">
              <div className="relative h-14 w-14 rounded-full overflow-hidden ring-2 ring-white/10 flex justify-center items-center">
                <Image
                  src="/images/add.png"
                  alt="no-pic"
                  sizes="32px"
                  fill
                  className="relative object-cover"
                />
              </div>
              <p>Search a player</p>
              <div className="flex items-center p-2 justify-center">
                {/* <input placeholder="toggle seasons" className="outline-none border border-white"/> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Compare;
