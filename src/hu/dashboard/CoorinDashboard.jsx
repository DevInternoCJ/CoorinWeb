import React from "react";
import GridExecutives from "./board/executives/gridExecutives";
import GridConsultations from "./board/consultations/GridConsultations";

export default function CoorinDashboard() {
  return (
    <div className="relative bg-background-dashboard py-14 sm:py-2 overflow-hidden">
      <div className="mx-auto max-w-2xl px-2 lg:max-w-screen lg:px-8 relative">
        <h2 className="text-base/7 font-semibold text-indigo-600">
          Menu Principal
        </h2>
        <span className="mx-auto mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-4xl">
          Ejecutivos
        </span>
        <div className="mt-2 grid grid-cols-6 gap-4 sm:mt-8 md:mt-8 lg:mt-0 xl:mt-0">
          <div className="col-span-6">
            <GridExecutives />
          </div>
        </div>
        
        <div className="col-span-6 row-start-2 relative">
          <hr className="my-8 border-t border-gray-500 opacity-60" />
          <span className="mx-auto mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-4xl ">
            Consultas
          </span>
          <div className="-mt-10">
            <GridConsultations />
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5"></div>
        </div>

        <div className="col-span-3 row-span-2 row-start-3 relative">
          <div className="absolute inset-px rounded-lg bg-white rounded-bl-4xl"></div>
          <div className="relative flex h-full flex-col overflow-hidden rounded-bl-[calc(2rem+1px)]">
            <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
              <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 text-center">
                Security
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-gray-600 text-center">
                Morbi viverra dui mi arcu sed. Tellus semper adipiscing
                suspendisse semper morbi.
              </p>
            </div>
            <div className="@container flex flex-1 items-center lg:py-6">
              <img
                className="h-[min(152px,40cqw)] object-cover"
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png"
                alt=""
              />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 rounded-bl-4xl"></div>
        </div>

        <div className="col-span-3 row-span-2 col-start-4 row-start-3 relative">
          <div className="absolute inset-px rounded-lg bg-white rounded-br-4xl"></div>
          <div className="relative flex h-full flex-col overflow-hidden rounded-br-[calc(2rem+1px)]">
            <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
              <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 text-center">
                Powerful APIs
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-gray-600 text-center">
                Sit quis amet rutrum tellus ullamcorper ultricies libero dolor
                eget sem sodales gravida.
              </p>
            </div>
            <div className="relative min-h-120 w-full grow">
              <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                  <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                    <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                      NotificationSetting.jsx
                    </div>
                    <div className="border-r border-gray-600/10 px-4 py-2">
                      App.jsx
                    </div>
                  </div>
                </div>
                <div className="px-6 pt-6 pb-14">
                  {/* Your code example */}
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 rounded-br-4xl"></div>
        </div>
      </div>
    </div>
  );
}
