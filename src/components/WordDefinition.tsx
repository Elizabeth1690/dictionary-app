/** @format */

import { Meaning } from "@/app/type";
import React from "react";

export default function WordDefinition({
  partOfSpeech,
  definitions,
  antonyms,
  synonyms,
}: Meaning) {
  return (
    <>
      <div className="flex gap-5 items-center">
        <em className="text-2xl font-bold">{partOfSpeech}</em>
        <div className="w-full h-[2px] bg-gray-200 rounded-full" />
      </div>
      <section className="flex flex-col gap-3">
        <p className="text-xl">Meaning</p>
        {definitions?.map((definitionItem, index) => (
          <ul key={index} className="text-lg">
            <li className="flex gap-2">
              <div className="min-h-1.5 min-w-1.5 h-1.5 w-1.5 bg-purple rounded-full mt-3" />
              <p>{definitionItem.definition}</p>
            </li>
          </ul>
        ))}
      </section>
      {synonyms.length > 0 && (
        <div className="flex gap-4">
          <p className="text-xl text-gray-400">Synonyms</p>
          <p>{synonyms.join(", ")}</p>
        </div>
      )}
    </>
  );
}
