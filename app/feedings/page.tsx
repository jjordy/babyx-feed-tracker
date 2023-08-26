'use client';

import { useState } from "react"

export default function Feedings () {
  const [selectedVolumeMetric, setselectedVolumeMetric] = useState<'ml/cc' | 'oz' | string>('ml/cc')
  return (
    <main className="p-4">
      <div className="text-6xl font-black tracking-tighter">Feedings</div>
      <div className="border-b border-zinc-500 my-4"></div>
      <form className="flex items-center space-x-4">
        <label htmlFor="id_amount" className="font-medium mr-2 uppercase tracking-wide">Amount</label>
        <input name="amount" id="id_amount" type="text" placeholder="" className="rounded h-8 shadow-xl p-1"/>
        <label htmlFor="id_volume_type" className="font-medium mr-2 uppercase tracking-wide">Volume</label>
        <select name="volume_type" id="id_volume_type" placeholder={selectedVolumeMetric} className="rounded h-8 shadow-xl p-1 bg-white text-black" onChange={evt => setselectedVolumeMetric(evt.currentTarget.value)}>
          <option value="oz">OZ</option>
          <option value="ml/cc">ML/CC</option>
        </select>
      </form>
    </main>
  )
}
