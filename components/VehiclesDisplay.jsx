"use client";
import React, { useEffect, useState } from "react";
import VehicleCard from "./VehicleCard";

export default function VehiclesDisplay({ favourited, setFavourited }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://products.lfdev.co/api/cars");
        const result = await response.json();
        setData(result.data);
        console.log(result.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  if (data.length === 0) return null;
  const isEven = data.length % 2 === 0;

  return (
    <section className="vehicles">
      <div className="vehicles__background">
        <div className="vehicles__background-image" />
        <div className="vehicles__shape-line" />
      </div>

      <div className="vehicles__content">
        <h1 className="vehicles__title">Vehicles</h1>

        <div className="vehicles__grid">
          <div className="vehicles__intro">
            <div className="vehicles__decor-line--mobile" />
            <div className="vehicles__decor-line--desktop" />
            <div className="vehicles__intro-text">
              <p>
                Welcome to Prestige Porsche, a beacon of luxury and dynamism in
                the automotive world. As the authorised Porsche dealers, we are
                proud to uphold a 25-year legacy of guiding discerning
                enthusiasts to the pinnacle of German engineering.
              </p>
              <p>
                At Prestige Porsche, we don't just sell cars; we deliver the
                Porsche promise of exhilarating driving pleasure, underpinned by
                a heritage of trust and an unwavering dedication to excellence.
              </p>
            </div>
          </div>

          <VehicleCard
            data={data}
            setFavourited={setFavourited}
            favourited={favourited}
          />

          <div
            className={`vehicles__view-all-container ${
              isEven
                ? "vehicles__view-all-container--even"
                : "vehicles__view-all-container--odd"
            }`}
          >
            <a href="/" className="vehicles__view-all">
              View all cars
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
