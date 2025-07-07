"use client";
import React from "react";
import Header from "@/components/Header";
import VehiclesDisplay from "@/components/VehiclesDisplay";

export default function page() {
  const [favourited, setFavourited] = React.useState(false);

  return (
    <>
      <Header favourited={favourited} />
      <VehiclesDisplay favourited={favourited} setFavourited={setFavourited} />
    </>
  );
}
