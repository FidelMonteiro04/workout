"use client";
import "../../../styles/scroll.css";

import { useContext, useState } from "react";
import { RegisterContext } from "@/app/register/layout";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import Button from "../Button";
import Input from "../Input";
import Modal from "./Modal";

import { AiOutlineSearch } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";

interface Props {
  isOpen: boolean;
  onFinish: (
    address: string,
    coordinates: { lat: number; lng: number }
  ) => void;
  onClose: () => void;
}

const LocationModal = ({ isOpen, onFinish, onClose }: Props) => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const handleClose = () => {
    setAddress("");
    onClose();
  };

  const handleChange = (address: string) => {
    setAddress(address);
  };

  const handleSelect = (address: string) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setCoordinates(latLng);
        setAddress(address);
      })
      .catch((error) =>
        console.error("Error on handleSelect google maps: ", error)
      );
  };

  const highlightText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part: string, index: number) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={index}>{part}</b>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const renderSuggestion = (suggestion: any, { query }: { query: string }) => {
    return <div>{highlightText(suggestion.description, query)}</div>;
  };

  const sortSuggestions = (suggestions: any, query: string) => {
    return suggestions.sort((a: any, b: any) => {
      const aMatch = a.description.toLowerCase().includes(query.toLowerCase());
      const bMatch = b.description.toLowerCase().includes(query.toLowerCase());

      if (aMatch && !bMatch) {
        return -1;
      } else if (!aMatch && bMatch) {
        return 1;
      }

      return 0;
    });
  };

  const header = (
    <div className="mb-4 max-w-[300px]">
      <span className="text-sm text-zinc-600 ">
        Precisamos do endereço para facilitar a sua vida e a de seu cliente!
      </span>
    </div>
  );
  const body = (
    <div className="flex flex-col gap-4">
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
        searchOptions={{ componentRestrictions: { country: "BR" } }}
      >
        {({ getInputProps, loading, suggestions, getSuggestionItemProps }) => {
          const sortedSuggestions = sortSuggestions(suggestions, address);

          return (
            <div className="flex flex-col gap-1">
              <Input
                {...getInputProps()}
                placeholder="Busque pelo endereço"
                icon={AiOutlineSearch}
                containerStyles="max-w-full w-full"
                customStyles="location-search-input"
              />
              <div
                hidden={!address || !suggestions.length}
                className="autocomplete-dropdown-container max-w-[300px] max-h-[140px] overflow-y-auto shadow-md p-2 little-scroll rounded-sm text-secondary-500"
              >
                {loading && <div className="">Loading...</div>}
                {sortedSuggestions.map((suggestion: any, index: number) => {
                  const className =
                    (suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item") +
                    " p-1 pt-2 border-b-[1px] transition rounded-sm";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#e9e9e9", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                      key={`${index}`}
                    >
                      {renderSuggestion(suggestion, { query: address })}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }}
      </PlacesAutocomplete>
      <Button
        outline
        text="Salvar endereço"
        icon={BsCheck}
        onClick={() => {
          onFinish(address, coordinates);
          handleClose();
        }}
      />
    </div>
  );

  if (!isOpen) return <></>;

  return (
    <Modal
      handleClose={handleClose}
      header={header}
      title="Localização"
      body={body}
    />
  );
};

export default LocationModal;
