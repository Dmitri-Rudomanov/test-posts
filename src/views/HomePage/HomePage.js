import { useState, useEffect } from 'react';
import roversApi from '../../services/roversApi.js';
import s from '../HomePage/HomePage.module.css';
import PhotoCards from '../PhotoCards/PhotoCards';
export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    roversApi
      .FetchPosts()
      .then(result =>
        result.concat([
          {
            userId: 1,
            id: 555,
            title: 'dolorem eum magni eos aperiam quia',
            body: 'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae',
          },
        ])
      )
      .then(result => setPosts(result));
  }, []);

  // const commentsCheck = post => {
  //   let comments = 0;
  //   posts.forEach(element => {
  //     if (post.userId === element.userId) {
  //       comments += 1;
  //       return comments;
  //     } else {
  //       return comments;
  //     }
  //   });
  //   return comments;
  // };

  return (
    <div className={s.bg}>
      <h1 className={s.text}>Posts</h1>
      <ul>
        {posts.map((post, index) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <div>{post.body}</div>
            <p>Comments :</p>
          </li>
        ))}
      </ul>
      {/* <form className={s.form} onSubmit={onRoverPick}>
        <select className={s.select} name="select">
          {rovers.map(rover => (
            <option className={s.option} key={rover.id} value={rover.name}>
              {rover.name}
            </option>
          ))}
        </select>
        <button className={s.btn}>Search</button>
      </form>
      {roverName && <PhotoCards roverName={roverName} />} */}
    </div>
  );
}
