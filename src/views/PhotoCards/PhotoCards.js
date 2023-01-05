import { useState, useEffect } from 'react';
import roversApi from '../../services/roversApi.js';
import s from './PhotoCards.module.css';
import Loader from 'components/Loader/Loader.js';

export default function MovieDetails({ roverName }) {
  const [photos, setPhotos] = useState();
  const [sol, setSol] = useState(1000);
  const [maxSol, setMaxSol] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const page = 1;

  useEffect(() => {
    setIsLoading(true);
    roversApi.FetchRoverFotos(page, roverName, sol).then(result => {
      if (result.photos.length === 0) {
        setError(true);
      } else {
        setError(false);
        setPhotos(result.photos);
      }
    });
    roversApi.FetchRoverTotal(roverName).then(result => {
      if (result.photo_manifest) {
        setMaxSol(result.photo_manifest.max_sol);
        setIsLoading(false);
      }
    });
  }, []);
  useEffect(() => {
    setIsLoading(true);
    roversApi.FetchRoverFotos(page, roverName, sol).then(result => {
      if (result.photos.length === 0) {
        setError(true);
      } else {
        setError(false);
        setPhotos(result.photos);
      }
    });
    roversApi.FetchRoverTotal(roverName).then(result => {
      if (result.photo_manifest) {
        setMaxSol(result.photo_manifest.max_sol);
        setIsLoading(false);
      }
    });
  }, [roverName, sol]);

  const onValueSubmit = e => {
    e.preventDefault();
    setSol(Number(e.target.sol.value));
  };

  const picturesCheck = !isLoading && !error;
  return (
    <>
      <p className={s.text}>
        MarsRovers do thousands of pictures in different solution,you can pick
        any number, type it and we will see what we can find
      </p>
      <p className={s.text}>
        For current rover solution range is 0 to {maxSol}
      </p>
      <form onSubmit={onValueSubmit}>
        <input
          type="number"
          name="sol"
          className={s.input}
          autoComplete="off"
          autoFocus
          placeholder="Enter value..."
          min="0"
          max={maxSol}
        />
        <button className={s.button}>Search</button>
      </form>
      {error && (
        <p className={s.textError}>
          Seems like there is no photos with {sol} solution,try another number
        </p>
      )}
      {isLoading && <Loader />}
      {picturesCheck && (
        <ul className={s.list}>
          {photos &&
            photos.map(photo => (
              <li className={s.item} key={photo.id}>
                <img className={s.img} src={photo.img_src} alt="" />
                <div className={s.textWrapper}>
                  <p className={s.textItem}>
                    Picture made by camera '{photo.camera.full_name}'
                  </p>
                  <p className={s.textItem}>
                    Picture date is {photo.earth_date}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
