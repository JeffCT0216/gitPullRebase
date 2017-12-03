import React from "react";

import Artist from "./Artist.jsx";

const ArtistList = props => {
  return (
    <div className="col artistList">
      <h3>{props.isRenderingByGenre ? `${props.genre} artists available in ${props.city}` : `Available in ${props.city}`}</h3>
      <br />
        {props.isRenderingByGenre ? props.artistByGenre.map((artist, index) => {
          if (artist.city === props.city) {
            return (
              <div key={index}>
                <Artist
                  facebookId={props.facebookId}
                  artist={artist}
                  setTracks={props.setTracks}
                  setArtist={props.setArtist}
                />
              </div>
            );
          }
        }) : props.artists.map((artist, index) => {
          return (
            <div key={index}>
              <Artist
                facebookId={props.facebookId}
                artist={artist}
                setTracks={props.setTracks}
                setArtist={props.setArtist}
              />
            </div>
          );
        })}
    </div>
  );
};

export default ArtistList;
