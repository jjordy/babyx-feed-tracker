"use client";

import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { cn } from "@/lib";

export default function Tabs({ items }: any) {
  return (
    <div className="w-full px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex  max-w-md rounded-xl space-x-4 bg-white dark:bg-slate-800  shadow p-1">
          {Object.keys(items).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                cn(
                  "w-full rounded-lg py-1 text-sm font-medium leading-5 text-indigo-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-indigo-500 text-white"
                    : "text-indigo-100 hover:text-indigo-200",
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2 w-full">
          {Object.values(items).map((item, idx) => {
            return (
              <Tab.Panel
                key={idx}
                className={cn(
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 w-full",
                )}
              >
                {item as React.ReactNode}
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
