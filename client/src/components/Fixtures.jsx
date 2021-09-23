import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFixtures } from "../services";

export default function Fixtures() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const getFixtures = async () => {
      setGames(await fetchFixtures());
    };
    getFixtures();
  }, []);

  return (
    <div className="Teams">
      <h3>Upcoming Fixtures: Week 6</h3>
      {games.map((fixture) => {
        return (
          <div className="TeamRows">
            <img
              src={fixture.fields.teamALogo}
              height={90}
              width={90}
              alt="image"
            ></img>
            <h3>{fixture.fields.teamA}</h3>
            <a href={`${fixture.fields.matchDetails}`}>
              <h4>Match Details</h4>
            </a>
            <h3>{fixture.fields.teamB}</h3>{" "}
            <img
              src={fixture.fields.teamBLogo}
              height={90}
              width={90}
              alt="image"
            ></img>
          </div>
        );
      })}
    </div>
  );
}
