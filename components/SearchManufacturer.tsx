"use client";
import Image from 'next/image';
import { useState, Fragment } from 'react';

import { Combobox, Transition } from '@headlessui/react';

import { manufacturers } from '@/constants';
import { SearchManuFacturerProps } from '@/types'

const SearchManufacturer = ({ selected, setSelected }:
  SearchManuFacturerProps) => {
  const [query, setQuery] = useState("");

  const filteredManufacturers = 
    query === "" 
      ? manufacturers 
      : manufacturers.filter((item) => (
        item.toLowerCase()
        .replace(/\s+/g, "")
        .includes(query.toLowerCase().replace(/\s+/g, ""))
  ))

  return (
    <div className="search-manufacturer">
      <Combobox 
        value={selected}
        onChange={setSelected}
      >
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[13px]">
            <Image
              src='/car-logo2.png'
              width={35}
              height={35}
              className='ml-4'
              alt='car logo'
            />
          </Combobox.Button>

          {/* Input field for searching */}
          <Combobox.Input
            className="search-manufacturer__input"
            placeholder='Toyota...'
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)} // Update the search query when the input changes
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options>
              {
                filteredManufacturers.map((item) => (

                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `relative search-manufacturer__option 
                      ${active ? "bg-primary-blue text-white" : "text-gray-900"}
                      `}
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span 
                          className={`
                            block truncate 
                            ${selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item}
                        </span>

                        {/* Show an active blue background color if the option is selected */}
                        {selected ? (
                          <span 
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 
                            ${active? "text-white": "text-pribg-primary-purple"
                            }`}
                          >
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                )
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default SearchManufacturer