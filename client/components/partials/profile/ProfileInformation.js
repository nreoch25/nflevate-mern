import React from "react";

const ProfileInformation = ({ username, favouriteTeam, favouritePlayer }) => {
  return (
    <div className="card">
      <div className="card-header group-header">{username} Information</div>
      <ul className="list-group">
        <li className="list-group-item">
          <span className="font-weight-bold">Favourite Team:</span>{" "}
          {favouriteTeam}
        </li>
        <li className="list-group-item">
          <span className="font-weight-bold">Favourite Player:</span>{" "}
          {favouritePlayer}
        </li>
      </ul>
    </div>
  );
};

export default ProfileInformation;
