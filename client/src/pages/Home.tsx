import axios from "axios";
import { FC, useEffect, useState } from "react";

interface Station {
  id: number;
  city: string;
  code: number;
  date: string;
  lat: number;
  lon: number;
  name: string;
}

const Home: FC = () => {
  const [numOfStations, setNumOfStations] = useState();
  const [stations, setStations] = useState<Station[]>();
  const [selectedCity, setSelectedCity] = useState("");

  async function getNumOfStations() {
    try {
      const { data } = await axios.get(
        "https://open-bus-stride-api.hasadna.org.il/gtfs_stops/list?get_count=true&date_from=2025-02-25",
      );

      setNumOfStations(data);
      getStations(data);
    } catch (e) {
      console.log(e);
    }
  }

  async function getStations(numOfStations: number) {
    try {
      console.log("before");
      const { data } = await axios.get(
        `https://open-bus-stride-api.hasadna.org.il/gtfs_stops/list?limit=${numOfStations}&date_from=2025-02-25`,
      );
      setStations(data);
    } catch (e) {
      console.log(e);
    }
  }

  async function getGtfBusesOfStation(staion: string) {}

  function getArrOfValues(objArr: { [key: string]: any }[], property: string) {
    return [...new Set(objArr.map((obj) => obj[property]))].sort();
  }

  useEffect(() => {
    getNumOfStations();
  }, []);

  useEffect(() => {
    console.log(selectedCity);
  }, [selectedCity]);

  return (
    <>
      <h1>{"Number of stations in gtfs: " + JSON.stringify(numOfStations)}</h1>
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        name="stations"
      >
        {stations &&
          getArrOfValues(stations, "city").map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
      </select>
    </>
  );
};

export default Home;
